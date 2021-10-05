#!/usr/bin/env bash

nohup filebeat -e -c /etc/filebeat/filebeat.yml > filebeat.log 2>&1 &
go run main.go