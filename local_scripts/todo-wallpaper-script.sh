#!/bin/sh
echo `date` : checking Notion database for updates
result=$(/usr/local/bin/node /Users/username/notion-todo/script.js);

if [ -z "$result" ]
then echo "no change"
else echo "$result"
fi