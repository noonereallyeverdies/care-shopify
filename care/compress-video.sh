#!/bin/bash

# Video compression script for hair-homepage.mp4
# This script creates highly compressed MP4 and WebM versions

INPUT="public/hair-homepage.mp4"
OUTPUT_MP4="public/hair-homepage-compressed.mp4"
OUTPUT_WEBM="public/hair-homepage.webm"

# Check if input file exists
if [ ! -f "$INPUT" ]; then
    echo "Error: $INPUT not found!"
    exit 1
fi

echo "Original file size:"
ls -lh "$INPUT"

# Create compressed MP4 version
echo "Creating compressed MP4..."
ffmpeg -i "$INPUT" \
    -c:v libx264 \
    -preset slow \
    -crf 28 \
    -c:a aac \
    -b:a 64k \
    -movflags +faststart \
    "$OUTPUT_MP4"

# Create compressed WebM version
echo "Creating compressed WebM..."
ffmpeg -i "$INPUT" \
    -c:v libvp9 \
    -crf 32 \
    -b:v 0 \
    -c:a libopus \
    -b:a 48k \
    "$OUTPUT_WEBM"

echo "Compression complete!"
echo "File sizes:"
ls -lh "$INPUT" "$OUTPUT_MP4" "$OUTPUT_WEBM"

# Replace original with compressed version
echo "Replacing original MP4 with compressed version..."
mv "$OUTPUT_MP4" "$INPUT"

echo "Done! Original MP4 replaced with compressed version, and WebM version created."
