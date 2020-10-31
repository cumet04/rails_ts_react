#!/bin/bash

cd $(dirname $0)/.. # move to project root

destdir=frontend/src/api
rm -r $destdir
docker run --rm -u "$(id -u):$(id -g)" -v $PWD:/local openapitools/openapi-generator-cli:v4.3.1 \
  generate \
  -g typescript-fetch \
  -i /local/api/openapi.yml \
  -o /local/${destdir}
