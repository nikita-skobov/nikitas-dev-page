#!/usr/bin/env bash

aws s3api put-object --bucket "$1" --key reports/
