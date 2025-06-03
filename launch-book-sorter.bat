@echo off
REM Book Sorter Launcher for Windows
REM This batch file opens the Book Sorter app in your default browser

echo Launching Book Sorter...

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
set "BOOK_SORTER_PATH=%SCRIPT_DIR%book-sorter\index.html"

REM Check if the book-sorter directory exists
if exist "%BOOK_SORTER_PATH%" (
    echo Opening Book Sorter in your default browser...
    start "" "%BOOK_SORTER_PATH%"
    echo Book Sorter should now be open in your browser!
) else (
    echo Error: Book Sorter files not found!
    echo Please ensure the 'book-sorter' folder is in the same directory as this batch file.
    echo Expected path: %BOOK_SORTER_PATH%
    pause
)
