# Run by Task Scheduler (scripts/agents/windows/install.sh renders the tasks). Keeps Windows awake
# while a launcher script runs inside WSL, then lets it sleep again: SetThreadExecutionState is the
# Windows counterpart of macOS caffeinate. Without it the PC can sleep mid-run once the wake timer has
# woken it. Appends start, end and the exit code to -Log (a Windows path).
#
#   powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File run-in-wsl.ps1 `
#     -Distro <WSL distro> -Launcher <launcher path inside WSL> -Log <Windows log file>

param(
  [Parameter(Mandatory = $true)] [string] $Distro,
  [Parameter(Mandatory = $true)] [string] $Launcher,
  [Parameter(Mandatory = $true)] [string] $Log
)

Add-Type -Namespace Agents -Name Power -MemberDefinition @'
[DllImport("kernel32.dll", SetLastError = true)]
public static extern uint SetThreadExecutionState(uint esFlags);
'@
$ES_CONTINUOUS = [uint32]2147483648      # 0x80000000: the state lasts until the next call
$ES_SYSTEM_REQUIRED = [uint32]1          # 0x00000001: no idle sleep while it is set

function Write-Log([string] $Message) {
  Add-Content -Path $Log -Value ('{0:yyyy-MM-dd HH:mm:ss} {1}' -f (Get-Date), $Message)
}

New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Log) | Out-Null
$code = 1
try {
  if ([Agents.Power]::SetThreadExecutionState($ES_CONTINUOUS -bor $ES_SYSTEM_REQUIRED) -eq 0) {
    Write-Log 'warning: SetThreadExecutionState failed; the PC may sleep mid-run'
  }
  Write-Log "start: wsl.exe -d $Distro -- sh $Launcher"
  & wsl.exe -d $Distro -- sh $Launcher
  $code = $LASTEXITCODE
} catch {
  Write-Log "error: $($_.Exception.Message)"
} finally {
  [void][Agents.Power]::SetThreadExecutionState($ES_CONTINUOUS)   # back to normal sleep rules
  Write-Log "end: exit $code"
}
exit $code
