# How to Launch Book Sorter as a Desktop App

Your Book Sorter app can now be launched like a regular desktop program! Here are the different ways to do it:

## 🍎 For macOS Users

### Option 1: Book Sorter.app (Recommended)
- **Double-click** on `Book Sorter.app` in Finder
- This will launch Book Sorter in your default browser
- The app will appear in your dock while running
- You can drag `Book Sorter.app` to your Applications folder or dock for easy access

### Option 2: Shell Script
- **Double-click** on `launch-book-sorter.sh`
- Or run it from Terminal: `./launch-book-sorter.sh`

## 🪟 For Windows Users

### Windows Batch File
- **Double-click** on `launch-book-sorter.bat`
- This will open Book Sorter in your default browser
- You can create a desktop shortcut to this file for easy access

## 🐧 For Linux Users

### Shell Script
- **Double-click** on `launch-book-sorter.sh` (if your file manager supports it)
- Or run it from Terminal: `./launch-book-sorter.sh`

## 📁 File Organization

Make sure your files are organized like this:
```
Your Folder/
├── book-sorter/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── Book Sorter.app          (macOS app)
├── launch-book-sorter.sh    (Cross-platform script)
├── launch-book-sorter.bat   (Windows batch file)
└── HOW-TO-LAUNCH.md         (This file)
```

## 🚀 Making it Even More App-Like

### For macOS:
1. **Add to Applications**: Drag `Book Sorter.app` to your `/Applications` folder
2. **Add to Dock**: Drag the app from Applications to your dock
3. **Spotlight Search**: You can now find it by searching "Book Sorter" in Spotlight

### For Windows:
1. **Desktop Shortcut**: Right-click `launch-book-sorter.bat` → "Create shortcut" → Move to desktop
2. **Start Menu**: Copy the shortcut to your Start Menu folder
3. **Taskbar**: Pin the shortcut to your taskbar

### For All Platforms:
- The app will remember your books between sessions (stored in browser localStorage)
- You can bookmark the opened page in your browser for quick access
- Consider setting your browser to open in fullscreen or app mode for a more native feel

## 🔧 Troubleshooting

**App won't open?**
- Make sure the `book-sorter` folder is in the same directory as the launcher
- Check that all files are present in the book-sorter folder

**Permission denied on macOS/Linux?**
- Run: `chmod +x launch-book-sorter.sh` in Terminal

**Windows security warning?**
- Click "More info" → "Run anyway" (the batch file is safe)

## 🎉 Enjoy Your Desktop Book Sorter!

Your Book Sorter now behaves like a real desktop application while maintaining all the benefits of a web app!
