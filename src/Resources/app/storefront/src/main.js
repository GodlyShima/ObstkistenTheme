import StickyHeaderPlugin from './sticky-menu-plugin/sticky-menu-plugin.plugin';

const PluginManager = window.PluginManager;

PluginManager.register('StickyHeader', StickyHeaderPlugin, '[data-sticky-header]')
