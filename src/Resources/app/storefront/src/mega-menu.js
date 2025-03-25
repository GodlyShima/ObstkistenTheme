/**
 * Fixed mega menu functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create overlay for darken effect if it doesn't exist
    let overlay = document.querySelector('.mega-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mega-menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            visibility: hidden;
            z-index: 1030;
            transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);
    }
    
    // Cache DOM elements
    const megaMenuItems = document.querySelectorAll('.nav-main-item-with-children');
    
    // Delay constants
    const HOVER_DELAY = 100;
    const CLOSE_DELAY = 300;
    
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
                closeMegaMenu(activeItem, true);
            }
            
            const megaMenu = item.querySelector('.mega-menu');
            if (megaMenu) {
                // Add active class to item
                item.classList.add('nav-item-active');
                
                // Show overlay
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                overlay.style.pointerEvents = 'auto';
                overlay.classList.add('show');
                
                // Show the menu with proper styles
                megaMenu.style.visibility = 'visible';
                megaMenu.style.opacity = '1';
                megaMenu.style.transform = 'translateY(0)';
                
                // Set this as the active item
                activeItem = item;
                
                // Add body class to prevent scrolling
                document.body.classList.add('mega-menu-open');
                
                // Ensure content is visible
                const columns = megaMenu.querySelectorAll('.mega-menu-column');
                columns.forEach(column => {
                    column.style.opacity = '1';
                    column.style.visibility = 'visible';
                    column.style.transform = 'translateY(0)';
                });
                
                // Dispatch custom event
                const event = new CustomEvent('megaMenuOpened', { 
                    detail: { menuItem: item } 
                });
                document.dispatchEvent(event);
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
                megaMenu.style.opacity = '0';
                megaMenu.style.visibility = 'hidden';
                megaMenu.style.transform = 'translateY(10px)';
            }
            
            item.classList.remove('nav-item-active');
            
            // If this was the active item, clear the reference
            if (activeItem === item) {
                activeItem = null;
                
                // Hide overlay
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                overlay.style.pointerEvents = 'none';
                overlay.classList.remove('show');
                
                // Remove body class after animation
                setTimeout(() => {
                    if (!overlay.classList.contains('show')) {
                        document.body.classList.remove('mega-menu-open');
                    }
                }, 300);
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
            if (item.classList.contains('nav-item-active')) {
                closeMegaMenu(item, immediate);
            }
        });
    }
    
    // Add event listeners to mega menu items
    megaMenuItems.forEach(item => {
        // Only handle items with actual mega menus
        const megaMenu = item.querySelector('.mega-menu');
        if (!megaMenu) return;
        
        // Set initial styles
        megaMenu.style.zIndex = '1035';
        
        // Mouse enter - open the menu with a slight delay
        item.addEventListener('mouseenter', () => {
            openMegaMenu(item);
        });
        
        // Mouse leave - start the close timer
        item.addEventListener('mouseleave', () => {
            closeMegaMenu(item);
        });
        
        // Click on mega menu link
        const link = item.querySelector('.nav-main-link');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth >= 992) {
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
        if (!e.target.closest('.nav-main-item-with-children') && 
            !e.target.closest('.mega-menu')) {
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
    
    // Close mega menu when account dropdown opens
    const accountBtn = document.getElementById('accountWidget');
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            closeAllMegaMenus(true);
        });
    }
    
    // Handle dropdown menu integration
    function closeAccountDropdown() {
        const accountBtn = document.getElementById('accountWidget');
        const accountDropdown = document.querySelector('.account-menu-dropdown');
        const accountMenu = accountBtn ? accountBtn.closest('.account-menu') : null;
        
        if (accountBtn && accountDropdown && accountMenu) {
            accountDropdown.style.display = 'none';
            accountBtn.setAttribute('aria-expanded', 'false');
            accountMenu.classList.remove('show');
            accountDropdown.classList.remove('show');
        }
    }
    
    // Close account dropdown when mega menu opens
    document.addEventListener('megaMenuOpened', function() {
        closeAccountDropdown();
    });
});