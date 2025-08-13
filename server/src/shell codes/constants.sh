#!/bin/bash

# ========== Constant Global Variables =========

# ---------- Database Commands ----------
# Note : It's lampp/xampp based databse so some location or constants might be different
readonly XAMPP_MAIN_DIRECTORY="/opt/lampp/xampp"
readonly XAMPP_START="$XAMPP_MAIN_DIRECTORY start"
readonly XAMPP_STOP="$XAMPP_MAIN_DIRECTORY stop"
readonly DATABASE_TYPE="mysql"
readonly DATABASE_NAME="test"
readonly DATABASE_MYSQL_OPEN="sudo $XAMPP_MAIN_DIRECTORY/bin/$DATABASE_TYPE -u -p"

# ------------ Backend Commands --------
readonly BACKEND_DIR="~/Documents/Other/MERN/Digital Pathsala/Digital Pathsala P2/Backend/"
readonly BACKEND_START="npm start $BACKEND_DIR"
# -------------- New Tab Command -------------
# readonly NewTab="./f1_get_env_terminal.sh"
# --------- Combined Commands ---------

# --------- Universal API's ------------
readonly API_PORT=4406
readonly API_URL="http://localhost:$API_PORT/api"

# ---------- User Related APIs ----------
readonly API_REGISTER_USER="http POST $API_URL/auth/register"
readonly API_GET_USER="http POST $API_URL/auth/users"
readonly API_GET_USER_SINGLE="http POST $API_URL/auth/users"
readonly API_DELETE_USER="http DELETE $API_URL/auth/users"
readonly API_UPDATE_USER="http PUT $API_URL/auth/users"
# Login & Token
readonly API_LOGIN_USER="http POST $API_URL/auth/login"

# ---------- Institute APIs ----------
readonly API_INSTITUTE="$API_URL/institute"
readonly API_CREATE_INSTITUTE="http POST $API_URL/institute"
readonly API_GET_INSTITUTE="http GET $API_URL/institute"
readonly API_GET_INSTITUTE_SINGLE="http POST $API_URL/institute"
readonly API_DELETE_INSTITUTE="http DELETE $API_URL/instiute"
readonly API_UPDATE_INSTIUTE="http PUT $API_URL/institute"
# readonly API_INSTITUTE="$API_URL/institute"

# ---------- Teacher APIs ----------
readonly API_CREATE_TEACHER="http POST $API_INSTITUTE/teacher"
readonly API_CREATE_TEACHER_FORM="http --form POST $API_INSTITUTE/teacher"
readonly API_GET_TEACHERS="http GET $API_INSTITUTE/teacher"
readonly API_GET_TEACHER="http GET $API_INSTITUTE/teacher"
readonly API_DELETE_TEACHERS="http DELETE $API_INSTITUTE/teacher"

# ---------- Student APIs ----------

# ---------- Category APIs ----------
readonly API_CREATE_CATEGORY="http POST $API_INSTITUTE/category"
readonly API_GET_CATEGORYS="http GET $API_INSTITUTE/category"
readonly API_DELETE_CATEGORY="http DELETE $API_INSTITUTE/category"

# ---------- Course APIs ----------
readonly API_CREATE_COURSE="http POST $API_INSTITUTE/course"
readonly API_CREATE_COURSE_FORM="http --form POST $API_INSTITUTE/course"
readonly API_GET_COURSE="http GET $API_INSTITUTE/course"
readonly API_GET_COURSE_SINGLE="http GET $API_INSTITUTE/course"
readonly API_DELETE_COURSE="http DELETE $API_INSTITUTE/course"
readonly API_UPDATE_COURSE="http PUT $API_INSTITUTE/course"
readonly API_UPDATE_COURSE_FORM="http --form PUT $API_INSTITUTE/course"
