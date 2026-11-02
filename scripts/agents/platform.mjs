// Platform and per-platform defaults for the runner's node scripts (notify.mjs, report.mjs); the
// same rules as scripts/agents/platform.sh, which the shell scripts source.
//   platform()      "darwin" | "wsl" | "linux"   ($AGENTS_PLATFORM overrides)
//   logDir(name)    $AGENTS_LOG_DIR, else ~/Library/Logs/<name>-agents on darwin,
//                   else ${XDG_STATE_HOME:-~/.local/state}/<name>-agents

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export function platform(env = process.env) {
  if (env.AGENTS_PLATFORM) return env.AGENTS_PLATFORM;
  if (process.platform === "darwin") return "darwin";
  try {
    if (/microsoft/i.test(readFileSync("/proc/version", "utf8"))) return "wsl";
  } catch {}
  return "linux";
}

export function logDir(name, env = process.env) {
  if (env.AGENTS_LOG_DIR) return env.AGENTS_LOG_DIR;
  return platform(env) === "darwin"
    ? join(homedir(), "Library/Logs", `${name}-agents`)
    : join(env.XDG_STATE_HOME || join(homedir(), ".local/state"), `${name}-agents`);
}
