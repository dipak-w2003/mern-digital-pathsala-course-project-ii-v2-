#!/bin/bash
source constants.sh
source colors.sh
tokenFile=".login_token_message.txt"
token_authorization=$(cat "$tokenFile")
PIN=$(cat "currentInstituteNumber.txt")
filter_out_category_data="id, categoryName, categoryDescription"
# echo -e "${gray}+--------------------------------------+---------------------+${reset}"
# echo -e "${gray}| ${cyan}id${gray}                                   | ${cyan}categoryName${gray}        |${reset}"
# echo -e "${gray}+--------------------------------------+---------------------+${reset}"
# echo -e "${gray}| ${yellow}3b15bf8c-59c7-11f0-9dab-3c9180250541${gray} | ${green}Web Development${gray}     |${reset}"
# echo -e "${gray}| ${yellow}3bd8883b-59c7-11f0-9dab-3c9180250541${gray} | ${green}App Development${gray}     |${reset}"
# echo -e "${gray}+--------------------------------------+---------------------+${reset}"



/opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
  "SELECT $filter_out_category_data FROM category_$PIN;"
