// Import all necessary dependencies
import StickyHeaderPlugin from './plugin/sticky-header.plugin';

// Debugging: Prüfen, ob die Datei geladen wird
console.log('ObstkistenOnlineTheme: main.js loaded');

// Register the plugin
const PluginManager = window.PluginManager;

// Debugging: Prüfen, ob der PluginManager existiert
if (PluginManager) {
    console.log('PluginManager found, registering StickyHeader plugin');
    PluginManager.register('StickyHeader', StickyHeaderPlugin, '[data-sticky-header]');
    
    // Stelle sicher, dass das Plugin initialisiert wird
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded, initializing plugins');
        PluginManager.initializePlugins();
        
        // Prüfen, ob das Plugin initialisiert wurde
        setTimeout(() => {
            const stickyHeader = document.querySelector('[data-sticky-header]');
            if (stickyHeader) {
                console.log('Sticky header element found:', stickyHeader);
                console.log('Is initialized:', stickyHeader.classList.contains('is-initialized'));
            } else {
                console.error('Sticky header element not found on the page!');
            }
        }, 500);
    });
} else {
    console.error('PluginManager not found');
}

// Als Fallback auch bei Window load initialisieren
window.addEventListener('load', () => {
    console.log('Window loaded, initializing plugins (fallback)');
    if (PluginManager) {
        const stickyHeader = document.querySelector('[data-sticky-header]');
        if (stickyHeader && !stickyHeader.classList.contains('is-initialized')) {
            console.log('Initializing sticky header on window load');
            PluginManager.initializePlugins();
        }
    }
});