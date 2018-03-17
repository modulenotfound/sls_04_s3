#!/usr/bin/env bash
sls deploy
aws s3api put-bucket-notification-configuration --bucket sls-04-s3 --notification-configuration file://s3_lambda.json


