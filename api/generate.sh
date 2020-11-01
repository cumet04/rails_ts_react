#!/bin/bash

set -eu

cd $(dirname $0)/.. # move to project root

destdir=frontend/src/api
test -d $destdir && rm -r $destdir && mkdir -p $destdir
docker run --rm -u "$(id -u):$(id -g)" -v $PWD:/local openapitools/openapi-generator-cli:v4.3.1 \
  generate \
  -g typescript-fetch \
  -i /local/api/openapi.yml \
  -o /local/${destdir}

# remove host from BASE_PATH for API client
# FIXME: I want to not do such hack, want to achieve this with the generator's option or openapi.yml
sed -i 's|https://localhost:3000||' $destdir/runtime.ts
