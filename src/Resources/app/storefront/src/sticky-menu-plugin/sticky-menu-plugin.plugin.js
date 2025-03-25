import DomAccess from 'src/helper/dom-access.helper';
import ViewportDetection from 'src/helper/viewport-detection.helper';
import Plugin from 'src/plugin-system/plugin.class';

/**
 * ModernHeader Plugin
 * Enhanced functionality for the modern header including sticky behavior and search
 */
export default class ModernHeader extends Plugin {
    static options = {
        stickyHeaderEnabled: true,
        searchResultsSelector: '.search-results',
        searchInputSelector: '[data-search-input]',
        headerSelector: '.header-main',
        navMainSelector: '.nav-main',
        mobileBreakpoint: 'lg'
    };

    init() {
        // Store DOM elements
        this.header = DomAccess.querySelector(document, this.options.headerSelector);
        this.navMain = DomAccess.querySelector(document, this.options.navMainSelector, false);
        this.searchInput = DomAccess.querySelector(document, this.options.searchInputSelector, false);
        this.searchResults = DomAccess.querySelector(document, this.options.searchResultsSelector, false);

        // Register event listeners
        this._registerEvents();

        // Initialize sticky header if enabled
        if (this.options.stickyHeaderEnabled) {
            this._initStickyHeader();
        }
    }

    /**
     * Register event listeners for header functionality
     * @private
     */
    _registerEvents() {
        // Live search results
        if (this.searchInput && this.searchResults) {
            this.searchInput.addEventListener('focus', this._onSearchFocus.bind(this));
            this.searchInput.addEventListener('input', this._debounce(this._onSearchInput.bind(this), 300));
            document.addEventListener('click', this._onClickOutside.bind(this));
        }

        // Listen for cart changes
        window.addEventListener('cart-widget-refresh', () => {
            this._refreshCartCounter();
        });

        // Resize event for responsive adjustments
        window.addEventListener('resize', this._debounce(this._onResize.bind(this), 200));
    }

    /**
     * Event handler for window resize
     * @private
     */
    _onResize() {
        // Handle responsive adjustments if needed
    }

    /**
     * Initialize sticky header functionality
     * @private
     */
    _initStickyHeader() {
        let lastScrollTop = 0;
        
        // Initial call to set header status
        this._handleHeaderSticky();

        window.addEventListener('scroll', this._debounce(() => {
            this._handleHeaderSticky(lastScrollTop);
            lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        }, 10));
    }

    /**
     * Handle sticky header logic
     * @param {number} lastScrollTop - Last scroll position
     * @private
     */
    _handleHeaderSticky(lastScrollTop = 0) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = this.header.offsetHeight;
        const headerOffset = this._getHeaderOffset();
        
        // Header behavior on scroll
        if (scrollTop > headerOffset) {
            // Scrolling down - hide header
            if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                this.header.classList.remove('header-sticky');
                this.header.classList.add('header-hidden');
            } 
            // Scrolling up - show header
            else if (scrollTop < lastScrollTop) {
                this.header.classList.remove('header-hidden');
                this.header.classList.add('header-sticky');
            }
        } else {
            // At the top of the page - show normal
            this.header.classList.remove('header-sticky', 'header-hidden');
        }
    }

    /**
     * Event handler for search focus
     * @private
     */
    _onSearchFocus() {
        if (this.searchInput.value.length > 2) {
            this._showSearchResults();
        }
    }

    /**
     * Event handler for search input
     * @private
     */
    _onSearchInput(event) {
        const value = event.target.value;
        
        if (value.length > 2) {
            this._fetchSearchResults(value);
        } else {
            this._hideSearchResults();
        }
    }

    /**
     * Load search results via AJAX
     * @param {string} term - Search term
     * @private
     */
    _fetchSearchResults(term) {
        // AJAX request for Shopware search
        const url = `${window.router['frontend.search.suggest']}?search=${term}`;
        
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.text())
        .then(html => {
            if (this.searchResults) {
                this.searchResults.innerHTML = html;
                this._showSearchResults();
            }
        })
        .catch(error => {
            console.error('Error loading search results:', error);
        });
    }

    /**
     * Show search results
     * @private
     */
    _showSearchResults() {
        if (this.searchResults) {
            this.searchResults.classList.add('show');
        }
    }

    /**
     * Hide search results
     * @private
     */
    _hideSearchResults() {
        if (this.searchResults) {
            this.searchResults.classList.remove('show');
        }
    }

    /**
     * Event handler for click outside of search
     * @param {Event} event
     * @private
     */
    _onClickOutside(event) {
        if (this.searchResults && this.searchResults.classList.contains('show')) {
            if (!this.searchResults.contains(event.target) && !this.searchInput.contains(event.target)) {
                this._hideSearchResults();
            }
        }
    }

    /**
     * Update cart counter
     * @private
     */
    _refreshCartCounter() {
        const cartCounters = document.querySelectorAll('.cart-badge');
        if (!cartCounters.length) return;

        // Get item count from cart widget
        const cartWidget = document.querySelector('[data-cart-widget="true"]');
        if (cartWidget && cartWidget.dataset.cartCount) {
            const count = parseInt(cartWidget.dataset.cartCount, 10);
            
            cartCounters.forEach(counter => {
                counter.textContent = count > 0 ? count : '';
                counter.style.display = count > 0 ? 'flex' : 'none';
            });
        }
    }

    /**
     * Calculate header offset
     * @returns {number}
     * @private
     */
    _getHeaderOffset() {
        // Consider top bar and notifications
        let offset = 0;
        const topBar = DomAccess.querySelector(document, '.top-bar', false);
        if (topBar) {
            offset += topBar.offsetHeight;
        }
        
        const notificationBar = DomAccess.querySelector(document, '.notification-bar', false);
        if (notificationBar) {
            offset += notificationBar.offsetHeight;
        }
        
        return offset;
    }

    /**
     * Debounce function for event handlers
     * @param {Function} func - Function to execute
     * @param {number} wait - Wait time in ms
     * @returns {Function}
     * @private
     */
    _debounce(func, wait) {
        let timeout;
        
        return function(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}