import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from 'src/helper/dom-access.helper';
import ViewportDetection from 'src/helper/viewport-detection.helper';

/**
 * ModernHeader Plugin
 * Erweiterte Funktionalitäten für den modernen Header
 */
export default class ModernHeader extends Plugin {
    static options = {
        stickyHeaderEnabled: true,
        megaMenuEnabled: true,
        searchResultsSelector: '.search-results',
        searchInputSelector: '[data-search-input]',
        headerSelector: '.header-main',
        categoryMenuSelector: '#categoriesMenu',
        categoryToggleSelector: '.nav-main-category-btn',
        mobileBreakpoint: 'lg'
    };

    init() {
        // DOM-Elemente speichern
        this.header = DomAccess.querySelector(document, this.options.headerSelector);
        this.searchInput = DomAccess.querySelector(this.el, this.options.searchInputSelector, false);
        this.searchResults = DomAccess.querySelector(this.el, this.options.searchResultsSelector, false);
        this.categoryMenu = DomAccess.querySelector(document, this.options.categoryMenuSelector, false);
        this.categoryToggle = DomAccess.querySelector(document, this.options.categoryToggleSelector, false);

        // Event-Listener registrieren
        this._registerEvents();

        // Sticky Header Handling
        if (this.options.stickyHeaderEnabled) {
            this._initStickyHeader();
        }

        // MegaMenu für Desktop-Geräte
        if (this.options.megaMenuEnabled && this.categoryMenu && this.categoryToggle) {
            this._initMegaMenu();
        }
    }

    /**
     * Event-Listener für Header-Funktionalitäten registrieren
     * @private
     */
    _registerEvents() {
        // Live-Suche-Ergebnisse
        if (this.searchInput && this.searchResults) {
            this.searchInput.addEventListener('focus', this._onSearchFocus.bind(this));
            this.searchInput.addEventListener('input', this._debounce(this._onSearchInput.bind(this), 300));
            document.addEventListener('click', this._onClickOutside.bind(this));
        }

        // Warenkorb-Dropdown auf Desktop
        const cartLink = DomAccess.querySelector(this.el, '.header-cart-btn', false);
        if (cartLink) {
            cartLink.addEventListener('mouseenter', this._onCartHover.bind(this));
        }

        // Account-Dropdown auf Desktop
        const accountLink = DomAccess.querySelector(this.el, '.header-account .header-action-link', false);
        if (accountLink) {
            accountLink.addEventListener('mouseenter', this._onAccountHover.bind(this));
        }

        // Falls ein Mini-Cart deiner Seite hinzugefügt wurde
        window.addEventListener('cart-widget-refresh', () => {
            this._refreshCartCounter();
        });
    }

    /**
     * Initialisierung des Sticky Headers
     * @private
     */
    _initStickyHeader() {
        const headerHeight = this.header.offsetHeight;
        const headerOffset = this._getHeaderOffset();
        let lastScrollTop = 0;

        window.addEventListener('scroll', this._debounce(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Header-Verhalten beim Scrollen
            if (scrollTop > headerOffset) {
                // Nach unten scrollen - Header verstecken
                if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                    this.header.classList.add('header-hidden');
                } 
                // Nach oben scrollen - Header anzeigen
                else if (scrollTop < lastScrollTop) {
                    this.header.classList.remove('header-hidden');
                    this.header.classList.add('header-sticky');
                }
            } else {
                // Am Anfang der Seite - normal anzeigen
                this.header.classList.remove('header-sticky', 'header-hidden');
            }
            
            lastScrollTop = scrollTop;
        }, 10));
    }

    /**
     * Mega-Menu Funktionalität
     * @private
     */
    _initMegaMenu() {
        if (ViewportDetection.isXS() || ViewportDetection.isSM() || ViewportDetection.isMD()) {
            return;
        }
        
        // Klick auf Kategorie-Button
        this.categoryToggle.addEventListener('click', (event) => {
            event.preventDefault();
            this.categoryMenu.classList.toggle('show');
        });
    }

    /**
     * Event-Handler für Suche-Fokus
     * @private
     */
    _onSearchFocus() {
        if (this.searchInput.value.length > 2) {
            this._showSearchResults();
        }
    }

    /**
     * Event-Handler für Suche-Eingabe
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
     * Suchergebnisse über AJAX laden
     * @param {string} term - Suchbegriff
     * @private
     */
    _fetchSearchResults(term) {
        // AJAX-Request für Shopware Suche
        const url = `${window.router['frontend.search.suggest']}?search=${term}`;
        
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.text())
        .then(html => {
            this.searchResults.innerHTML = html;
            this._showSearchResults();
        })
        .catch(error => {
            console.error('Error loading search results:', error);
        });
    }

    /**
     * Suchergebnisse anzeigen
     * @private
     */
    _showSearchResults() {
        this.searchResults.classList.add('show');
    }

    /**
     * Suchergebnisse ausblenden
     * @private
     */
    _hideSearchResults() {
        this.searchResults.classList.remove('show');
    }

    /**
     * Event-Handler für Klick außerhalb der Suche
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
     * Event-Handler für Hover über Warenkorb
     * @private
     */
    _onCartHover() {
        if (ViewportDetection.isXS() || ViewportDetection.isSM() || ViewportDetection.isMD()) {
            return;
        }

        // Optional: Mini-Cart per AJAX aktualisieren
        // this._fetchCartContent();
    }

    /**
     * Event-Handler für Hover über Account
     * @private
     */
    _onAccountHover() {
        if (ViewportDetection.isXS() || ViewportDetection.isSM() || ViewportDetection.isMD()) {
            return;
        }
        
        // Optional: Account-Dropdown-Inhalte per AJAX aktualisieren
    }

    /**
     * Warenkorb-Zähler aktualisieren
     * @private
     */
    _refreshCartCounter() {
        const cartCounter = DomAccess.querySelector(document, '.cart-badge', false);
        if (!cartCounter) return;

        // Beispiel: Wenn der Mini-Cart eine Anzahl der Artikel im Template bereitstellt
        const miniCart = DomAccess.querySelector(document, '.header-cart', false);
        if (miniCart && miniCart.dataset.cartCount) {
            const count = parseInt(miniCart.dataset.cartCount, 10);
            cartCounter.textContent = count > 0 ? count : '';
            cartCounter.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    /**
     * Offset des Headers berechnen
     * @returns {number}
     * @private
     */
    _getHeaderOffset() {
        // Berücksichtigen der Top-Bar und Notifications
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
     * Debounce-Funktion für Event-Handler
     * @param {Function} func - Auszuführende Funktion 
     * @param {number} wait - Wartezeit in ms
     * @returns {Function}
     * @private
     */
    _debounce(func, wait) {
        let timeout;
        
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}