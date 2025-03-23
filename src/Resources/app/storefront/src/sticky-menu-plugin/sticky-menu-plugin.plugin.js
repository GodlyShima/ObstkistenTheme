import DomAccess from 'src/helper/dom-access.helper';
import ViewportDetection from 'src/helper/viewport-detection.helper';
import Plugin from 'src/plugin-system/plugin.class';

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
        navMainSelector: '.nav-main',
        megaMenuSelector: '.mega-menu',
        megaMenuTriggerSelector: '[data-bs-toggle="dropdown"]',
        megaMenuOverlaySelector: '.mega-menu-overlay',
        mobileBreakpoint: 'lg'
    };

    init() {
        // DOM-Elemente speichern
        this.header = DomAccess.querySelector(document, this.options.headerSelector);
        this.navMain = DomAccess.querySelector(document, this.options.navMainSelector, false);
        this.searchInput = DomAccess.querySelector(document, this.options.searchInputSelector, false);
        this.searchResults = DomAccess.querySelector(document, this.options.searchResultsSelector, false);
        this.megaMenuItems = document.querySelectorAll('.nav-main-item-with-children');
        this.megaMenuOverlay = DomAccess.querySelector(document, this.options.megaMenuOverlaySelector, false);

        // Event-Listener registrieren
        this._registerEvents();

        // Sticky Header Handling
        if (this.options.stickyHeaderEnabled) {
            this._initStickyHeader();
        }

        // MegaMenu für Desktop-Geräte
        if (this.options.megaMenuEnabled) {
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

        // Falls ein Mini-Cart deiner Seite hinzugefügt wurde
        window.addEventListener('cart-widget-refresh', () => {
            this._refreshCartCounter();
        });

        // Resize-Event für responsive Anpassung
        window.addEventListener('resize', this._debounce(this._onResize.bind(this), 200));
    }

    /**
     * Event-Handler für Fenster-Resize
     * @private
     */
    _onResize() {
        if (ViewportDetection.isXS() || ViewportDetection.isSM() || ViewportDetection.isMD()) {
            // In Mobile-Ansicht Mega-Menüs schließen
            this._closeMegaMenus();
        }
    }

    /**
     * Initialisierung des Sticky Headers
     * @private
     */
    _initStickyHeader() {
        const headerHeight = this.header.offsetHeight;
        const headerOffset = this._getHeaderOffset();
        let lastScrollTop = 0;
        
        // Initialer Aufruf, um den Header-Status zu setzen
        this._handleHeaderSticky();

        window.addEventListener('scroll', this._debounce(() => {
            this._handleHeaderSticky(lastScrollTop);
            lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        }, 10));
    }

    /**
     * Sticky Header Logik
     * @param {number} lastScrollTop - Letzte Scroll-Position
     * @private
     */
    _handleHeaderSticky(lastScrollTop = 0) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = this.header.offsetHeight;
        const headerOffset = this._getHeaderOffset();
        
        // Header-Verhalten beim Scrollen
        if (scrollTop > headerOffset) {
            // Nach unten scrollen - Header verstecken
            if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                this.header.classList.remove('header-sticky');
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
    }

    /**
     * Mega-Menu Funktionalität
     * @private
     */
    _initMegaMenu() {
        if (ViewportDetection.isXS() || ViewportDetection.isSM() || ViewportDetection.isMD()) {
            return;
        }
        
        // Mega-Menü Events
        this.megaMenuItems.forEach(item => {
            const trigger = item.querySelector(this.options.megaMenuTriggerSelector);
            const megaMenu = item.querySelector(this.options.megaMenuSelector);
            
            if (trigger && megaMenu) {
                // Hover Events für Desktop
                item.addEventListener('mouseenter', () => {
                    this._showMegaMenu(item);
                });
                
                item.addEventListener('mouseleave', () => {
                    this._closeMegaMenus();
                });
                
                // Touch Events für Mobile/Tablet
                trigger.addEventListener('click', (event) => {
                    if (ViewportDetection.isLG() || ViewportDetection.isXL() || ViewportDetection.isXXL()) {
                        event.preventDefault();
                        this._toggleMegaMenu(item);
                    }
                });
            }
        });
        
        // Schließen beim Klicken außerhalb
        document.addEventListener('click', (event) => {
            const isInMegaMenu = event.target.closest(this.options.megaMenuSelector) || 
                                 event.target.closest('.nav-main-item-with-children');
            
            if (!isInMegaMenu) {
                this._closeMegaMenus();
            }
        });
        
        // Escape-Taste zum Schließen
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this._closeMegaMenus();
            }
        });
        
        // Overlay-Klick zum Schließen
        if (this.megaMenuOverlay) {
            this.megaMenuOverlay.addEventListener('click', () => {
                this._closeMegaMenus();
            });
        }
    }

    /**
     * Mega-Menü anzeigen
     * @param {HTMLElement} menuItem - Das Menü-Element
     * @private
     */
    _showMegaMenu(menuItem) {
        // Zuerst alle schließen
        this._closeMegaMenus();
        
        // Das ausgewählte öffnen
        const megaMenu = menuItem.querySelector(this.options.megaMenuSelector);
        
        if (megaMenu) {
            // Timeout für flüssigere Animation
            setTimeout(() => {
                megaMenu.style.transform = 'translateY(0)';
                megaMenu.style.visibility = 'visible';
                megaMenu.style.opacity = '1';
                
                if (this.megaMenuOverlay) {
                    this.megaMenuOverlay.classList.add('show');
                }
            }, 50);
        }
    }

    /**
     * Mega-Menü umschalten (für Touchgeräte)
     * @param {HTMLElement} menuItem - Das Menü-Element
     * @private
     */
    _toggleMegaMenu(menuItem) {
        const megaMenu = menuItem.querySelector(this.options.megaMenuSelector);
        const isVisible = megaMenu && megaMenu.style.visibility === 'visible';
        
        this._closeMegaMenus();
        
        if (!isVisible && megaMenu) {
            this._showMegaMenu(menuItem);
        }
    }

    /**
     * Alle Mega-Menüs schließen
     * @private
     */
    _closeMegaMenus() {
        document.querySelectorAll(this.options.megaMenuSelector).forEach(menu => {
            menu.style.transform = 'translateY(10px)';
            menu.style.visibility = 'hidden';
            menu.style.opacity = '0';
        });
        
        if (this.megaMenuOverlay) {
            this.megaMenuOverlay.classList.remove('show');
        }
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
     * Suchergebnisse anzeigen
     * @private
     */
    _showSearchResults() {
        if (this.searchResults) {
            this.searchResults.classList.add('show');
        }
    }

    /**
     * Suchergebnisse ausblenden
     * @private
     */
    _hideSearchResults() {
        if (this.searchResults) {
            this.searchResults.classList.remove('show');
        }
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
     * Warenkorb-Zähler aktualisieren
     * @private
     */
    _refreshCartCounter() {
        const cartCounters = document.querySelectorAll('.cart-badge');
        if (!cartCounters.length) return;

        // Anzahl der Artikel aus dem Warenkorb abrufen
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