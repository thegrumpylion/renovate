#!/bin/bash

repoOwner="${BUF_REPO_OWNER:-thegrumpylion}"
repoName="${BUF_REPO_NAME:-renovate-test}"
ref="${BUF_REF:-main}"

reposId=$(curl -s \
  https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryService/GetRepositoryByFullName \
  -H "Authorization: Bearer ${BUF_TOKEN}" \
  -H "Content-Type: application/json" \
  -X POST -d "{\"fullName\": \"${repoOwner}/${repoName}\"}" | jq -r ".repository.id")

curl -s \
  https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryTagService/ListRepositoryTags \
  -H "Authorization: Bearer ${BUF_TOKEN}" \
  -H "Content-Type: application/json" \
  -X POST -d "{\"repositoryId\": \"${reposId}\", \"pageSize\": 5, \"reverse\": true}" | jq

curl -s \
  https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryTagService/ListRepositoryTagsForReference \
  -H "Authorization: Bearer ${BUF_TOKEN}" \
  -H "Content-Type: application/json" \
  -X POST -d "{\"repositoryId\": \"${reposId}\", \"reference\": \"${ref}\", \"pageSize\": 5, \"reverse\": true}" | jq