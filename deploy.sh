#!/bin/bash

gulp build
scp -r dist root@198.199.98.80:/var/www/
ssh root@198.199.98.80 rm -rf /var/www/html/*
ssh root@198.199.98.80 mv /var/www/dist/* /var/www/html/
echo "BUILD COMPLETE"
