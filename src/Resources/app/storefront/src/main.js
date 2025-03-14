// Import all necessary dependencies
import StickyHeaderPlugin from './plugin/sticky-header.plugin';

// Register the plugin
const PluginManager = window.PluginManager;
PluginManager.register('StickyHeader', StickyHeaderPlugin, '[data-sticky-header]');

// Initialize on document ready
if (document.readyState !== 'loading') {
    PluginManager.initializePlugins();
}
