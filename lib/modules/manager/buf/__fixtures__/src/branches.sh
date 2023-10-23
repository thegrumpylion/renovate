#!/bin/bash

repoOwner="${BUF_REPO_OWNER:-thegrumpylion}"
repoName="${BUF_REPO_NAME:-renovate-test}"

reposId=$(curl -s \
  https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoryByFullName \
  -H "Authorization: Bearer ${BUF_TOKEN}" \
  -H "Content-Type: application/json" \
  -X POST -d "{\"fullName\": \"${repoOwner}/${repoName}\"}" | jq -r ".repository.id")

curl -s \
  https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryBranchService/ListRepositoryBranches \
  -H "Authorization: Bearer ${BUF_TOKEN}" \
  -H "Content-Type: application/json" \
  -X POST -d "{\"repositoryId\": \"${reposId}\", \"pageSize\": 5}" | jq

curl -s \
  https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryBranchService/GetCurrentDefaultBranch \
  -H "Authorization: Bearer ${BUF_TOKEN}" \
  -H "Content-Type: application/json" \
  -X POST -d "{\"repositoryId\": \"${reposId}\"}" | jq
