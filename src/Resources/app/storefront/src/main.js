import StickyHeaderPlugin from './sticky-menu-plugin/sticky-menu-plugin.plugin';

// Debug-Ausgabe hinzufügen
console.log('Main.js wird geladen');

// Get the PluginManager
const PluginManager = window.PluginManager;

// Debug: Prüfen, ob PluginManager existiert
console.log('PluginManager existiert:', !!PluginManager);

// Debug: Mehr Informationen über den Selektor ausgeben
console.log('Suche nach Elementen mit data-sticky-header:', document.querySelectorAll('[data-sticky-header]').length);

// Register the plugin with the correct selector
PluginManager.register('StickyHeader', StickyHeaderPlugin, '[data-sticky-header]');

// Nach der Registrierung einen Hinweis ausgeben
console.log('StickyHeader Plugin wurde registriert');

// Nach dem DOMContentLoaded Event prüfen, ob das Plugin initialisiert wurde
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM vollständig geladen, prüfe Header-Element:');
    const headerElement = document.querySelector('[data-sticky-header]');
    console.log('Header gefunden:', !!headerElement);
    if (headerElement) {
        console.log('Header-ID:', headerElement.id);
    }
});