#!/bin/bash

# Book Sorter Launcher Script
# This script opens the Book Sorter app in your default browser

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BOOK_SORTER_PATH="$SCRIPT_DIR/book-sorter/index.html"

# Check if the book-sorter directory exists
if [ -f "$BOOK_SORTER_PATH" ]; then
    echo "Launching Book Sorter..."
    
    # Detect the operating system and open accordingly
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$BOOK_SORTER_PATH"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Windows
        start "$BOOK_SORTER_PATH"
    else
        # Linux and others
        xdg-open "$BOOK_SORTER_PATH" 2>/dev/null || firefox "$BOOK_SORTER_PATH" 2>/dev/null || google-chrome "$BOOK_SORTER_PATH" 2>/dev/null
    fi
    
    echo "Book Sorter should now be open in your browser!"
else
    echo "Error: Book Sorter files not found!"
    echo "Please ensure the 'book-sorter' folder is in the same directory as this script."
    echo "Expected path: $BOOK_SORTER_PATH"
fi
