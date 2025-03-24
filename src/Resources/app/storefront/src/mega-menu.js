/**
 * Enhanced mega menu functionality with animated underlines and focus effect overlay
 */
document.addEventListener('DOMContentLoaded', function() {
    // Mega menu selectors
    const megaMenuItems = document.querySelectorAll('.nav-main-item-with-children');
    const megaMenuOverlay = document.querySelector('.mega-menu-overlay') || createMegaMenuOverlay();
    const navMain = document.querySelector('.nav-main');
    
    // Create the underline elements for each menu item
    megaMenuItems.forEach(item => {
        // Create and append the animated underline element
        const underline = document.createElement('span');
        underline.classList.add('menu-underline');
        item.querySelector('.nav-main-link').appendChild(underline);
        
        const megaMenu = item.querySelector('.mega-menu');
        const link = item.querySelector('.nav-main-link');
        
        // Mouse enter event - show mega menu and animate underline
        item.addEventListener('mouseenter', function() {
            closeAllMegaMenus();
            
            // Short delay for smoother appearance
            setTimeout(() => {
                if (megaMenu) {
                    // Show mega menu
                    megaMenu.style.visibility = 'visible';
                    megaMenu.style.opacity = '1';
                    megaMenu.style.transform = 'translateY(0)';
                    megaMenu.style.pointerEvents = 'auto';
                    
                    // Show underline
                    item.classList.add('nav-item-active');
                    
                    // Show overlay
                    megaMenuOverlay.classList.add('show');
                    document.body.classList.add('mega-menu-open');
                }
            }, 50);
        });
        
        // Mouse leave event - hide mega menu and underline
        item.addEventListener('mouseleave', function() {
            closeAllMegaMenus();
        });
        
        // Click event for mobile/touch devices
        if (link) {
            link.addEventListener('click', function(e) {
                // Only prevent default on larger screens where we're using hover effects
                if (window.innerWidth >= 992 && link.classList.contains('has-children')) {
                    e.preventDefault();
                    
                    if (megaMenu && megaMenu.style.visibility !== 'visible') {
                        closeAllMegaMenus();
                        megaMenu.style.visibility = 'visible';
                        megaMenu.style.opacity = '1';
                        megaMenu.style.transform = 'translateY(0)';
                        megaMenu.style.pointerEvents = 'auto';
                        item.classList.add('nav-item-active');
                        megaMenuOverlay.classList.add('show');
                        document.body.classList.add('mega-menu-open');
                    } else {
                        closeAllMegaMenus();
                    }
                }
            });
        }
    });
    
    // Function to close all mega menus
    function closeAllMegaMenus() {
        document.querySelectorAll('.mega-menu').forEach(menu => {
            menu.style.transform = 'translateY(10px)';
            menu.style.visibility = 'hidden';
            menu.style.opacity = '0';
            menu.style.pointerEvents = 'none';
        });
        
        // Remove active states from all menu items
        document.querySelectorAll('.nav-main-item-with-children').forEach(item => {
            item.classList.remove('nav-item-active');
        });
        
        // Hide overlay
        megaMenuOverlay.classList.remove('show');
        document.body.classList.remove('mega-menu-open');
    }
    
    // Function to create overlay if it doesn't exist
    function createMegaMenuOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'mega-menu-overlay';
        document.body.appendChild(overlay);
        
        // Close menus when clicking on overlay
        overlay.addEventListener('click', closeAllMegaMenus);
        
        return overlay;
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllMegaMenus();
        }
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        const isInMegaMenu = e.target.closest('.mega-menu') || 
                             e.target.closest('.nav-main-item-with-children');
        
        if (!isInMegaMenu) {
            closeAllMegaMenus();
        }
    });
    
    // Adjust menu status on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 992) {
            closeAllMegaMenus();
        }
    });
});