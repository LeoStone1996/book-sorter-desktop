# 📚 Book Sorter - Desktop App

A beautiful, native desktop application for tracking and sorting books you've read. Built with modern web technologies and packaged as a native macOS app.

![Book Sorter](https://img.shields.io/badge/Platform-macOS-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **📖 Book Management**: Add books with title, author, genre, and date read
- **🔄 Smart Sorting**: Sort by date (newest/oldest first) with smooth animations
- **🗑️ Easy Deletion**: Remove books with confirmation dialog
- **🌙 Dark/Light Mode**: Toggle between themes with persistent preference
- **💾 Data Persistence**: All data saved locally using localStorage
- **🖥️ Native Desktop App**: Runs as a standalone macOS application
- **📱 PWA Support**: Can be installed as a Progressive Web App
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations

## 🚀 Quick Start

### Option 1: Native Desktop App (macOS)
1. Download the project
2. Double-click `Book Sorter.app`
3. Enjoy your native desktop book tracking app!

### Option 2: Web App
1. Open `book-sorter/index.html` in your browser
2. For best experience, use Chrome or Edge
3. Install as PWA for app-like experience

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Storage**: localStorage API
- **PWA**: Service Worker, Web App Manifest
- **Desktop**: AppleScript application bundle

## 📁 Project Structure

```
book-sorter/
├── index.html              # Main application
├── styles.css              # Styling and themes
├── script.js               # Application logic
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── icon-192.png           # App icon (192x192)
└── icon-512.png           # App icon (512x512)

Book Sorter.app/            # Native macOS application
├── Contents/
│   ├── Info.plist         # App metadata
│   ├── MacOS/applet       # Executable
│   └── Resources/         # App resources

Documentation/
├── NATIVE-DESKTOP-APP-GUIDE.md
├── INSTALL-AS-DESKTOP-APP.md
└── FINAL-DESKTOP-APP-SUMMARY.md
```

## 🎯 Key Features Explained

### Book Management
- Add books with comprehensive metadata
- View all books in a clean, card-based layout
- Delete books with confirmation to prevent accidents

### Smart Sorting
- Sort by date read (newest or oldest first)
- Smooth animations during sorting transitions
- Persistent sort preference

### Theme Support
- Light mode: Clean, bright interface
- Dark mode: Easy on the eyes for low-light use
- Theme preference saved automatically

### Native Desktop Experience
- Runs as a true macOS application
- Appears in dock with its own icon
- No browser UI visible when running
- Can be installed in Applications folder

## 🔧 Installation & Setup

### For Development
1. Clone this repository
2. Open `book-sorter/index.html` in a web browser
3. Start adding your books!

### For Production Use
1. Use the native `Book Sorter.app` for best experience
2. Or install as PWA from supported browsers

## 🎨 Customization

The app supports easy customization:
- Modify colors in `styles.css`
- Adjust window size in the native app launcher
- Add new fields by updating the form and data structure

## 📱 Progressive Web App

The app includes full PWA support:
- Offline functionality
- App-like installation
- Service worker caching
- Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web standards
- Inspired by the need for simple, beautiful book tracking
- Designed for both web and native desktop use

---

**Enjoy tracking your reading journey with Book Sorter!** 📚✨
