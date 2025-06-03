-- Book Sorter Native App Launcher
tell application "Finder"
    set currentFolder to (container of (path to me)) as string
    set bookSorterPath to currentFolder & "book-sorter:index.html"
    
    -- Check if the book-sorter folder exists
    if exists folder "book-sorter" of (container of (path to me)) then
        -- Try to launch with Chrome in app mode for standalone window
        try
            set chromePath to "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
            set fileURL to "file://" & POSIX path of (bookSorterPath as alias)
            set chromeCommand to quoted form of chromePath & " --app=" & quoted form of fileURL & " --new-window --window-size=900,700 --window-position=100,100 > /dev/null 2>&1 &"
            do shell script chromeCommand
        on error
            -- Fallback to Microsoft Edge
            try
                set edgePath to "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
                set fileURL to "file://" & POSIX path of (bookSorterPath as alias)
                set edgeCommand to quoted form of edgePath & " --app=" & quoted form of fileURL & " --new-window --window-size=900,700 --window-position=100,100 > /dev/null 2>&1 &"
                do shell script edgeCommand
            on error
                -- Final fallback to Safari
                tell application "Safari"
                    activate
                    open file bookSorterPath
                end tell
            end try
        end try
    else
        display dialog "Book Sorter files not found. Please ensure the book-sorter folder is in the same directory as this app." with title "Book Sorter" buttons {"OK"} default button "OK"
    end if
end tell
