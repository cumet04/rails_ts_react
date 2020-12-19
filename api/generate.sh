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

# replace host from BASE_PATH for API client
# FIXME: spot is not support server/path-prefix, so replace explicitly
sed -i 's|http://localhost|/api|' $destdir/runtime.ts
