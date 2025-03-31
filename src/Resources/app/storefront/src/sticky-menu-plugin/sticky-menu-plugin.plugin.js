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

        // Store header height for proper positioning
        this._setHeaderHeight();

        // Register event listeners
        this._registerEvents();

        // Initialize sticky header if enabled
        if (this.options.stickyHeaderEnabled) {
            this._initScrollBehavior();
        }
    }

    /**
     * Set header height as a CSS variable for proper positioning
     * @private
     */
    _setHeaderHeight() {
        if (this.header) {
            const headerHeight = this.header.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `132px`);
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
        window.addEventListener('resize', this._debounce(() => {
            this._onResize();
            this._setHeaderHeight();
        }, 200));
    }

    /**
     * Event handler for window resize
     * @private
     */
    _onResize() {
        // Reset nav classes on resize
        if (this.navMain) {
            this.navMain.classList.remove('nav-hidden', 'nav-visible');
            this.navMain.style.transform = '';
        }
    }

    /**
     * Initialize scroll behavior for header and navigation
     * @private
     */
    _initScrollBehavior() {
        let lastScrollTop = 0;
        let ticking = false;
        
        // Don't apply scroll behavior on mobile
        if (ViewportDetection.isXS() || ViewportDetection.isSM() || ViewportDetection.isMD()) {
            return;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                // Use requestAnimationFrame for smoother performance
                window.requestAnimationFrame(() => {
                    this._handleScrollBehavior(lastScrollTop);
                    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * Handle scroll behavior for header and navigation
     * @param {number} lastScrollTop - Last scroll position
     * @private
     */
    _handleScrollBehavior(lastScrollTop = 0) {
        // Skip on mobile devices
        if (ViewportDetection.isXS() || ViewportDetection.isSM() || ViewportDetection.isMD()) {
            return;
        }

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to header when scrolled
        if (scrollTop > 10) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        // Handle navigation visibility
        if (this.navMain) {
            // Scrolling down - hide navigation
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                this.navMain.classList.remove('nav-visible');
                this.navMain.classList.add('nav-hidden');
            } 
            // Scrolling up - show navigation
            else if (scrollTop < lastScrollTop && scrollTop > 100) {
                this.navMain.classList.remove('nav-hidden');
                this.navMain.classList.add('nav-visible');
            }
            // At the top - reset navigation
            else if (scrollTop <= 100) {
                this.navMain.classList.remove('nav-hidden', 'nav-visible');
            }
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