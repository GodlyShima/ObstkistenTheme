/**
 * Fixed mega menu functionality with simplified hover handling
 */
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const megaMenuItems = document.querySelectorAll('.nav-main-item-with-children');
    const body = document.body;
    
    // Create overlay for darken effect if it doesn't exist
    let overlay = document.querySelector('.mega-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mega-menu-overlay';
        body.appendChild(overlay);
    }
    
    // Add underlines to each menu item
    megaMenuItems.forEach(item => {
        const link = item.querySelector('.nav-main-link');
        if (link && !link.querySelector('.menu-underline')) {
            const underline = document.createElement('span');
            underline.className = 'menu-underline';
            link.appendChild(underline);
        }
    });
    
    // Delay constants
    const HOVER_DELAY = 100; // ms delay before showing menu
    const CLOSE_DELAY = 300; // ms delay before hiding menu
    
    // Timeout variables
    let openTimeout = null;
    let closeTimeout = null;
    let activeItem = null;
    
    // Function to open a mega menu
    function openMegaMenu(item) {
        // Clear any pending close timer
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }
        
        // If there's a pending open timer, clear it
        if (openTimeout) {
            clearTimeout(openTimeout);
        }
        
        // Set a new open timer
        openTimeout = setTimeout(() => {
            // If there's an active item that isn't this one, close it first
            if (activeItem && activeItem !== item) {
                closeMegaMenu(activeItem, true); // immediate close
            }
            
            const megaMenu = item.querySelector('.mega-menu');
            if (megaMenu) {
                // Show the menu
                megaMenu.style.visibility = 'visible';
                megaMenu.style.opacity = '1';
                megaMenu.style.transform = 'translateY(0)';
                
                // Activate the item
                item.classList.add('nav-item-active');
                
                // Show the overlay
                overlay.classList.add('show');
                body.classList.add('mega-menu-open');
                
                // Set this as the active item
                activeItem = item;
            }
        }, HOVER_DELAY);
    }
    
    // Function to close a mega menu
    function closeMegaMenu(item, immediate = false) {
        // Clear any pending open timer
        if (openTimeout) {
            clearTimeout(openTimeout);
            openTimeout = null;
        }
        
        // If there's a pending close timer, clear it
        if (closeTimeout) {
            clearTimeout(closeTimeout);
        }
        
        // Close function
        const close = () => {
            const megaMenu = item.querySelector('.mega-menu');
            if (megaMenu) {
                megaMenu.style.visibility = 'hidden';
                megaMenu.style.opacity = '0';
                megaMenu.style.transform = 'translateY(10px)';
            }
            
            item.classList.remove('nav-item-active');
            
            // If this was the active item, clear the reference
            if (activeItem === item) {
                activeItem = null;
                
                // Only remove overlay and body class if we're closing the active item
                overlay.classList.remove('show');
                body.classList.remove('mega-menu-open');
            }
        };
        
        // If immediate, close now; otherwise set a timer
        if (immediate) {
            close();
        } else {
            closeTimeout = setTimeout(close, CLOSE_DELAY);
        }
    }
    
    // Close all mega menus
    function closeAllMegaMenus(immediate = false) {
        megaMenuItems.forEach(item => {
            closeMegaMenu(item, immediate);
        });
    }
    
    // Add event listeners to each menu item
    megaMenuItems.forEach(item => {
        // Mouse enter - open the menu
        item.addEventListener('mouseenter', () => {
            openMegaMenu(item);
        });
        
        // Mouse leave - start the close timer
        item.addEventListener('mouseleave', () => {
            closeMegaMenu(item);
        });
        
        // Click on menu item link
        const link = item.querySelector('.nav-main-link');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth >= 992 && link.classList.contains('has-children')) {
                    e.preventDefault();
                    
                    if (item.classList.contains('nav-item-active')) {
                        closeMegaMenu(item, true);
                    } else {
                        openMegaMenu(item);
                    }
                }
            });
        }
    });
    
    // Handle clicks outside the menu
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-main-item-with-children') && !e.target.closest('.mega-menu')) {
            closeAllMegaMenus(true);
        }
    });
    
    // Close with overlay click
    overlay.addEventListener('click', () => {
        closeAllMegaMenus(true);
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllMegaMenus(true);
        }
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 992) {
            closeAllMegaMenus(true);
        }
    });
});