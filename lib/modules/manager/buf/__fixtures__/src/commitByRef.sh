#!/bin/bash

repoOwner="${BUF_REPO_OWNER:-thegrumpylion}"
repoName="${BUF_REPO_NAME:-renovate-test}"
ref="${BUF_REF:-main}"

curl -s \
  https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryCommitService/GetRepositoryCommitByReference \
  -H "Authorization: Bearer ${BUF_TOKEN}" \
  -H "Content-Type: application/json" \
  -X POST -d "{\"repositoryOwner\": \"${repoOwner}\",\"repositoryName\": \"${repoName}\",\"reference\": \"${ref}\"}" | jq
