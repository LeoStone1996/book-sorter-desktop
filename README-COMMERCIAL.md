# Book Sorter Pro - Commercial Version

🚀 **Professional book tracking and reading analytics application** with premium features, cross-platform desktop support, and commercial-grade architecture.

## ✨ Features

### 🆓 Free Features
- ✅ Add and organize books with title, author, genre, and date read
- ✅ Sort by date, title, or author
- ✅ Dark/light theme toggle
- ✅ Responsive design for all devices
- ✅ Progressive Web App (PWA) support
- ✅ Offline functionality
- ✅ Basic search and filtering

### ⭐ Premium Features
- ✅ **Advanced Analytics** - Detailed reading statistics and insights
- ✅ **Personal Notes** - Add thoughts and quotes for each book
- ✅ **Star Ratings** - Rate books from 1-5 stars
- ✅ **Export/Import** - Backup and restore your library
- ✅ **Reading Time Estimates** - Automatic calculation of reading duration
- ✅ **Enhanced Search** - Advanced filtering and search capabilities
- ✅ **Book Editing** - Modify book details after adding
- ✅ **Cloud Sync** - Sync across devices (coming soon)

### 🖥️ Desktop App Features
- ✅ **Native Desktop Experience** - True desktop application
- ✅ **Cross-Platform** - Windows, macOS, and Linux support
- ✅ **Auto-Updates** - Automatic application updates
- ✅ **Native Menus** - Platform-specific menu integration
- ✅ **Secure Storage** - Encrypted local data storage
- ✅ **Keyboard Shortcuts** - Full keyboard navigation
- ✅ **System Integration** - File associations and notifications

## 🏗️ Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Desktop**: Electron with secure IPC communication
- **Storage**: Electron Store for secure local persistence
- **Analytics**: Built-in event tracking system
- **Updates**: Electron Auto-Updater
- **Build**: Electron Builder for cross-platform packaging

### Security Features
- ✅ Context isolation enabled
- ✅ Node integration disabled in renderer
- ✅ Secure IPC communication via preload scripts
- ✅ Content Security Policy (CSP)
- ✅ External link protection
- ✅ Encrypted local storage

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0.0 or higher
- npm or yarn package manager

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/LeoStone1996/book-sorter-desktop.git
   cd book-sorter-desktop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run serve
   ```

4. **Run Electron app in development**
   ```bash
   npm run dev
   ```

### Building for Production

#### Build for all platforms
```bash
npm run build
```

#### Platform-specific builds
```bash
npm run build-mac    # macOS (DMG + ZIP)
npm run build-win    # Windows (NSIS + Portable)
npm run build-linux  # Linux (AppImage + DEB)
```

### Distribution Files
After building, find your distributables in the `dist/` folder:

- **macOS**: `.dmg` installer and `.zip` archive
- **Windows**: `.exe` installer and portable `.exe`
- **Linux**: `.AppImage` and `.deb` package

## 📱 Mobile & Web Deployment

### Progressive Web App (PWA)
The app works as a PWA on mobile devices:

1. **Deploy to web server** (GitHub Pages, Netlify, Vercel)
2. **Visit URL on mobile device**
3. **Add to Home Screen** for native app experience

### GitHub Pages Deployment
Already configured! The app automatically redirects from the root to the enhanced version.

## 💰 Monetization Strategy

### Freemium Model
- **Free Tier**: Basic book tracking functionality
- **Premium Tier**: Advanced features for $4.99 one-time purchase
- **Free Trial**: 7-day trial of all premium features

### Premium Activation
```javascript
// Activate premium features
await electronAPI.activatePremium();
```

### Revenue Streams
1. **One-time Premium Purchase** - $4.99
2. **Future Subscription Model** - Cloud sync and advanced analytics
3. **Enterprise Licensing** - Team and organization features

## 🔧 Technical Implementation

### Premium Feature Detection
```javascript
class EnhancedBookSorter {
  checkPremiumStatus() {
    return localStorage.getItem('bookSorterPremium') === 'true';
  }
  
  showUpgradeModal(feature) {
    // Display premium upgrade prompt
  }
}
```

### Analytics Integration
```javascript
class AnalyticsManager {
  trackEvent(eventName, properties) {
    // Track user interactions for insights
    electronAPI.trackEvent({ name: eventName, properties });
  }
}
```

### Auto-Save & Data Persistence
```javascript
// Auto-save every 30 seconds
setInterval(() => this.autoSave(), 30000);

// Secure storage via Electron
await electronAPI.saveData(this.books);
```

## 📊 Analytics & Insights

### User Metrics Tracked
- App opens and session duration
- Feature usage patterns
- Premium conversion rates
- Book addition frequency
- Search and filter usage
- Export/import operations

### Business Intelligence
- User engagement metrics
- Feature adoption rates
- Premium trial conversion
- Platform usage distribution
- Retention analytics

## 🔐 Security & Privacy

### Data Protection
- All data stored locally by default
- No personal information transmitted
- Optional cloud sync with encryption
- GDPR compliant data handling

### Code Signing
```bash
# macOS code signing
export CSC_LINK="path/to/certificate.p12"
export CSC_KEY_PASSWORD="certificate_password"
npm run build-mac
```

## 🚀 Distribution Channels

### Direct Sales
- **Website**: booksorter.pro
- **Payment Processing**: Stripe/Paddle integration
- **License Management**: Custom licensing system

### App Stores
- **Mac App Store**: Submit via App Store Connect
- **Microsoft Store**: Submit via Partner Center
- **Snap Store**: Linux distribution

### Marketing Channels
- **Product Hunt** launch
- **GitHub** open source community
- **Developer blogs** and tutorials
- **Social media** presence

## 📈 Roadmap

### Version 2.1 (Q2 2024)
- [ ] Cloud synchronization
- [ ] Team collaboration features
- [ ] Advanced reading statistics
- [ ] Book recommendations
- [ ] Reading goals and challenges

### Version 2.2 (Q3 2024)
- [ ] Mobile companion app
- [ ] Goodreads integration
- [ ] Social sharing features
- [ ] Reading streaks and achievements

### Version 3.0 (Q4 2024)
- [ ] AI-powered book recommendations
- [ ] Advanced analytics dashboard
- [ ] Enterprise team features
- [ ] API for third-party integrations

## 🤝 Contributing

### Development Guidelines
1. Follow existing code style and patterns
2. Add tests for new features
3. Update documentation
4. Ensure cross-platform compatibility

### Premium Feature Development
- Mark premium features with `.premium-feature` class
- Implement upgrade prompts for restricted features
- Track feature usage for analytics

## 📄 License

### Commercial License
This commercial version includes proprietary features and is licensed for commercial distribution.

### Open Source Components
- Base functionality remains MIT licensed
- Premium features are proprietary
- Electron and dependencies follow their respective licenses

## 🆘 Support

### Documentation
- **User Guide**: booksorter.pro/guide
- **API Documentation**: booksorter.pro/docs
- **FAQ**: booksorter.pro/faq

### Support Channels
- **Email**: support@booksorter.pro
- **GitHub Issues**: Bug reports and feature requests
- **Discord**: Community support and discussions

## 📞 Contact

- **Website**: https://booksorter.pro
- **Email**: hello@booksorter.pro
- **GitHub**: https://github.com/LeoStone1996/book-sorter-desktop
- **Twitter**: @BookSorterPro

---

**Book Sorter Pro** - Transform your reading experience with professional book tracking and analytics. 📚✨
