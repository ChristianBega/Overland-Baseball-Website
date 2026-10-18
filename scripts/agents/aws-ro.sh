#!/bin/sh
# Read-only AWS CLI gate for agents. Agents are denied the bare `aws` command; this script is the
# only way they reach AWS, and only for reads in one named profile of one expected account.
#
#   sh scripts/agents/aws-ro.sh cloudfront list-distributions
#   sh scripts/agents/aws-ro.sh acm list-certificates --region us-east-1
#   sh scripts/agents/aws-ro.sh s3 ls
#
# Machine config (owner-written, never in the repo): ${AWS_RO_CONFIG:-~/.config/aws-ro/config}
#   profile=<named CLI profile>     e.g. a read-only IAM user, never the default profile
#   account=<12-digit account id>   the run is refused unless the profile resolves to this account
#
# Guards, in order: config present → profile and account well formed → no credential or profile
# overrides from the environment or the arguments → the operation is a read (list-*, describe-*,
# get-*, or `s3 ls`) and not one that returns secrets or object data → the profile's identity is
# the expected account. The IAM user behind the profile should itself be read-only: these guards
# stop mistakes, the policy stops everything else.

set -u

fail() {
  echo "aws-ro: $*" >&2
  exit 2
}

CONF=${AWS_RO_CONFIG:-$HOME/.config/aws-ro/config}
[ -f "$CONF" ] || fail "no config at $CONF (needs profile= and account= lines)"
PROFILE=$(sed -n 's/^profile=//p' "$CONF" | head -1)
ACCOUNT=$(sed -n 's/^account=//p' "$CONF" | head -1)
case $PROFILE in "" | default | *[!A-Za-z0-9_.-]*) fail "profile in $CONF must be a named, non-default profile" ;; esac
case $ACCOUNT in [0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]) ;; *) fail "account in $CONF must be 12 digits" ;; esac
command -v aws >/dev/null 2>&1 || fail "aws CLI not on PATH"

[ $# -ge 2 ] || fail "usage: aws-ro.sh <service> <operation> [args...]"
service=$1
op=$2
# Global options before the service would shift the real service and operation past the read check.
case $service in -*) fail "global options must come after <service> <operation>" ;; esac
case $op in -*) fail "global options must come after <service> <operation>" ;; esac

# Only the named profile's own credentials, whatever the caller's environment holds.
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN AWS_SECURITY_TOKEN \
  AWS_DEFAULT_PROFILE AWS_ROLE_ARN AWS_WEB_IDENTITY_TOKEN_FILE AWS_CONFIG_FILE \
  AWS_SHARED_CREDENTIALS_FILE AWS_ENDPOINT_URL
export AWS_PROFILE="$PROFILE"

for a in "$@"; do
  case $a in
    --profile | --profile=* | --endpoint-url | --endpoint-url=* | --cli-input-json* | --cli-input-yaml* | --no-sign-request)
      fail "argument $a is not allowed" ;;
  esac
done

if [ "$service" = s3 ]; then
  [ "$op" = ls ] || fail "only 's3 ls' is allowed for the s3 high-level command"
else
  case $op in
    list-* | describe-* | get-*) ;;
    *) fail "'$service $op' is not a read operation (list-*, describe-*, get-* only)" ;;
  esac
  case $op in
    get-secret-value | get-parameter | get-parameters | get-parameters-by-path | get-object* | \
      *token* | *password* | *credential* | get-access-key-* | get-key-pair* | *-key-material*)
      fail "'$service $op' can return secrets or object data" ;;
  esac
fi

actual=$(aws sts get-caller-identity --profile "$PROFILE" --query Account --output text 2>/dev/null) ||
  fail "profile '$PROFILE' has no working credentials (aws configure --profile $PROFILE)"
[ "$actual" = "$ACCOUNT" ] || fail "profile '$PROFILE' resolves to a different account than $CONF expects; refusing"

exec aws --profile "$PROFILE" "$@"
