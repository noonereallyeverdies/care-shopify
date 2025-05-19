#!/bin/bash

# Migration verification script
# Checks that all necessary files have been migrated from theapp to new-hydrogen-app

SOURCE_DIR="/Users/yvonne/Desktop/care/theapp"
TARGET_DIR="/Users/yvonne/Desktop/care/new-hydrogen-app"

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Verifying migration from $SOURCE_DIR to $TARGET_DIR...${NC}"

# Check key directories
check_directory() {
  local dir_name="$1"
  local source_path="$SOURCE_DIR/$dir_name"
  local target_path="$TARGET_DIR/$dir_name"
  
  if [ -d "$source_path" ] && [ -d "$target_path" ]; then
    echo -e "${GREEN}✓${NC} Directory $dir_name exists in both source and target"
  elif [ -d "$source_path" ] && [ ! -d "$target_path" ]; then
    echo -e "${RED}✗${NC} Directory $dir_name exists in source but not in target"
  elif [ ! -d "$source_path" ] && [ -d "$target_path" ]; then
    echo -e "${YELLOW}!${NC} Directory $dir_name exists in target but not in source"
  else
    echo -e "${YELLOW}?${NC} Directory $dir_name doesn't exist in either source or target"
  fi
}

# 1. Check component directories
echo -e "\n${BLUE}Checking component directories:${NC}"
check_directory "app/components/3d"
check_directory "app/components/sections"
check_directory "app/components/sections-active-landingpage"
check_directory "app/components/containers"
check_directory "app/components/Shared"

# 2. Check static asset directories
echo -e "\n${BLUE}Checking static asset directories:${NC}"
check_directory "public/images/testimonials"
check_directory "public/images/timeline"
check_directory "public/images/placeholders"

# 3. Check specific landing page components
echo -e "\n${BLUE}Checking landing page components:${NC}"
check_file() {
  local file_name="$1"
  local source_path="$SOURCE_DIR/$file_name"
  local target_path="$TARGET_DIR/$file_name"
  
  if [ -f "$source_path" ] && [ -f "$target_path" ]; then
    echo -e "${GREEN}✓${NC} File $file_name exists in both source and target"
  elif [ -f "$source_path" ] && [ ! -f "$target_path" ]; then
    echo -e "${RED}✗${NC} File $file_name exists in source but not in target"
  elif [ ! -f "$source_path" ] && [ -f "$target_path" ]; then
    echo -e "${YELLOW}!${NC} File $file_name exists in target but not in source"
  else
    echo -e "${YELLOW}?${NC} File $file_name doesn't exist in either source or target"
  fi
}

check_file "app/components/sections-active-landingpage/HowItWorksSnippet.tsx"
check_file "app/components/sections-active-landingpage/HowItWorksSnippet.css"
check_file "app/components/sections-active-landingpage/ProblemSolution.tsx"
check_file "app/components/sections-active-landingpage/ProblemSolution.css"
check_file "app/components/sections-active-landingpage/InteractiveScienceSection.tsx"
check_file "app/components/sections-active-landingpage/InteractiveScienceSection.css"
check_file "app/components/containers/HeroSection.tsx"

# 4. Check route files
echo -e "\n${BLUE}Checking route files:${NC}"
check_file "app/routes/(\$locale)/_index.tsx"

# 5. Check timeline images
echo -e "\n${BLUE}Checking timeline images:${NC}"
check_file "public/images/timeline/week1.png"
check_file "public/images/timeline/week2.png"
check_file "public/images/timeline/week3.png"
check_file "public/images/timeline/week4.png"

# 6. Check testimonial images
echo -e "\n${BLUE}Checking testimonial images:${NC}"
check_file "public/images/testimonials/jennifer-k-before.jpg"
check_file "public/images/testimonials/jennifer-k-after.jpg"
check_file "public/images/testimonials/elise-m-before.jpg"
check_file "public/images/testimonials/elise-m-after.jpg"
check_file "public/images/testimonials/sarah-t-before.jpg"
check_file "public/images/testimonials/sarah-t-after.jpg"

echo -e "\n${BLUE}Migration verification complete.${NC}"
echo -e "Run ${GREEN}./complete-setup.sh${NC} to finalize setup and fix Node.js module issues"
echo -e "Then run ${GREEN}./clean-start.sh${NC} to start the application"
