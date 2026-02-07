#!/bin/bash
set -e

echo "🔍 Debugging ECR Push..."

# 1. Get Account ID and Region
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="us-west-1"

echo "✅ Account: $ACCOUNT_ID"
echo "✅ Region: $REGION"

# 1.5 Setup Temp Docker Config (Bypass CredsHelper)
export DOCKER_CONFIG="$(pwd)/.docker_tmp"
mkdir -p "$DOCKER_CONFIG"
echo '{"auths":{}}' > "$DOCKER_CONFIG/config.json"
echo "⚠️  Using temporary Docker config at $DOCKER_CONFIG to bypass keychain..."

# 2. Login
echo "🔑 Logging in (Verbose)..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# 3. Create Client Repo if missing
echo "📦 Ensuring Client Repo exists..."
aws ecr describe-repositories --repository-names patient-outreach-client --region $REGION || aws ecr create-repository --repository-name patient-outreach-client --region $REGION

# 4. Test Push Client (Smaller)
CLIENT_REPO_URL="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/patient-outreach-client"
echo "🔖 Tagging Client Image..."
docker tag patientoutreachandappointmentreminderplatform-client:latest $CLIENT_REPO_URL:latest

echo "📤 Pushing CLIENT image (should be fast)..."
docker push $CLIENT_REPO_URL:latest

echo "✅ Client Push Complete!"
