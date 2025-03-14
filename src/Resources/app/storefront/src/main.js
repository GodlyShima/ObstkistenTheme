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
} else {
    console.error('PluginManager not found');
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing plugins');
    if (PluginManager) {
        PluginManager.initializePlugins();
    }
});

// Als Fallback auch bei Window load initialisieren
window.addEventListener('load', () => {
    console.log('Window loaded, initializing plugins (fallback)');
    if (PluginManager && !document.querySelector('[data-sticky-header].is-initialized')) {
        PluginManager.initializePlugins();
    }
});