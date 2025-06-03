# Contributing to Book Sorter Desktop

Thank you for your interest in contributing to Book Sorter Desktop! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Git installed on your machine
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic knowledge of HTML, CSS, and JavaScript

### Setting Up the Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/book-sorter-desktop.git
   cd book-sorter-desktop
   ```

2. **Open the project**
   ```bash
   # Simply open the HTML file in your browser
   open book-sorter/index.html
   # Or use a local server for better development experience
   ```

3. **Make your changes**
   - Edit files in the `book-sorter/` directory
   - Test your changes by refreshing the browser

## 📝 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Follow existing code patterns

### File Structure
```
book-sorter/
├── index.html      # Main HTML structure
├── styles.css      # All styling and themes
├── script.js       # Application logic
├── manifest.json   # PWA configuration
└── sw.js          # Service worker
```

### Testing
- Test in multiple browsers (Chrome, Firefox, Safari)
- Verify both light and dark modes work correctly
- Test responsive design on different screen sizes
- Ensure data persistence works (add/delete books, theme preference)

## 🐛 Reporting Issues

When reporting issues, please include:
- Browser and version
- Operating system
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable

## 💡 Feature Requests

We welcome feature requests! Please:
- Check existing issues first
- Describe the feature clearly
- Explain the use case
- Consider backward compatibility

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding guidelines
   - Test thoroughly
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Then create a Pull Request on GitHub
   ```

### Commit Message Guidelines
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when applicable

## 🎯 Areas for Contribution

### Easy Contributions
- Fix typos in documentation
- Improve CSS styling
- Add new themes or color schemes
- Enhance responsive design

### Medium Contributions
- Add new book fields (rating, notes, etc.)
- Implement export/import functionality
- Add keyboard shortcuts
- Improve accessibility

### Advanced Contributions
- Add search and filtering
- Implement book cover images
- Add reading statistics
- Create mobile app version

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript ES6+ Features](https://github.com/lukehoban/es6features)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the community

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to Book Sorter Desktop! 🎉
