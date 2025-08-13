#!/bin/bash

# ============== GLOBALS ===============
# SCRIPT_DEMO="script_demo.sh"
SCRIPT_REGISTER="register.sh"
SCRIPT_LOGIN="login.sh"
SCRIPT_INSTITUTE="main_institute.sh"
source constants.sh
# ============= Functions ==============
# dir=$(pwd)
# Reqquired packages 
# httpie 
# jq : json parser
# $BACKEND_START_FULL
function show_help() {
  echo "Usage :$0 {register|login|institute|help}"
  echo ""
  echo " register   --> register user "
  echo " login      --> login and get access of API Call "
  echo " institute  --> institute relates API "
  echo " help       --> institute relates API "
}

# ============= DISPATCHER ==============

if [ -z "$(which http)" ]; then
  echo "HTTPie not installed"
  exit 1
fi

case "$1" in
register)
  bash "$SCRIPT_REGISTER"
  # echo "This is : $dir"
  # echo "Working"
  ;;
login)
  bash "$SCRIPT_LOGIN"
  ;;
institute)
  bash "$SCRIPT_INSTITUTE"
  ;;
help | --help | -h)
  show_help
  ;;
*)
  echo "❌ Unknown command: $1"
  show_help
  ;;
esac
