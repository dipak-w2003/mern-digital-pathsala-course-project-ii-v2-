#!/bin/bash

source constants.sh
source colors.sh

tokenFile=".login_token_message.txt"
token_authorization=$(cat "$tokenFile")
PIN=$(cat "currentInstituteNumber.txt")

function create_teacher() {
  echo -e "${blue}📥 Fill in the teacher details:${reset}"
  read -p " 📚 teacherName        : " teacherName
  read -p " 💰 teacherEmail       : " teacherEmail
  read -p " ⏳ teacherPhoneNumber : " teacherPhoneNumber
  read -p " 🎯 teacherExpertise   : " teacherExpertise
  read -p " 📝 joinedDate         : " joinedDate
  read -p " 💰 teacherSalary      : " teacherSalary
  echo " "

  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT id, courseName, coursePrice, courseDuration, courseLevel, courseDescription FROM course_$PIN;"

  read -p " 📝 courseId (UP)      : " courseId
  echo " "
  read -p " 🖼️ teacherPhoto (full path) : " teacherPhoto

  # ✅ File existence check
  if [ ! -f "$teacherPhoto" ]; then
    echo -e "${red}❌ File not found: $teacherPhoto${reset}"
    return
  fi
  echo -e "${blue}🌐 POST ➤ $API_CREATE_TEACHER_FORM${reset}"
  response=$(
    $API_CREATE_TEACHER_FORM \
      Authorization:"$token_authorization" \
      teacherName="$teacherName" \
      teacherEmail="$teacherEmail" \
      teacherPhoneNumber="$teacherPhoneNumber" \
      teacherExpertise="$teacherExpertise" \
      joinedDate="$joinedDate" \
      teacherSalary="$teacherSalary" \
      courseId="$courseId" \
      teacherPhoto@"$teacherPhoto"
  )

  echo -e "${gray}📷 Sent file: $teacherPhoto${reset}"
  echo -e "${gray}📝 Response:${reset}"
  echo "$response"

  message=$(echo "$response" | jq -r '.message // "No message returned"')
  echo -e "${green}✅ $message${reset}"
  echo ""

  sleep 1
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT * FROM teacher_$PIN;"
}

function get_teachers() {
  echo -e "${blue}🌐 GET ➤ $API_GET_TEACHERS${reset}"
  response=$($API_GET_TEACHERS Authorization:"$token_authorization")

  echo -e "${gray}📝 Response:${reset}"
  echo "$response"

  message=$(echo "$response" | jq -r '.message // "No message returned"')
  echo -e "${green}✅ $message${reset}"

  sleep 1
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT * FROM teacher_$PIN;"
}

function get_teacher() {
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT * FROM teacher_$PIN;"

  read -p "🔍 Enter Teacher ID: " teacherId
  echo ""

  echo -e "${blue}🌐 GET ➤ $API_GET_TEACHER${reset}"

  response=$($API_GET_TEACHER Authorization:"$token_authorization/$teacherId")

  echo -e "${gray}📝 Response:${reset}"
  echo "$response"

  message=$(echo "$response" | jq -r '.message // "No message returned"')
  echo -e "${green}✅ $message${reset}"

  sleep 1
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT * FROM teacher_$PIN WHERE id='$teacherId';"
}

function delete_teacher() {
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT * FROM teacher_$PIN;"

  read -p "🗑️ Enter Teacher ID: " teacherId
  echo ""

  echo -e "${blue}🌐 DELETE ➤ $API_DELETE_TEACHER${reset}"

  response=$($API_GET_TEACHERS Authorization:"$token_authorization/$teacherId")

  echo -e "${gray}📝 Response:${reset}"
  echo "$response"

  message=$(echo "$response" | jq -r '.message // "No message returned"')
  echo -e "${green}✅ $message${reset}"

  sleep 1
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT * FROM teacher_$PIN WHERE id='$teacherId';"
}

# 🔁 Main Menu Loop
while true; do
  echo ""
  echo -e "${cyan}📘 Choose an option:${reset}"
  echo "  1) ➕ Register Teacher"
  echo "  2) 📚 Read All Teacher"
  echo "  3) ✏️ Update Teacher (🚧)"
  echo "  4) 🗑️ Delete Teacher"
  echo "  5) 🔍 Get One Teacher (🚧)"
  echo "  0) 🚪 Exit"
  read -p "👉 Enter choice [0-5]: " choice

  case "$choice" in
    1) create_teacher ;;
    2) get_teachers ;;
    3) echo -e "${yellow}🚧 Update is under construction.${reset}" ;;
    4) delete_teacher ;;
    5) get_teacher ;;
    0) echo -e "${cyan}👋 Exiting...${reset}"; exit 0 ;;
    *) echo -e "${red}❌ Invalid choice! Please enter [0-5].${reset}" ;;
  esac
done
