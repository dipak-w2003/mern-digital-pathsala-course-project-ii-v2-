#!/bin/bash
source colors.sh
source constants.sh
source database_view.sh
Constants2="constants2.sh"
# ---------- Header ----------
echo -e "${cyan}📘 +------------------------------+${reset}"
echo -e "${cyan}📘 |       Course REGISTER        |${reset}"
echo -e "${cyan}📘 +------------------------------+${reset}"
echo ""

echo -e "${yellow}📝 Course Details for Register${reset}"

tokenFile=".login_token_message.txt"
token_authorization=$(cat "$tokenFile")
PIN=$(cat "currentInstituteNumber.txt")
echo " PIN : $PIN"

# ---------- Create Course ----------
function create_course() {
  echo -e "${blue}📥 Fill in the course details:${reset}"
  read -p " 📚 courseName        : " courseName
  read -p " 💰 coursePrice       : " coursePrice
  read -p " ⏳ courseDuration    : " courseDuration
  read -p " 🎯 courseLevel       : " courseLevel
  read -p " 📝 courseDescription : " courseDescription
  echo " "
  ./$Constants2
  echo "-----> Select One "
  read -p "📂 categoryId        : " categoryId
  echo ""

  if ((${#courseName} == 0)) || ((${#coursePrice} == 0)) ||
    ((${#courseDuration} == 0)) || ((${#courseLevel} == 0)) ||
    ((${#courseDescription} == 0)) || ((${#categoryId} == 0)) ||
    ((${#token_authorization} == 0)); then
    echo -e "${red}❌ Error: Missing input fields.${reset}"
    exit 1
  fi

  echo -e "${blue}🌐 POST ➤ $API_CREATE_COURSE${reset}"

  response=$(
    $API_CREATE_COURSE Authorization:"$token_authorization" \
      courseName="$courseName" \
      coursePrice="$coursePrice" \
      courseDuration="$courseDuration" \
      courseLevel="$courseLevel" \
      courseDescription="$courseDescription" \
      categoryId="$categoryId"
  )

  echo -e "${gray}📝 Response:${reset}"
  echo "$response"

  message=$(echo "$response" | jq -r '.message')
  echo -e "${green}✅ $message${reset}"
  echo ""
  sleep 1
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT id, courseName, coursePrice, courseDuration, courseLevel, courseThumbnail, courseDescription, categoryId, teacherId FROM course_$PIN;"

  sleep 1
}
function create_course2() {
  echo -e "${blue}📥 Fill in the course details:${reset}"
  read -p " 📚 courseName        : " courseName
  read -p " 💰 coursePrice       : " coursePrice
  read -p " ⏳ courseDuration    : " courseDuration
  read -p " 🎯 courseLevel       : " courseLevel
  read -p " 📝 courseDescription : " courseDescription
  read -p " 📝 courseThumnail    : " courseThumnail
  echo " "
  ./$Constants2
  echo "-----> Select One "
  read -p "📂 categoryId        : " categoryId
  echo ""

  if ((${#courseName} == 0)) || ((${#coursePrice} == 0)) ||
    ((${#courseDuration} == 0)) || ((${#courseLevel} == 0)) ||
    ((${#courseDescription} == 0)) || ((${#categoryId} == 0)) ||
    ((${#token_authorization} == 0)); then
    echo -e "${red}❌ Error: Missing input fields.${reset}"
    exit 1
  fi

  echo -e "${blue}🌐 POST ➤ $API_CREATE_COURSE_FORM${reset}"

  response=$(
    $$API_CREATE_COURSE_FORM Authorization:"$token_authorization" \
      courseName="$courseName" \
      coursePrice="$coursePrice" \
      courseDuration="$courseDuration" \
      courseLevel="$courseLevel" \
      courseThumbnail="$courseThumbnail" \
      courseDescription="$courseDescription" \
      categoryId="$categoryId"
  )

  echo -e "${gray}📝 Response:${reset}"
  echo "$response"

  message=$(echo "$response" | jq -r '.message')
  echo -e "${green}✅ $message${reset}"
  echo ""
  sleep 1
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT id, courseName, coursePrice, courseDuration, courseLevel, courseThumbnail, courseDescription, categoryId FROM course_$PIN;"

  sleep 10
}

# ---------- Read ----------
function get_courses() {
  echo -e "${blue}🔍 Fetching all courses...${reset}"
  response=$(
    $API_GET_COURSE Authorization:"$token_authorization"
  )

  echo "$response"
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT * FROM course_$PIN JOIN category_$PIN ON course_$PIN.categoryId = category_$PIN.id;"

  sleep 1

}
# ---------- Read:Single ----------
function get_course() {
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT id, courseName, coursePrice, courseDuration, courseLevel, courseThumbnail, courseDescription, categoryId FROM course_$PIN;"

  read -p "📂 Enter Course Id        : " courseId
  echo -e "${blue}🔍 Fetching all courses...${reset}"
  response=$(
    $API_GET_COURSE/courseId Authorization:"$token_authorization"
  )
  echo "$response"
  sleep 1

}

# ---------- Delete ----------
function delete_course() {
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT id, courseName, coursePrice, courseDuration, courseLevel, courseThumbnail, courseDescription, categoryId FROM course_$PIN;"

  read -p "🗑️  Provide course ID to delete: " id
  echo -e "${yellow}⚠️  Deleting course ID $id...${reset}"
  response=$(
    $API_DELETE_COURSE/$id Authorization:"$token_authorization"
  )
  echo -e "${green}✅ Course ID $id deleted.${reset}"
  sleep 1
}

# ---------- Menu Loop ----------
while true; do
  echo ""
  echo -e "${cyan}📘 Choose an option:${reset}"
  echo "  1) ➕ Create Course"
  echo "  2) 📚 Read All Courses"
  echo "  3) ✏️  Update Course (🚧)"
  echo "  4) 🗑️  Delete Course"
  echo "  5) 🔍 Get One Course (🚧)"
  echo "  0) 🚪 Exit"
  read -p "👉 Enter choice [0-5]: " choice

  case "$choice" in
  1) create_course ;;
  2) get_courses ;;
  3)
    echo -e "${yellow}🚧 Update is under construction.${reset}"
    ;;
  4) delete_course ;;
  5)
    get_course
    ;;
  6) create_course2 ;;
  0)
    echo -e "${cyan}👋 Exiting...${reset}"
    exit 0
    ;;
  *)
    echo -e "${red}❌ Invalid choice! Please enter [0-5].${reset}"
    ;;
  esac
done
