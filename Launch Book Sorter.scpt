-- AppleScript to launch Book Sorter
tell application "Finder"
    set currentFolder to (container of (path to me)) as string
    set bookSorterPath to currentFolder & "book-sorter:index.html"
    
    -- Check if the book-sorter folder exists
    if exists folder "book-sorter" of (container of (path to me)) then
        -- Open the HTML file in default browser
        open file bookSorterPath
    else
        display dialog "Book Sorter files not found. Please ensure the book-sorter folder is in the same directory as this script." with title "Book Sorter" buttons {"OK"} default button "OK"
    end if
end tell
