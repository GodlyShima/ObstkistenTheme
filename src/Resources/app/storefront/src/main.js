// Import dependencies
import ModernHeader from './sticky-menu-plugin/sticky-menu-plugin.plugin';
import './mega-menu'; // Consolidated mega menu script
import EnhancedGallerySlider from './enhanced-gallery-slider/enhanced-gallery-slider.plugin';

/**
 * Main entry point for theme JavaScript
 * Initializes plugins and event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // Register ModernHeader plugin with correct selector
    const PluginManager = window.PluginManager;
    if (PluginManager) {
        // Detect mobile devices for additional optimizations
        const isMobile = window.innerWidth < 576;
        
        // Add mobile class to body for CSS targeting
        if (isMobile) {
            document.body.classList.add('is-mobile');
        }
        
        // Optimize gallery for mobile
        const gallerySliders = document.querySelectorAll('.gallery-slider');
        if (gallerySliders.length && isMobile) {
            gallerySliders.forEach(slider => {
                slider.classList.add('is-mobile-optimized');
            });
            
            // Initialize any additional mobile-specific behavior
            initMobileGalleryBehavior();
        }

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

/**
 * Initialize additional mobile-specific gallery behavior
 */
function initMobileGalleryBehavior() {
    // Enable pagination dots for all product galleries
    const galleryContainers = document.querySelectorAll('[data-gallery-slider-container="true"]');
    const galleryDots = document.querySelectorAll('.mobile-gallery-dots .dot');
    
    if (galleryContainers.length > 0 && galleryDots.length > 0) {
        // Make dots visible
        const dotsContainer = document.querySelector('.mobile-gallery-dots');
        if (dotsContainer) {
            dotsContainer.style.display = 'flex';
        }
        
        // Ensure thumbnails are hidden
        const thumbnailsCol = document.querySelector('.gallery-slider-thumbnails-col');
        if (thumbnailsCol) {
            thumbnailsCol.style.display = 'none';
        }
        
        // Add swipe instruction hint
        const galleryRow = document.querySelector('.gallery-slider-row');
        if (galleryRow && !document.querySelector('.swipe-hint')) {
            const swipeHint = document.createElement('div');
            swipeHint.className = 'swipe-hint';
            swipeHint.textContent = 'Wischen zum Navigieren';
            swipeHint.style.position = 'absolute';
            swipeHint.style.bottom = '40px';
            swipeHint.style.left = '0';
            swipeHint.style.right = '0';
            swipeHint.style.textAlign = 'center';
            swipeHint.style.fontSize = '12px';
            swipeHint.style.color = 'rgba(255, 255, 255, 0.8)';
            swipeHint.style.zIndex = '5';
            swipeHint.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
            galleryRow.appendChild(swipeHint);
            
            // Hide hint after 3 seconds
            setTimeout(() => {
                swipeHint.style.opacity = '0';
                swipeHint.style.transition = 'opacity 0.5s ease';
            }, 3000);
        }
    }
    
    // Listen for window resize events
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth < 576;
        
        if (isMobile) {
            document.body.classList.add('is-mobile');
        } else {
            document.body.classList.remove('is-mobile');
        }
    });
}