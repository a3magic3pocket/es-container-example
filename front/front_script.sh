#!/usr/bin/env bash

nohup filebeat -e -c /etc/filebeat/filebeat.yml > filebeat.log 2>&1 &
nginx -g 'daemon off;'