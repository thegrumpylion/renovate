#!/bin/bash

repoOwner="${1:-thegrumpylion}"
repoName="${1:-renovate-test}"

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
