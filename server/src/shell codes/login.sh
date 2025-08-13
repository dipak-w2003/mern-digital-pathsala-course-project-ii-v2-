#!/bin/bash
source constants.sh
clear

# Header
echo -e "${cyan}🔐 +------------------------------+${reset}"
echo -e "${cyan}🔐 |           Login             |${reset}"
echo -e "${cyan}🔐 +------------------------------+${reset}"
echo ""

echo -e "${yellow}📝 User Login Details${reset}"

# Input Fields
read -p " 👤 username : " username
read -p " 📧 email    : " email
read -p " 🔑 password : " password
echo ""

# Validation
if ((${#username} == 0)) || ((${#email} == 0)) || ((${#password} == 0)); then
  echo -e "${red}❌ Error: One or more fields are empty. Please try again.${reset}"
  exit 1
fi

echo -e "${blue}🌐 POST ➤ $API_LOGIN_USER${reset}"

# API Login Request
response=$(
  $API_LOGIN_USER \
    username="$username" \
    email="$email" \
    password="$password"
)

# Show raw response
echo -e "${gray}📨 Server Response:${reset}"
echo "$response"

# Extract token
token=$(echo "$response" | jq -r '.data.token')
# Save to file
fileNameTxt=".login_token_message"
echo "$message" >$fileNameTxt.txt

# Display token (hidden normally, but printed here for dev check)
txt_message=$(cat $fileNameTxt.txt)
echo -e "${green}✅ Token saved to ${fileNameTxt}.txt${reset}"
echo -e "${gray}🔐 Token: ${txt_message}${reset}"

sleep 1
echo ""

echo -e "${yellow}🔍 Verifying user in local database...${reset}"
echo ""

# Database Lookup
# /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
#  "SELECT username, email, password FROM users WHERE username = '$username' AND email = '$email';"

# End Message
echo ""
echo -e "${green}🏁 Done. You are now logged in.${reset}"
