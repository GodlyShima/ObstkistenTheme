// Import dependencies
import ModernHeader from './sticky-menu-plugin/sticky-menu-plugin.plugin';
import './mega-menu'; // Import our enhanced mega menu script
import './dropdown-fix'; // Import bootstrap dropdown fix
import './dropdown-mega-menu-integration';


/**
 * Main entry point for theme JavaScript
 * Initializes plugins and event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // Register ModernHeader plugin with correct selector
    const PluginManager = window.PluginManager;
    if (PluginManager) {
        PluginManager.register('ModernHeader', ModernHeader, '[data-modern-header]');
        
        // Initialize Bootstrap components if available
        if (typeof bootstrap !== 'undefined') {
            // Initialize tooltips
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
            
            // Initialize popovers
            const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
            
            // Initialize dropdowns
            const dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
            dropdownTriggerList.forEach(dropdownTriggerEl => {
                new bootstrap.Dropdown(dropdownTriggerEl, {
                    offset: [0, 10], // Add some vertical offset
                    popperConfig: {
                        strategy: 'fixed', // This helps ensure proper positioning
                        modifiers: [
                            {
                                name: 'preventOverflow',
                                options: {
                                    mainAxis: false // Allow overflow on the main axis
                                }
                            }
                        ]
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
        
        // Initialize cart badge
        updateCartBadge();
        
        // Update cart badge when cart changes
        window.addEventListener('cart-widget-refresh', updateCartBadge);
    }
});