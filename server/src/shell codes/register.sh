#!/bin/bash
source constants.sh # make sure DB_NAME and API_REGISTER_USER are set here
# clear

echo "+------------------------------+"
echo "|            REGISTER          |"
echo "+------------------------------+"
echo ""
echo "User Details for Register"

read -p "username : " username
read -p "email    : " email
read -p "password : " password
echo ""

# Simple validation
if ((${#username} == 0)) || ((${#email} == 0)) || ((${#password} == 0)); then
  echo "❌ Params Length too short"
  exit 1
fi

echo "POST : $API_REGISTER_USER"

# Hit API and capture response
response=$($API_REGISTER_USER \
  username="$username" \
  email="$email" \
  password="$password")

# echo "API Response:"
echo "$response"

# Extract message using jq
message=$(echo "$response" | jq -r '.message')
# echo "API Message: $message"

# Global FileName Hidden Approach
# fileNameTxt=".register_message"

# Create A Txt File
# echo "$message" >$fileNameTxt.txt

# Collect text message
# txt_message=$(cat $fileNameTxt.txt)
# echo "$txt_message"

sleep 1

echo ""

echo "Checking user in database..."

# Query MySQL database for user
# /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
#  "SELECT username, email, password, currentInstituteNumber FROM users WHERE username = '$username' AND email = '$email';"
sleep 2.5s
clear

echo " Full Table "
# /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
#  "SELECT id, username, password, email, role FROM users;"

# What is jq?
# jq is like sed/awk but for JSON.
# It reads JSON data and lets you extract, filter, and transform it easily from the command line.
