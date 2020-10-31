#!/bin/bash

cd $(dirname $0)/.. # move to project root

docker run --rm -v $PWD:/local openapitools/openapi-generator-cli:v4.3.1 \
  generate \
  -g typescript-fetch \
  -i /local/api/openapi.yml \
  -o /local/frontend/src/api
