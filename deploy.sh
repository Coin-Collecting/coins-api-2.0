#!/usr/bin/env bash

cd /home/ubuntu/coins-api-2.0/

git pull origin master

npm i

sudo systemctl restart api