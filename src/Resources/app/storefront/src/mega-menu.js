/**
 * Enhanced mega menu functionality with proper z-index handling
 */
document.addEventListener('DOMContentLoaded', function() {
    // Calculate and store header and navbar heights for overlay positioning
    const header = document.querySelector('.header-main');
    const navbar = document.querySelector('.nav-main');
    
    if (header && navbar) {
        const headerHeight = header.offsetHeight;
        const navbarHeight = navbar.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
    }
    
    // Cache DOM elements
    const megaMenuItems = document.querySelectorAll('.nav-main-item-with-children');
    const body = document.body;
    
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
            z-index: 1040;
            transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
            pointer-events: none;
        `;
        body.appendChild(overlay);
    }
    
    // Fix z-index of mega menus
    document.querySelectorAll('.mega-menu').forEach(menu => {
        menu.style.zIndex = '1045';
    });
    
    // Add underlines to each menu item with children
    megaMenuItems.forEach(item => {
        const link = item.querySelector('.nav-main-link');
        const megaMenu = item.querySelector('.mega-menu');
        
        // Only add underline and mega menu functionality if this item has children
        if (link && megaMenu && !link.querySelector('.menu-underline')) {
            // Add the underline element
            const underline = document.createElement('span');
            underline.className = 'menu-underline';
            link.appendChild(underline);
            
            // Apply the has-mega-menu class to links that have a mega menu
            if (megaMenu.querySelectorAll('.mega-menu-column').length > 0) {
                link.classList.add('has-mega-menu');
                item.classList.add('has-mega-menu');
            } else {
                // For items without actual content, remove the mega menu
                megaMenu.parentNode.removeChild(megaMenu);
            }
        } else if (link && !megaMenu) {
            // Remove the has-children class if there's no mega menu
            link.classList.remove('has-children');
        }
    });
    
    // Setup animations for mega menu contents
    const megaMenus = document.querySelectorAll('.mega-menu');
    megaMenus.forEach(menu => {
        // Add animation classes to menu columns
        const columns = menu.querySelectorAll('.mega-menu-column');
        columns.forEach((column, index) => {
            column.style.animationDelay = `${0.05 * index}s`;
            column.classList.add('mega-menu-column-animated');
        });
    });
    
    // Delay constants
    const HOVER_DELAY = 50; // faster delay before showing menu for better responsiveness
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
                // Make sure mega menu has proper z-index
                megaMenu.style.zIndex = '1045';
                
                // First, reset all animations
                const columns = megaMenu.querySelectorAll('.mega-menu-column');
                columns.forEach(column => {
                    column.style.opacity = '0';
                    column.style.transform = 'translateY(15px)';
                });
                
                // Instead of fixing the body, just prevent scrolling
                document.body.classList.add('mega-menu-open');
                
                // Show the menu container
                megaMenu.style.visibility = 'visible';
                megaMenu.style.opacity = '1';
                megaMenu.style.transform = 'translateY(0)';
                
                // Then animate columns with a small delay between each
                setTimeout(() => {
                    columns.forEach((column, index) => {
                        setTimeout(() => {
                            column.style.opacity = '1';
                            column.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }, 50);
                
                // Activate the item
                item.classList.add('nav-item-active');
                
                // Show the overlay with fade-in
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                overlay.style.pointerEvents = 'auto';
                overlay.classList.add('show');
                
                // Set this as the active item
                activeItem = item;
                
                // Close account dropdown when mega menu opens
                closeAccountDropdown();
                
                // Dispatch custom event that mega menu was opened
                const megaMenuOpenedEvent = new CustomEvent('megaMenuOpened', {
                    detail: { menuItem: item }
                });
                document.dispatchEvent(megaMenuOpenedEvent);
            }
        }, HOVER_DELAY);
    }
    
    // Helper function to close account dropdown
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
                // Smooth close transition
                megaMenu.style.opacity = '0';
                megaMenu.style.transform = 'translateY(8px)';
                
                // Delay hiding for animation completion
                setTimeout(() => {
                    megaMenu.style.visibility = 'hidden';
                }, 300);
            }
            
            item.classList.remove('nav-item-active');
            
            // If this was the active item, clear the reference
            if (activeItem === item) {
                activeItem = null;
                
                // Only remove overlay and body class if we're closing the active item
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                overlay.style.pointerEvents = 'none';
                overlay.classList.remove('show');
                
                setTimeout(() => {
                    if (!overlay.classList.contains('show')) {
                        // Just remove the class and let normal scrolling resume
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
            closeMegaMenu(item, immediate);
        });
    }
    
    // Add event listeners to each menu item with mega menu
    document.querySelectorAll('.nav-main-item-with-children.has-mega-menu').forEach(item => {
        // Mouse enter - open the menu with a slight delay for intentional hovering
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
                if (window.innerWidth >= 992 && link.classList.contains('has-mega-menu')) {
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