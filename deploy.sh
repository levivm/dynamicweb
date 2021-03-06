#!/bin/bash
#
# deploy.sh
#
# This script made to deploy dynamicweb project.
# Please run this script as app user.
#

APP_HOME_DIR=~/app

echo "" > $APP_HOME_DIR/deploy.log
while true; do
  case "$1" in
    -h | --help ) HELP=true; shift ;;
    -v | --verbose ) VERBOSE=true; shift ;;
    -d | --dbmigrate ) DB_MIGRATE=true; shift ;;
    -n | --nogit ) NO_GIT=true; shift ;;
    -b | --branch ) BRANCH="$2"; shift 2 ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done

if [ "$BRANCH" == "" ]; then
    BRANCH="master"
fi

if [ "$HELP" == "true" ]; then
    echo "./deploy.sh <options>"
    echo "                     "
    echo "options are : "
    echo "        -h, --help: Print this help message"
    echo "        -v, --verbose: Show verbose output to stdout. Without this a deploy.log is written to ~/app folder"
    echo "        -d, --dbmigrate: Do DB migrate"
    echo "        -n, --nogit: Don't execute git commands. With this --branch has no effect."
    echo "        -b, --branch: The branch to pull from origin repo."
    exit
fi

echo "BRANCH="$BRANCH
echo "DB_MIGRATE="$DB_MIGRATE
echo "NO_GIT="$NO_GIT
echo "VERBOSE="$VERBOSE

# The project directory exists, we pull the specified branch
cd $APP_HOME_DIR
if [ -z "$NO_GIT" ]; then
    echo 'We are executing default git commands. Please -no_git to not use this.'
    # Save any modified changes before git pulling
    git stash
    # Fetch all branches/tags
    git fetch -a
    git checkout $BRANCH
    git pull origin $BRANCH    
else
    echo 'Not using git commands.'
fi

source ~/pyvenv/bin/activate
pip install -r requirements.txt > deploy.log 2>&1
echo "###" >> deploy.log
if [ -z "$DB_MIGRATE" ]; then
    echo 'We are not doing DB migration'
else
    ./manage.py makemigrations >> deploy.log 2>&1
    echo "###" >> deploy.log
    ./manage.py migrate >> deploy.log 2>&1
    echo "###" >> deploy.log
fi
printf 'yes' | ./manage.py collectstatic >> deploy.log 2>&1
echo "###" >> deploy.log
django-admin compilemessages
sudo systemctl restart uwsgi

