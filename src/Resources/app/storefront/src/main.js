import './mega-menu'; // Importiere das Mega-Menu JavaScript
import ModernHeader from './sticky-menu-plugin/sticky-menu-plugin.plugin';

// Debug-Ausgabe hinzufügen
console.log('Main.js wird geladen');

// Get the PluginManager
const PluginManager = window.PluginManager;

// Debug: Prüfen, ob PluginManager existiert
console.log('PluginManager existiert:', !!PluginManager);

// Debug: Mehr Informationen über den Selektor ausgeben
console.log('Suche nach Elementen mit data-modern-header:', document.querySelectorAll('[data-modern-header]').length);

// Register the plugin with the correct selector
PluginManager.register('ModernHeader', ModernHeader, '[data-modern-header]');

// Nach der Registrierung einen Hinweis ausgeben
console.log('StickyHeader Plugin wurde registriert');

// Initialize Tooltips and Popovers
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM vollständig geladen, initialisiere Bootstrap-Komponenten');
    
    // Initialize Bootstrap Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize Bootstrap Popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Mega Menu fix for touch devices
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) {
        document.querySelectorAll('.nav-main-item-with-children .nav-main-link').forEach(item => {
            item.addEventListener('click', function(e) {
                const parent = this.closest('.nav-main-item-with-children');
                const megaMenu = parent.querySelector('.mega-menu');
                
                if (megaMenu && window.innerWidth >= 992) {
                    if (megaMenu.style.visibility !== 'visible') {
                        e.preventDefault();
                        // Close all other menus
                        document.querySelectorAll('.mega-menu').forEach(menu => {
                            if (menu !== megaMenu) {
                                menu.style.visibility = 'hidden';
                                menu.style.opacity = '0';
                            }
                        });
                        
                        // Open this menu
                        megaMenu.style.visibility = 'visible';
                        megaMenu.style.opacity = '1';
                        
                        // Show overlay
                        const overlay = document.querySelector('.mega-menu-overlay');
                        if (overlay) {
                            overlay.classList.add('show');
                        }
                    }
                }
            });
        });
    }
    
    // Fix cart badge display
    const updateCartBadge = () => {
        const cartWidgets = document.querySelectorAll('[data-cart-widget="true"]');
        if (cartWidgets.length > 0) {
            cartWidgets.forEach(widget => {
                const count = widget.dataset.cartCount || '0';
                const badges = document.querySelectorAll('.cart-badge');
                
                badges.forEach(badge => {
                    if (parseInt(count) > 0) {
                        badge.textContent = count;
                        badge.style.display = 'flex';
                    } else {
                        badge.textContent = '';
                        badge.style.display = 'none';
                    }
                });
            });
        }
    };
    
    // Initial update
    updateCartBadge();
    
    // Listen for cart changes
    window.addEventListener('cart-widget-refresh', updateCartBadge);
    
    // Check header element
    const headerElement = document.querySelector('[data-modern-header]');
    console.log('Header gefunden:', !!headerElement);
    if (headerElement) {
        console.log('Header-ID:', headerElement.id);
    }
});