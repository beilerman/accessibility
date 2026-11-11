#!/bin/sh
# Pre-deploy gate. Run before `npx vercel --prod --yes`.
# Production is deployed from this working tree by CLI, so nothing else stops
# an uncommitted, unpushed or CI-failing state from going live.
set -e
cd "$(dirname "$0")/.."

[ -z "$(git status --porcelain)" ] || { echo "STOP: uncommitted changes"; git status --short; exit 1; }
git fetch --quiet origin
head=$(git rev-parse HEAD)
[ "$head" = "$(git rev-parse origin/master)" ] || { echo "STOP: HEAD is not origin/master (push to both branches first)"; exit 1; }

ci=$(gh run list --commit "$head" --workflow CI --branch master --event push --json conclusion --jq '.[0].conclusion')
[ "$ci" = "success" ] || { echo "STOP: CI for $head on master is '${ci:-not finished}'"; exit 1; }

(cd pipeline && .venv/bin/python -m unittest test_check_sources.CoverageTests)

# Brad's rule: at most two production deploys a day.
log=.vercel/deploys.log
today=$(date +%F)
count=$(grep -c "^$today" "$log" 2>/dev/null || true)
[ "${count:-0}" -lt 2 ] || { echo "STOP: already $count production deploys today"; exit 1; }

echo "OK to deploy $head (deploy $(( ${count:-0} + 1 )) of 2 today)."
echo "After it succeeds: echo \"$today $head\" >> $log"
