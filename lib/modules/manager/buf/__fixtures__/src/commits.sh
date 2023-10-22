#!/bin/bash

repoOwner="${1:-thegrumpylion}"
repoName="${1:-renovate-test}"

curl -s \
   https://api.buf.build/buf.alpha.registry.v1alpha1.RepositoryCommitService/ListRepositoryCommitsByReference \
   -H "Authorization: Bearer ${BUF_TOKEN}" \
   -H "Content-Type: application/json" \
   -X POST -d "{\"repositoryOwner\": \"${repoOwner}\",\"repositoryName\": \"${repoName}\",\"reference\": \"main\", \"pageSize\": 10, \"reverse\": true}" | jq
