#!/bin/bash
source constants.sh
source colors.sh
# ============== GLOBALS ===============
SCRIPT_INSTITUTE_CRUD="institute_crud.sh"
SCRIPT_COURSE_CRUD="institute_course_crud.sh"
SCRIPT_CATEGORY_CRUD="institute_category_crud.sh"
SCRIPT_TEACHER_CRUD="institute_teacher_crud.sh"

# clear
echo -e "${cyan}🏫 +------------------------------+${reset}"
echo -e "${cyan}🏫 |         Institute Hub        |${reset}"
echo -e "${cyan}🏫 +------------------------------+${reset}"

# ---------- Menu ----------
while true; do
  echo ""
  echo -e "${blue}📘 Choose an option:${reset}"
  echo "  1)  Institute CRUD"
  echo "  2)  Teacher CRUD"
  echo "  3)  Student CRUD"
  echo "  4)  Course CRUD (🚧)"
  echo "  5)  Category CRUD (🚧)"
  echo "  0)  Exit"

  read -p "👉 Enter choice [0-5]: " choice

  case "$choice" in
  1)
    echo -e "${yellow}👉 Running Institute CRUD...${reset}"
    ./$SCRIPT_INSTITUTE_CRUD
    ;;
  2)
    # echo -e "${yellow}🚧 Teacher CRUD is under construction.${reset}"
    ./$SCRIPT_TEACHER_CRUD
    ;;
  3)
    echo -e "${yellow}🚧 Student CRUD is under constructio.${reset}"
    ;;
  4)
    echo -e "${yellow}👉 Running Course CRUD...${reset}"
    ./$SCRIPT_COURSE_CRUD
    ;;
  5)
    # echo -e "${yellow}🚧 Category CRUD is under construction.${reset}"
    echo -e "${yellow}👉 Running Category CRUD...${reset}"
    ./$SCRIPT_CATEGORY_CRUD
    ;;
  0)
    echo -e "${cyan}👋 Exiting... Bye!${reset}"
    break
    ;;
  *)
    echo -e "${red}❌ Invalid choice! Please enter a valid option [0-5].${reset}"
    ;;
  esac
done
