class BookSorter {
    constructor() {
        this.books = this.loadBooks();
        this.currentSort = 'newest';
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderBooks();
        this.initTheme();
    }

    bindEvents() {
        const form = document.getElementById('bookForm');
        const sortNewest = document.getElementById('sortNewest');
        const sortOldest = document.getElementById('sortOldest');
        const themeToggle = document.getElementById('themeToggle');

        form.addEventListener('submit', (e) => this.handleAddBook(e));
        sortNewest.addEventListener('click', () => this.sortBooks('newest'));
        sortOldest.addEventListener('click', () => this.sortBooks('oldest'));
        themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Event delegation for delete buttons (since they're dynamically created)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                this.handleDeleteBook(e);
            }
        });
    }

    handleAddBook(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const genre = document.getElementById('genre').value.trim();
        const dateRead = document.getElementById('dateRead').value;

        if (!title || !author || !genre || !dateRead) {
            return;
        }

        const book = {
            id: Date.now(),
            title,
            author,
            genre,
            dateRead
        };

        this.books.push(book);
        this.saveBooks();
        this.renderBooks();
        this.clearForm();
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
        
        // Confirm deletion
        if (confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
            // Remove book from array
            this.books = this.books.filter(book => book.id !== bookId);
            
            // Save updated books list
            this.saveBooks();
            
            // Add fade-out animation before removing
            bookCard.style.transition = 'all 0.3s ease';
            bookCard.style.transform = 'translateX(-100%)';
            bookCard.style.opacity = '0';
            
            // Remove the card after animation
            setTimeout(() => {
                this.renderBooks();
            }, 300);
        }
    }

    sortBooks(direction) {
        this.currentSort = direction;
        
        // Update active button
        document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(direction === 'newest' ? 'sortNewest' : 'sortOldest').classList.add('active');
        
        // Add moving class for animation
        const bookCards = document.querySelectorAll('.book-card');
        bookCards.forEach(card => card.classList.add('moving'));
        
        // Sort and render after a brief delay for smooth animation
        setTimeout(() => {
            this.renderBooks();
        }, 100);
    }

    getSortedBooks() {
        return [...this.books].sort((a, b) => {
            const dateA = new Date(a.dateRead);
            const dateB = new Date(b.dateRead);
            
            if (this.currentSort === 'newest') {
                return dateB - dateA; // Newest first
            } else {
                return dateA - dateB; // Oldest first
            }
        });
    }

    renderBooks() {
        const booksList = document.getElementById('booksList');
        const sortedBooks = this.getSortedBooks();

        if (sortedBooks.length === 0) {
            booksList.innerHTML = `
                <div class="empty-state">
                    <p>No books added yet. Add your first book above!</p>
                </div>
            `;
            return;
        }

        const booksHTML = sortedBooks.map(book => this.createBookCard(book)).join('');
        booksList.innerHTML = booksHTML;

        // Add fade-in animation to new cards
        setTimeout(() => {
            const bookCards = document.querySelectorAll('.book-card');
            bookCards.forEach((card, index) => {
                card.classList.remove('moving');
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('fade-in');
            });
        }, 50);
    }

    createBookCard(book) {
        const formattedDate = this.formatDate(book.dateRead);
        
        return `
            <div class="book-card" data-id="${book.id}">
                <div class="book-title">${this.escapeHtml(book.title)}</div>
                <div class="book-author">by ${this.escapeHtml(book.author)}</div>
                <div class="book-details">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="book-genre">${this.escapeHtml(book.genre)}</span>
                        <span class="book-date">Read on ${formattedDate}</span>
                    </div>
                    <button class="delete-btn" data-book-id="${book.id}" title="Delete this book">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
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

    saveBooks() {
        localStorage.setItem('bookSorterBooks', JSON.stringify(this.books));
    }

    loadBooks() {
        const saved = localStorage.getItem('bookSorterBooks');
        return saved ? JSON.parse(saved) : [];
    }

    initTheme() {
        // Load saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('bookSorterTheme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Save theme preference
        localStorage.setItem('bookSorterTheme', newTheme);
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
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BookSorter();
    
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
