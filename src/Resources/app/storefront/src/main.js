// Import dependencies
import ModernHeader from './sticky-menu-plugin/sticky-menu-plugin.plugin';
import './mega-menu'; // Consolidated mega menu script

/**
 * Main entry point for theme JavaScript
 * Initializes plugins and event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // Register ModernHeader plugin with correct selector
    const PluginManager = window.PluginManager;
    if (PluginManager) {

        const accountWidget = document.getElementById('accountWidget');
        const accountDropdown = document.querySelector('.js-account-menu-dropdown');
    
        if (accountWidget && accountDropdown) {
            accountWidget.addEventListener('click', function(event) {
                // Toggle die 'show' Klasse
                accountDropdown.classList.toggle('show');
    
                // Optional: Toggle aria-expanded für Barrierefreiheit
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
            });
    
            // Optional: Schließen des Dropdowns, wenn außerhalb geklickt wird
            document.addEventListener('click', function(event) {
                if (!accountWidget.contains(event.target) && 
                    !accountDropdown.contains(event.target)) {
                    accountDropdown.classList.remove('show');
                    accountWidget.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
    }

});