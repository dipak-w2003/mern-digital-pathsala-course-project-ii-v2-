#!/bin/bash
source constants.sh
source colors.sh
clear

# ---------- Header ----------
echo -e "${cyan}📘 +------------------------------+${reset}"
echo -e "${cyan}📘 |        Institute CRUD        |${reset}"
echo -e "${cyan}📘 +------------------------------+${reset}"
echo ""

echo -e "${yellow}📋 Institute Details for Register${reset}"

tokenFile=".login_token_message.txt"
token_authorization=$(cat "$tokenFile")

# ---------- Create ----------
function create_institute() {
  echo -e "${blue}📥 Fill in the following details:${reset}"
  read -p " instituteName        : " instituteName
  read -p " instituteEmail       : " instituteEmail
  read -p " institutePhoneNumber : " institutePhoneNumber
  read -p " instituteAddress     : " instituteAddress
  read -p " institutePanNo       : " institutePanNo
  read -p " instituteVatNo       : " instituteVatNo
  echo ""

  # Validation
  if ((${#instituteName} == 0)) || ((${#instituteEmail} == 0)) ||
    ((${#institutePhoneNumber} == 0)) || ((${#instituteAddress} == 0)) ||
    ((${#instituteVatNo} == 0)) || ((${#token_authorization} == 0)); then
    echo -e "${red}❌ Error: Missing required fields. Please try again.${reset}"
    exit 1
  fi

  echo -e "${blue}🌐 Sending POST to ➤ $API_CREATE_INSTITUTE${reset}"

  response=$(
    $API_CREATE_INSTITUTE Authorization:"$token_authorization" \
      instituteName="$instituteName" \
      instituteEmail="$instituteEmail@example.com" \
      institutePhoneNumber="$institutePhoneNumber" \
      instituteAddress="$instituteAddress" \
      institutePanNo="$institutePanNo" \
      instituteVatNo="$instituteVatNo"
  )

  echo -e "${gray}📝 API Response:${reset}"
  echo "$response"

  message=$(echo "$response" | jq -r '.message')
  messagePIN=$(echo "$response" | jq -r '.message | match("[0-9]{6}").string')
  echo "PIN : $messagePIN"
  fileName="currentInstituteNumber"
  echo "$messagePIN" >$fileName.txt
  echo -e "${green}✅ $message${reset}"
  echo ""
  sleep 1
}

# ---------- Read ----------
function get_institutes() {
  echo -e "${blue}🔍 Fetching all institutes...${reset}"
  response=$(http GET "$API_INSTITUTE" Authorization:$token_authorization)
  echo -e "${gray}📝 Response:${reset}"
  echo "$response"
}

# ---------- Delete ----------
function delete_institutes() {
  read -p "🗑️ Provide the insitiute id : " id
  echo -e "${yellow}⚠️  Deleting institute ID $id...${reset}"
  response=$(http DELETE "$API_INSTITUTE/$id" Authorization:"$token_authorization")
  echo -e "${green}✅ Deleted institute ID $id${reset}"
}

# ---------- Menu ----------
while true; do
  echo ""
  echo -e "${blue}📘 Choose an option:${reset}"
  echo "  1) 🏗️ Create Institute"
  echo "  2) 📚 Read All Institutes"
  echo "  3) ✏️ Update Institute"
  echo "  4) 🗑️ Delete Institute"
  echo "  5) 🔎 Get One Institute"
  echo "  0) 🚪 Exit"
  read -p "👉 Enter choice [0-5]: " choice

  case "$choice" in
  1) create_institute ;;
  2) get_institutes ;;
  3)
    echo -e "${yellow}🚧 ✏️  Update is under maintenance.${reset}"
    ;;
  4) delete_institutes ;;
  5)
    echo -e "${yellow}👋 🔎 GetOne is under maintenance.${reset}"
    ;;
  0)
    echo -e "${cyan}👋 Exiting... Goodbye!${reset}"
    exit 0
    ;;
  *)
    echo -e "${red}❌ Invalid choice! Please enter [0-5].${reset}"
    ;;
  esac
done
