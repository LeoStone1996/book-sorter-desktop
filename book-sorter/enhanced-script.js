class EnhancedBookSorter {
    constructor() {
        this.books = this.loadBooks();
        this.currentSort = 'newest';
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.isPremium = this.checkPremiumStatus();
        this.analytics = new AnalyticsManager();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderBooks();
        this.initTheme();
        this.initPremiumFeatures();
        this.showWelcomeMessage();
        this.analytics.trackEvent('app_opened');
    }

    bindEvents() {
        const form = document.getElementById('bookForm');
        const sortNewest = document.getElementById('sortNewest');
        const sortOldest = document.getElementById('sortOldest');
        const sortTitle = document.getElementById('sortTitle');
        const sortAuthor = document.getElementById('sortAuthor');
        const themeToggle = document.getElementById('themeToggle');
        const searchInput = document.getElementById('searchInput');
        const genreFilter = document.getElementById('genreFilter');
        const exportBtn = document.getElementById('exportBtn');
        const importBtn = document.getElementById('importBtn');
        const importFile = document.getElementById('importFile');
        const statsBtn = document.getElementById('statsBtn');
        const upgradeBtn = document.getElementById('upgradeBtn');

        form.addEventListener('submit', (e) => this.handleAddBook(e));
        sortNewest.addEventListener('click', () => this.sortBooks('newest'));
        sortOldest.addEventListener('click', () => this.sortBooks('oldest'));
        sortTitle.addEventListener('click', () => this.sortBooks('title'));
        sortAuthor.addEventListener('click', () => this.sortBooks('author'));
        themeToggle.addEventListener('click', () => this.toggleTheme());
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        genreFilter.addEventListener('change', (e) => this.handleFilter(e.target.value));
        exportBtn.addEventListener('click', () => this.exportBooks());
        importBtn.addEventListener('click', () => importFile.click());
        importFile.addEventListener('change', (e) => this.importBooks(e));
        statsBtn.addEventListener('click', () => this.showStatistics());
        if (upgradeBtn) upgradeBtn.addEventListener('click', () => this.showUpgradeModal());
        
        // Event delegation for dynamic buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                this.handleDeleteBook(e);
            } else if (e.target.classList.contains('edit-btn')) {
                this.handleEditBook(e);
            } else if (e.target.classList.contains('rating-star')) {
                this.handleRating(e);
            }
        });

        // Auto-save functionality
        setInterval(() => this.autoSave(), 30000); // Auto-save every 30 seconds
    }

    handleAddBook(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const genre = document.getElementById('genre').value.trim();
        const dateRead = document.getElementById('dateRead').value;
        const rating = document.getElementById('rating').value;
        const notes = document.getElementById('notes').value.trim();

        if (!title || !author || !genre || !dateRead) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        const book = {
            id: Date.now(),
            title,
            author,
            genre,
            dateRead,
            rating: parseInt(rating) || 0,
            notes,
            dateAdded: new Date().toISOString(),
            readingTime: this.calculateReadingTime(title, author)
        };

        this.books.push(book);
        this.saveBooks();
        this.renderBooks();
        this.updateGenreFilter();
        this.clearForm();
        this.showNotification(`"${title}" added successfully!`, 'success');
        this.analytics.trackEvent('book_added', { genre, rating });
    }

    handleEditBook(e) {
        if (!this.isPremium) {
            this.showUpgradeModal('editing');
            return;
        }

        const bookId = parseInt(e.target.getAttribute('data-book-id'));
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        this.showEditModal(book);
    }

    handleRating(e) {
        const bookId = parseInt(e.target.getAttribute('data-book-id'));
        const rating = parseInt(e.target.getAttribute('data-rating'));
        
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            book.rating = rating;
            this.saveBooks();
            this.renderBooks();
            this.analytics.trackEvent('book_rated', { rating });
        }
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.renderBooks();
        this.analytics.trackEvent('search_performed');
    }

    handleFilter(filter) {
        this.currentFilter = filter;
        this.renderBooks();
        this.analytics.trackEvent('filter_applied', { filter });
    }

    sortBooks(direction) {
        this.currentSort = direction;
        
        // Update active button
        document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`sort${direction.charAt(0).toUpperCase() + direction.slice(1)}`).classList.add('active');
        
        this.renderBooks();
        this.analytics.trackEvent('books_sorted', { direction });
    }

    getSortedAndFilteredBooks() {
        let filteredBooks = [...this.books];

        // Apply search filter
        if (this.searchQuery) {
            filteredBooks = filteredBooks.filter(book => 
                book.title.toLowerCase().includes(this.searchQuery) ||
                book.author.toLowerCase().includes(this.searchQuery) ||
                book.genre.toLowerCase().includes(this.searchQuery)
            );
        }

        // Apply genre filter
        if (this.currentFilter !== 'all') {
            filteredBooks = filteredBooks.filter(book => 
                book.genre.toLowerCase() === this.currentFilter.toLowerCase()
            );
        }

        // Apply sorting
        return filteredBooks.sort((a, b) => {
            switch (this.currentSort) {
                case 'newest':
                    return new Date(b.dateRead) - new Date(a.dateRead);
                case 'oldest':
                    return new Date(a.dateRead) - new Date(b.dateRead);
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'author':
                    return a.author.localeCompare(b.author);
                default:
                    return new Date(b.dateRead) - new Date(a.dateRead);
            }
        });
    }

    renderBooks() {
        const booksList = document.getElementById('booksList');
        const sortedBooks = this.getSortedAndFilteredBooks();

        if (sortedBooks.length === 0) {
            const message = this.searchQuery || this.currentFilter !== 'all' 
                ? 'No books match your search criteria.' 
                : 'No books added yet. Add your first book above!';
            
            booksList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📚</div>
                    <p>${message}</p>
                    ${this.searchQuery || this.currentFilter !== 'all' ? 
                        '<button onclick="bookSorter.clearFilters()" class="clear-filters-btn">Clear Filters</button>' : ''}
                </div>
            `;
            return;
        }

        const booksHTML = sortedBooks.map(book => this.createBookCard(book)).join('');
        booksList.innerHTML = booksHTML;

        // Update book count
        document.getElementById('bookCount').textContent = `${sortedBooks.length} book${sortedBooks.length !== 1 ? 's' : ''}`;

        // Add animations
        setTimeout(() => {
            const bookCards = document.querySelectorAll('.book-card');
            bookCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('fade-in');
            });
        }, 50);
    }

    createBookCard(book) {
        const formattedDate = this.formatDate(book.dateRead);
        const ratingStars = this.createRatingStars(book.rating, book.id);
        const readingTime = book.readingTime || 'Unknown';
        
        return `
            <div class="book-card" data-id="${book.id}">
                <div class="book-header">
                    <div class="book-title">${this.escapeHtml(book.title)}</div>
                    <div class="book-actions">
                        ${this.isPremium ? `<button class="edit-btn" data-book-id="${book.id}" title="Edit book">✏️</button>` : ''}
                        <button class="delete-btn" data-book-id="${book.id}" title="Delete book">🗑️</button>
                    </div>
                </div>
                <div class="book-author">by ${this.escapeHtml(book.author)}</div>
                <div class="book-rating">${ratingStars}</div>
                <div class="book-details">
                    <div class="book-meta">
                        <span class="book-genre">${this.escapeHtml(book.genre)}</span>
                        <span class="book-date">Read on ${formattedDate}</span>
                        ${this.isPremium ? `<span class="reading-time">~${readingTime} reading time</span>` : ''}
                    </div>
                </div>
                ${book.notes && this.isPremium ? `<div class="book-notes">"${this.escapeHtml(book.notes)}"</div>` : ''}
            </div>
        `;
    }

    createRatingStars(rating, bookId) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            const filled = i <= rating;
            stars += `<span class="rating-star ${filled ? 'filled' : ''}" data-book-id="${bookId}" data-rating="${i}">⭐</span>`;
        }
        return `<div class="rating-container">${stars}</div>`;
    }

    exportBooks() {
        if (!this.isPremium) {
            this.showUpgradeModal('export');
            return;
        }

        const exportData = {
            books: this.books,
            exportDate: new Date().toISOString(),
            version: '2.0'
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `book-sorter-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.showNotification('Books exported successfully!', 'success');
        this.analytics.trackEvent('books_exported', { count: this.books.length });
    }

    importBooks(e) {
        if (!this.isPremium) {
            this.showUpgradeModal('import');
            return;
        }

        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importData = JSON.parse(event.target.result);
                const importedBooks = importData.books || importData; // Support both formats
                
                if (!Array.isArray(importedBooks)) {
                    throw new Error('Invalid file format');
                }

                const confirmImport = confirm(`Import ${importedBooks.length} books? This will add to your existing collection.`);
                if (confirmImport) {
                    // Add unique IDs to avoid conflicts
                    const booksToImport = importedBooks.map(book => ({
                        ...book,
                        id: Date.now() + Math.random(),
                        dateAdded: new Date().toISOString()
                    }));

                    this.books.push(...booksToImport);
                    this.saveBooks();
                    this.renderBooks();
                    this.updateGenreFilter();
                    this.showNotification(`Successfully imported ${booksToImport.length} books!`, 'success');
                    this.analytics.trackEvent('books_imported', { count: booksToImport.length });
                }
            } catch (error) {
                this.showNotification('Error importing file. Please check the format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    showStatistics() {
        if (!this.isPremium) {
            this.showUpgradeModal('statistics');
            return;
        }

        const stats = this.calculateStatistics();
        this.showStatsModal(stats);
        this.analytics.trackEvent('statistics_viewed');
    }

    calculateStatistics() {
        const totalBooks = this.books.length;
        const genres = {};
        const authors = {};
        const monthlyReading = {};
        let totalRating = 0;
        let ratedBooks = 0;

        this.books.forEach(book => {
            // Genre stats
            genres[book.genre] = (genres[book.genre] || 0) + 1;
            
            // Author stats
            authors[book.author] = (authors[book.author] || 0) + 1;
            
            // Monthly reading stats
            const month = new Date(book.dateRead).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
            monthlyReading[month] = (monthlyReading[month] || 0) + 1;
            
            // Rating stats
            if (book.rating > 0) {
                totalRating += book.rating;
                ratedBooks++;
            }
        });

        const averageRating = ratedBooks > 0 ? (totalRating / ratedBooks).toFixed(1) : 0;
        const favoriteGenre = Object.keys(genres).reduce((a, b) => genres[a] > genres[b] ? a : b, '');
        const favoriteAuthor = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b, '');

        return {
            totalBooks,
            averageRating,
            favoriteGenre,
            favoriteAuthor,
            genres,
            authors,
            monthlyReading,
            ratedBooks
        };
    }

    calculateReadingTime(title, author) {
        // Estimate reading time based on average book length
        const averageWordsPerPage = 250;
        const averageReadingSpeed = 200; // words per minute
        
        // Rough estimation based on genre and title length
        const estimatedPages = Math.max(200, Math.min(600, title.length * 10 + author.length * 5));
        const estimatedWords = estimatedPages * averageWordsPerPage;
        const readingTimeMinutes = Math.round(estimatedWords / averageReadingSpeed);
        
        if (readingTimeMinutes < 60) {
            return `${readingTimeMinutes} minutes`;
        } else {
            const hours = Math.round(readingTimeMinutes / 60);
            return `${hours} hour${hours !== 1 ? 's' : ''}`;
        }
    }

    updateGenreFilter() {
        const genreFilter = document.getElementById('genreFilter');
        const genres = [...new Set(this.books.map(book => book.genre))].sort();
        
        genreFilter.innerHTML = '<option value="all">All Genres</option>' +
            genres.map(genre => `<option value="${genre}">${genre}</option>`).join('');
    }

    clearFilters() {
        this.searchQuery = '';
        this.currentFilter = 'all';
        document.getElementById('searchInput').value = '';
        document.getElementById('genreFilter').value = 'all';
        this.renderBooks();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    showWelcomeMessage() {
        if (!localStorage.getItem('bookSorterWelcomed')) {
            setTimeout(() => {
                this.showNotification('Welcome to Book Sorter! Start by adding your first book.', 'info');
                localStorage.setItem('bookSorterWelcomed', 'true');
            }, 1000);
        }
    }

    checkPremiumStatus() {
        // In a real app, this would check with a server
        return localStorage.getItem('bookSorterPremium') === 'true';
    }

    showUpgradeModal(feature = '') {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>🌟 Upgrade to Premium</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    <p>Unlock powerful features to enhance your reading experience:</p>
                    <ul class="premium-features">
                        <li>✏️ Edit book details</li>
                        <li>📊 Detailed reading statistics</li>
                        <li>📤 Export your library</li>
                        <li>📥 Import from other apps</li>
                        <li>📝 Add personal notes</li>
                        <li>⏱️ Reading time estimates</li>
                        <li>🔄 Cloud sync (coming soon)</li>
                    </ul>
                    ${feature ? `<p class="feature-highlight">You tried to use: <strong>${feature}</strong></p>` : ''}
                    <div class="modal-actions">
                        <button class="btn-premium">Upgrade Now - $4.99</button>
                        <button class="btn-trial">Start Free Trial</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').onclick = () => document.body.removeChild(modal);
        modal.querySelector('.btn-trial').onclick = () => {
            this.startFreeTrial();
            document.body.removeChild(modal);
        };
        modal.onclick = (e) => {
            if (e.target === modal) document.body.removeChild(modal);
        };

        this.analytics.trackEvent('upgrade_modal_shown', { feature });
    }

    startFreeTrial() {
        localStorage.setItem('bookSorterPremium', 'true');
        localStorage.setItem('bookSorterTrialStart', Date.now().toString());
        this.isPremium = true;
        this.showNotification('🎉 Premium trial started! Enjoy all features for 7 days.', 'success');
        this.renderBooks(); // Refresh to show premium features
        this.analytics.trackEvent('trial_started');
    }

    autoSave() {
        this.saveBooks();
        console.log('Auto-saved at', new Date().toLocaleTimeString());
    }

    // ... (keeping all existing methods like saveBooks, loadBooks, etc.)
    saveBooks() {
        localStorage.setItem('bookSorterBooks', JSON.stringify(this.books));
        localStorage.setItem('bookSorterLastSave', Date.now().toString());
    }

    loadBooks() {
        const saved = localStorage.getItem('bookSorterBooks');
        return saved ? JSON.parse(saved) : [];
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clearForm() {
        document.getElementById('bookForm').reset();
    }

    handleDeleteBook(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const bookId = parseInt(e.target.getAttribute('data-book-id'));
        const bookCard = e.target.closest('.book-card');
        const bookTitle = bookCard.querySelector('.book-title').textContent;
        
        if (confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
            this.books = this.books.filter(book => book.id !== bookId);
            this.saveBooks();
            
            bookCard.style.transition = 'all 0.3s ease';
            bookCard.style.transform = 'translateX(-100%)';
            bookCard.style.opacity = '0';
            
            setTimeout(() => {
                this.renderBooks();
                this.updateGenreFilter();
            }, 300);

            this.analytics.trackEvent('book_deleted');
        }
    }

    initTheme() {
        const savedTheme = localStorage.getItem('bookSorterTheme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        localStorage.setItem('bookSorterTheme', newTheme);
        this.analytics.trackEvent('theme_changed', { theme: newTheme });
    }

    setTheme(theme) {
        const themeToggle = document.getElementById('themeToggle');
        
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
            themeToggle.title = 'Switch to light mode';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙';
            themeToggle.title = 'Switch to dark mode';
        }
    }

    initPremiumFeatures() {
        this.updateGenreFilter();
        
        // Show/hide premium features based on status
        const premiumElements = document.querySelectorAll('.premium-feature');
        premiumElements.forEach(el => {
            if (!this.isPremium) {
                el.style.opacity = '0.5';
                el.title = 'Premium feature - Click to upgrade';
            }
        });
    }
}

// Analytics Manager for tracking usage
class AnalyticsManager {
    constructor() {
        this.sessionId = Date.now().toString();
        this.events = [];
    }

    trackEvent(eventName, properties = {}) {
        const event = {
            name: eventName,
            properties,
            timestamp: Date.now(),
            sessionId: this.sessionId
        };
        
        this.events.push(event);
        
        // In a real app, you'd send this to your analytics service
        console.log('Analytics Event:', event);
        
        // Store locally for now
        const storedEvents = JSON.parse(localStorage.getItem('bookSorterAnalytics') || '[]');
        storedEvents.push(event);
        
        // Keep only last 1000 events
        if (storedEvents.length > 1000) {
            storedEvents.splice(0, storedEvents.length - 1000);
        }
        
        localStorage.setItem('bookSorterAnalytics', JSON.stringify(storedEvents));
    }

    getAnalytics() {
        return JSON.parse(localStorage.getItem('bookSorterAnalytics') || '[]');
    }
}

// Initialize the enhanced app
let bookSorter;
document.addEventListener('DOMContentLoaded', () => {
    bookSorter = new EnhancedBookSorter();
    
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});
