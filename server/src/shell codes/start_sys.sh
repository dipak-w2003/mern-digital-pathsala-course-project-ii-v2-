#!/bin/bash
source constants.sh
NewTab="f1_get_env_terminal.sh"
InstituteDispatcher="dispatcher.sh"
function show_help() {
  echo "Usage :$0 {start|stop|reboot|help}"
  echo ""
  echo " start   --> start system "
  echo " stop    --> stop system "
  echo " reboot  --> reboot system  "
  echo " help    --> helps "
}

# ============= DISPATCHER ==============

if [ -z "$(which http)" ]; then
  echo "HTTPie not installed"
  exit 1
fi

case "$1" in
start | -start | --start | 1)
  sudo $XAMPP_START
  # sudo systemctl start mysql
  sleep 0.4
  $BACKEND_START
  ;;

stop | -stop | --stop | 2)
   sudo $XAMPP_STOP
#  sudo systemctl stop mysql
  sleep 0.4
  clear
  echo "System Closed Successfully"
  ;;

reboot | -reboot | --reboot | 3)
  echo " Under Development | Not Available !!"
  ;;

help | --help | -h | 4)
  show_help
  ;;
*)
  echo "❌ Unknown command: $1"
  show_help
  ;;
esac
