#!/bin/bash

repoOwner="${BUF_REPO_OWNER:-thegrumpylion}"
repoName="${BUF_REPO_NAME:-renovate-test}"

curl -s \
  https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoryByFullName \
  -H "Authorization: Bearer ${BUF_TOKEN}" \
  -H "Content-Type: application/json" \
  -X POST -d "{\"fullName\": \"${repoOwner}/${repoName}\"}" | jq .
