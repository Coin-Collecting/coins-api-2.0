#!/usr/bin/env bash

cd /home/ubuntu/coins-api-2.0/

git pull origin master

npm i

sudo systemctl restart api

curl -X POST --data "payload={\"text\": \":slack: Deployed API\"}" https://hooks.slack.com/services/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
