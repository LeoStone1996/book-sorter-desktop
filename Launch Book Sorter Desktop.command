#!/bin/bash

# Book Sorter Desktop Launcher
# This script launches Book Sorter as a standalone desktop application

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BOOK_SORTER_PATH="$SCRIPT_DIR/book-sorter/index.html"

# Check if the book-sorter directory exists
if [ ! -f "$BOOK_SORTER_PATH" ]; then
    echo "Error: Book Sorter files not found!"
    echo "Please ensure the 'book-sorter' folder is in the same directory as this script."
    echo "Expected path: $BOOK_SORTER_PATH"
    read -p "Press any key to exit..."
    exit 1
fi

echo "Launching Book Sorter as Desktop App..."

# Convert to file URL
FILE_URL="file://$BOOK_SORTER_PATH"

# Try to launch with Chrome in app mode for standalone window
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ -f "$CHROME_PATH" ]; then
    echo "Opening with Google Chrome in app mode..."
    "$CHROME_PATH" --app="$FILE_URL" --new-window --window-size=900,700 --window-position=100,100 > /dev/null 2>&1 &
    echo "Book Sorter launched successfully as a desktop app!"
    exit 0
fi

# Fallback to Microsoft Edge
EDGE_PATH="/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
if [ -f "$EDGE_PATH" ]; then
    echo "Opening with Microsoft Edge in app mode..."
    "$EDGE_PATH" --app="$FILE_URL" --new-window --window-size=900,700 --window-position=100,100 > /dev/null 2>&1 &
    echo "Book Sorter launched successfully as a desktop app!"
    exit 0
fi

# Final fallback to Safari
echo "Opening with Safari..."
open "$FILE_URL"
echo "Book Sorter launched in Safari!"
