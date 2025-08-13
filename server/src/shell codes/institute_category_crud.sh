#!/bin/bash
source colors.sh
source constants.sh

# readonly API_CREATE_CATEGORY="http POST $API_INSTITUTE/category"
# readonly API_GET_CATEGORYS="http GET $API_INSTITUTE/category"
# readonly API_DELETE_CATEGORY="http DELETE $API_INSTITUTE/category"
# `INSERT INTO category_${instituteNumber}(categoryName,categoryDescription)

# Create

tokenFile=".login_token_message.txt"
token_authorization=$(cat "$tokenFile")
PIN=$(cat "currentInstituteNumber.txt")
filter_out_category_data="id, categoryName, categoryDescription"
function create_category() {
  echo -e "${blue}📥 Fill in the category details:${reset}"
  read -p " 📚 categoryName        : " categoryName
  read -p " 📚 categoryDescription : " categoryDescription
  echo ""

  if ((${#categoryName} == 0)) || ((${#categoryDescription} == 0)); then
    echo -e "${red}❌ Error: Missing input fields.${reset}"
    exit 1
  fi

  echo -e "${blue}🌐 POST ➤ $API_CREATE_CATEGORY${reset}"

  response=$(
    $API_CREATE_CATEGORY Authorization:"$token_authorization" \
      categoryName="$categoryName" \
      categoryDescription="$categoryDescription"
  )

  echo -e "${gray}📝 Response:${reset}"
  echo "$response"

  message=$(echo "$response" | jq -r '.message')
  echo -e "${green}✅ $message${reset}"
  echo ""
  sleep 1
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT $filter_out_category_data FROM category_$PIN;"

  sleep 10
}

function read_categorys() {
  echo -e "${blue}🌐 GET ➤ $API_GET_CATEGORYS${reset}"

  response=$(
    $API_GET_CATEGORYS Authorization:"$token_authorization"
  )
  echo -e "${gray}📝 Response:${reset}"
  echo "$response"
  message=$(echo "$response" | jq -r '.message')
  echo -e "${green}✅ $message${reset}"
  echo ""
  sleep 1
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT * FROM category_$PIN;"

  sleep 5
}

# Delete
function delete_category() {
  echo -e "${blue}📥 Fill in the category details:${reset}"
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT $filter_out_category_data FROM category_$PIN;"

  read -p " 📚 Delete ID           : " deleteId
  echo ""

  if ((${#deleteID} == 0)); then
    echo -e "${red}❌ Error: Missing input fields.${reset}"
    exit 1
  fi

  echo -e "${blue}🌐 DELETE ➤ $API_DELETE_CATEGORY${reset}"

  response=$(
    $API_DELETE_CATEGORY/$deleteId Authorization:"$token_authorization"
  )

  echo -e "${gray}📝 Response:${reset}"
  echo "$response"

  message=$(echo "$response" | jq -r '.message')
  echo -e "${green}✅ $message${reset}"
  echo ""
  sleep 1
  /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
    "SELECT $filter_out_category_data FROM category_$PIN;"

  sleep 10
}
while true; do
  echo ""
  echo -e "${cyan}📘 Choose an option:${reset}"
  echo "  1) ➕ Create Category"
  echo "  2) 📚 Read All Category"
  echo "  3) ✏️ Delete Category (🚧)"
  echo "  4) 🗑️ Read One Category (🚧)"
  echo "  5) 🔍 Show All Category (🚧)"
  echo "  0) 🚪 Exit"
  read -p "👉 Enter choice [0-5]: " choice

  case "$choice" in
  1) create_category ;;
  2) read_categorys ;;
  3) delete_category ;;
  4) ;;
  5) ;;
  6) ;;
  0)
    echo -e "${cyan}👋 Exiting...${reset}"
    exit 0
    ;;
  *)
    echo -e "${red}❌ Invalid choice! Please enter [0-5].${reset}"
    ;;
  esac
done
