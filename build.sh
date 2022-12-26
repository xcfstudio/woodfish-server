#!/bin/bash
npm run tscCompile
mkdir ./dist/logs
openssl genrsa -out ./dist/secretkey/rsa_private_key.pem 1024
openssl rsa -in ./dist/secretkey/rsa_private_key.pem -pubout -out ./dist/secretkey/rsa_public_key.pub
echo "Done!"