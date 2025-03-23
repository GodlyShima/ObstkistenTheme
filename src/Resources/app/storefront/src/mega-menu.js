/**
 * Standalone mega menu functionality
 * This can be used when ModernHeader plugin is not active
 */
document.addEventListener('DOMContentLoaded', function() {
    // Mega menu functionality
    const megaMenuItems = document.querySelectorAll('.nav-main-item-with-children');
    const megaMenuOverlay = document.querySelector('.mega-menu-overlay');
    
    // Function to close all mega menus
    function closeAllMegaMenus() {
        document.querySelectorAll('.mega-menu').forEach(menu => {
            menu.style.visibility = 'hidden';
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(-20px)';
            menu.style.pointerEvents = 'none';
        });
        
        if (megaMenuOverlay) {
            megaMenuOverlay.classList.remove('show');
        }
    }
    
    // Event listeners for menu items with submenus
    megaMenuItems.forEach(item => {
        const link = item.querySelector('.nav-main-link');
        const megaMenu = item.querySelector('.mega-menu');
        
        // Desktop: Hover and click effects
        if (window.innerWidth >= 992) {
            // Show on hover
            item.addEventListener('mouseenter', function() {
                closeAllMegaMenus();
                
                // Short delay for smoother appearance
                setTimeout(() => {
                    if (megaMenu) {
                        megaMenu.style.visibility = 'visible';
                        megaMenu.style.opacity = '1';
                        megaMenu.style.transform = 'translateY(0)';
                        megaMenu.style.pointerEvents = 'auto';
                        
                        if (megaMenuOverlay) {
                            megaMenuOverlay.classList.add('show');
                        }
                    }
                }, 50);
            });
            
            // Intercept link click
            if (link) {
                link.addEventListener('click', function(e) {
                    // On desktop, prevent default behavior for dropdown triggers
                    if (link.classList.contains('has-children') && window.innerWidth >= 992) {
                        e.preventDefault();
                        if (megaMenu && megaMenu.style.visibility !== 'visible') {
                            closeAllMegaMenus();
                            megaMenu.style.visibility = 'visible';
                            megaMenu.style.opacity = '1';
                            megaMenu.style.transform = 'translateY(0)';
                            megaMenu.style.pointerEvents = 'auto';
                            
                            if (megaMenuOverlay) {
                                megaMenuOverlay.classList.add('show');
                            }
                        } else {
                            closeAllMegaMenus();
                        }
                    }
                });
            }
        } else {
            // Mobile: Click effect
            if (link && link.classList.contains('has-children')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (megaMenu) {
                        if (megaMenu.style.visibility !== 'visible') {
                            closeAllMegaMenus();
                            megaMenu.style.visibility = 'visible';
                            megaMenu.style.opacity = '1';
                            megaMenu.style.transform = 'translateY(0)';
                            megaMenu.style.pointerEvents = 'auto';
                        } else {
                            closeAllMegaMenus();
                        }
                    }
                });
            }
        }
        
        // Close menu when mouse leaves the menu item
        item.addEventListener('mouseleave', function() {
            closeAllMegaMenus();
        });
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        // Check if click is inside a mega menu or on a menu item
        const isInMegaMenu = e.target.closest('.mega-menu') || e.target.closest('.nav-main-item-with-children');
        
        if (!isInMegaMenu) {
            closeAllMegaMenus();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllMegaMenus();
        }
    });
    
    // Close by clicking on the overlay
    if (megaMenuOverlay) {
        megaMenuOverlay.addEventListener('click', closeAllMegaMenus);
    }
    
    // Adjust menu status on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 992) {
            closeAllMegaMenus();
        }
    });
});