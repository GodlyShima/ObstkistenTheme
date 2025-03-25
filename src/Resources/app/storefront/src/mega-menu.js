/**
 * Mega menu functionality preserving the original behavior
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create overlay for darken effect if it doesn't exist
    let overlay = document.querySelector('.mega-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mega-menu-overlay';
        document.body.appendChild(overlay);
    }
    
    // Make sure all mega menus have the correct z-index
    document.querySelectorAll('.mega-menu').forEach(megaMenu => {
        megaMenu.style.zIndex = "1035";
    });
    
    // Cache DOM elements
    const megaMenuItems = document.querySelectorAll('.nav-main-item-with-children.has-mega-menu');
    const accountBtn = document.getElementById('accountWidget');
    const accountDropdown = document.querySelector('.account-menu-dropdown');
    const accountMenu = accountBtn ? accountBtn.closest('.account-menu') : null;
    
    // Timeout variables
    let openTimeout = null;
    let closeTimeout = null;
    let activeItem = null;
    
    // Function to open a mega menu
    function openMegaMenu(item) {
        // Close account menu if open
        if (accountMenu && accountMenu.classList.contains('show')) {
            accountMenu.classList.remove('show');
            accountDropdown && accountDropdown.classList.remove('show');
            accountBtn && accountBtn.setAttribute('aria-expanded', 'false');
        }
        
        // Clear any pending timers
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }
        if (openTimeout) {
            clearTimeout(openTimeout);
        }
        
        // Close other open menus first
        if (activeItem && activeItem !== item) {
            closeMegaMenu(activeItem, true);
        }
        
        const megaMenu = item.querySelector('.mega-menu');
        if (megaMenu) {
            // Add active class
            item.classList.add('nav-item-active');
            
            // Show overlay
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            overlay.style.pointerEvents = 'auto';
            overlay.classList.add('show');
            
            // Show the mega menu
            megaMenu.style.visibility = 'visible';
            megaMenu.style.opacity = '1';
            // Important: Use the original transform with translateX(-50%)
            megaMenu.style.transform = 'translateX(-50%) translateY(0)';
            
            // Set active item reference
            activeItem = item;
            
            // Add body class to prevent scrolling
            document.body.classList.add('mega-menu-open');
        }
    }
    
    // Function to close a mega menu
    function closeMegaMenu(item, immediate = false) {
        // Clear pending timers
        if (openTimeout) {
            clearTimeout(openTimeout);
            openTimeout = null;
        }
        if (closeTimeout) {
            clearTimeout(closeTimeout);
        }
        
        // Close function
        const close = () => {
            const megaMenu = item.querySelector('.mega-menu');
            if (megaMenu) {
                megaMenu.style.opacity = '0';
                megaMenu.style.visibility = 'hidden';
                // Important: Maintain the original transform with translateX(-50%)
                megaMenu.style.transform = 'translateX(-50%) translateY(10px)';
            }
            
            item.classList.remove('nav-item-active');
            
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
        
        if (immediate) {
            close();
        } else {
            closeTimeout = setTimeout(close, 300);
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
        // Add menu underline element if not present
        if (!item.querySelector('.menu-underline')) {
            const underline = document.createElement('span');
            underline.className = 'menu-underline';
            item.querySelector('.nav-main-link').appendChild(underline);
        }
        
        // Mouse enter - open menu
        item.addEventListener('mouseenter', () => {
            openMegaMenu(item);
        });
        
        // Mouse leave - close menu
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
    
    // Handle account dropdown menu
    if (accountBtn && accountDropdown) {
        // Fix for account dropdown styles
        accountDropdown.style.position = 'absolute';
        accountDropdown.style.zIndex = '2000';
        accountDropdown.style.top = '100%';
        accountDropdown.style.right = '0';
        accountDropdown.style.left = 'auto';
        
        // Handle click event
        accountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close mega menus if open
            closeAllMegaMenus(true);
            
            // Toggle aria-expanded
            const isExpanded = accountBtn.getAttribute('aria-expanded') === 'true';
            accountBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle show class
            accountDropdown.classList.toggle('show');
            accountMenu.classList.toggle('show');
        });
    }
    
    // Handle clicks outside
    document.addEventListener('click', (e) => {
        // Close mega menus when clicking outside
        if (!e.target.closest('.nav-main-item-with-children') && 
            !e.target.closest('.mega-menu')) {
            closeAllMegaMenus(true);
        }
        
        // Close account dropdown when clicking outside
        if (accountBtn && accountDropdown && 
            !accountBtn.contains(e.target) && 
            !accountDropdown.contains(e.target)) {
            accountDropdown.classList.remove('show');
            accountBtn.setAttribute('aria-expanded', 'false');
            accountMenu && accountMenu.classList.remove('show');
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
            
            // Also close account dropdown
            if (accountDropdown && accountDropdown.classList.contains('show')) {
                accountDropdown.classList.remove('show');
                accountBtn && accountBtn.setAttribute('aria-expanded', 'false');
                accountMenu && accountMenu.classList.remove('show');
            }
        }
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 992) {
            closeAllMegaMenus(true);
        }
    });
});