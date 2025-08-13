# #!/bin/bash
# source constants.sh

# PIN_FILE="currentInstituteNumber.txt"

# # Check if file exists
# if [[ ! -f "$PIN_FILE" ]]; then
#   echo "❌ File not found: $PIN_FILE"
#   exit 1
# fi

# # Read pin from file
# pin=$(cat "$PIN_FILE")

# echo "📍 PIN         : $pin"
# echo "📁 Directory   : $(pwd)"
# echo "🗄️  Database    : $DATABASE_NAME"

# # View users from DB
# export DATABASE_VIEW_USERS=$(
#   /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
#     "SELECT username, email, password, currentInstituteNumber FROM users WHERE currentInstituteNumber = '$pin';"
# )
# export DATABASE_VIEW_INSTITUTE=$(
#   /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
#     "SELECT * FROM institute_$pin;"
# )
# export DATABASE_VIEW_CATEGORY=$(
#   /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
#     "SELECT * FROM category_$pin;"
# )
# export DATABASE_VIEW_COURSE=$(
#   /opt/lampp/bin/mysql -u root -p -D "$DATABASE_NAME" -e \
#     "SELECT * FROM course_$pin;"
# )
