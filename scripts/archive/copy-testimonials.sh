#!/bin/bash

# Script to copy testimonial images from theapp to new-hydrogen-app

SOURCE_DIR="/Users/yvonne/Desktop/care/theapp/public/images/testimonials"
TARGET_DIR="/Users/yvonne/Desktop/care/new-hydrogen-app/public/images/testimonials"

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Function to check and copy a file
copy_if_exists() {
  local source="$SOURCE_DIR/$1"
  local target="$TARGET_DIR/$2"
  
  if [ -f "$source" ]; then
    echo "Copying $1 to testimonials directory..."
    cp "$source" "$target"
  else
    echo "Warning: $1 does not exist in source directory"
  fi
}

# Copy known testimonial images with appropriate renaming
# jennifer-k files (with renaming)
copy_if_exists "jennifer-k-before.png" "jennifer-k-before.jpg"
copy_if_exists "jennifer-k-after.png" "jennifer-k-after.jpg"

# elise-m files
copy_if_exists "elise-m-before.jpg" "elise-m-before.jpg"
copy_if_exists "elise-m-after.jpg" "elise-m-after.jpg"

# sarah-t files
copy_if_exists "sarah-t-before.jpg" "sarah-t-before.jpg"
copy_if_exists "sarah-t-after.jpg" "sarah-t-after.jpg"

# If the elise-m and sarah-t images don't exist, create placeholder files
create_placeholder() {
  local target="$TARGET_DIR/$1"
  
  if [ ! -f "$target" ]; then
    echo "Creating placeholder for $1..."
    echo "<!-- Placeholder for $1 -->" > "$target"
  fi
}

create_placeholder "elise-m-before.jpg"
create_placeholder "elise-m-after.jpg"
create_placeholder "sarah-t-before.jpg"
create_placeholder "sarah-t-after.jpg"

echo "Testimonial image copy completed."
