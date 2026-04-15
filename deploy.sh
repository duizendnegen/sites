#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── resolve bucket name from CDK outputs ─────────────────────────────────────
BUCKET_NAME="${BUCKET_NAME:-}"
if [[ -z "$BUCKET_NAME" ]]; then
  BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name SitesStack \
    --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
    --output text 2>/dev/null || true)
fi

DISTRIBUTION_ID="${DISTRIBUTION_ID:-}"
if [[ -z "$DISTRIBUTION_ID" ]]; then
  DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name SitesStack \
    --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
    --output text 2>/dev/null || true)
fi

# ── deploy infra (optional, skip with SKIP_CDK=1) ────────────────────────────
if [[ "${SKIP_CDK:-0}" != "1" ]]; then
  echo "▶ Building and deploying CDK stack..."
  cd "$SCRIPT_DIR/infra"
  npm install --silent
  npm run build
  npx cdk deploy --require-approval never
  cd "$SCRIPT_DIR"

  # re-read outputs after deploy
  BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name SitesStack \
    --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
    --output text)
  DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name SitesStack \
    --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
    --output text)
fi

if [[ -z "$BUCKET_NAME" ]]; then
  echo "ERROR: Could not determine bucket name. Run 'cdk deploy' first or set BUCKET_NAME env var." >&2
  exit 1
fi

# ── sync site content ─────────────────────────────────────────────────────────
echo "▶ Syncing sites/ → s3://${BUCKET_NAME}/"
aws s3 sync "$SCRIPT_DIR/sites/" "s3://${BUCKET_NAME}/" \
  --delete \
  --cache-control "public, max-age=300"

# ── invalidate CloudFront cache ───────────────────────────────────────────────
if [[ -n "$DISTRIBUTION_ID" ]]; then
  echo "▶ Invalidating CloudFront cache (distribution: ${DISTRIBUTION_ID})..."
  aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" \
    --query "Invalidation.Id" \
    --output text
fi

echo "✓ Deploy complete → https://sites.eliandor.com"
