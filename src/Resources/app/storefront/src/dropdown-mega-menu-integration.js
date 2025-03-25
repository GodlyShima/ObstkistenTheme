/**
 * Close account dropdown when mega menu opens
 */
document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const accountBtn = document.getElementById('accountWidget');
    const accountDropdown = document.querySelector('.account-menu-dropdown');
    const accountMenu = accountBtn ? accountBtn.closest('.account-menu') : null;
    const megaMenuItems = document.querySelectorAll('.nav-main-item-with-children.has-mega-menu');
    
    if (!accountBtn || !accountDropdown || !accountMenu || !megaMenuItems.length) return;
    
    // Function to close account dropdown
    function closeAccountDropdown() {
        accountDropdown.style.display = 'none';
        accountBtn.setAttribute('aria-expanded', 'false');
        accountMenu.classList.remove('show');
        accountDropdown.classList.remove('show');
    }
    
    // Add event listeners to mega menu items
    megaMenuItems.forEach(menuItem => {
        // When mouse enters a mega menu item, close the account dropdown
        menuItem.addEventListener('mouseenter', function() {
            // Check if account dropdown is open
            if (accountDropdown.style.display === 'block' || 
                accountDropdown.classList.contains('show') || 
                accountMenu.classList.contains('show')) {
                closeAccountDropdown();
            }
        });
        
        // Also handle click events for mobile devices
        const menuLink = menuItem.querySelector('.nav-main-link');
        if (menuLink) {
            menuLink.addEventListener('click', function() {
                closeAccountDropdown();
            });
        }
    });
    
    // Close account dropdown when mega menu overlay is clicked
    const megaMenuOverlay = document.querySelector('.mega-menu-overlay');
    if (megaMenuOverlay) {
        megaMenuOverlay.addEventListener('click', function() {
            closeAccountDropdown();
        });
    }
    
    // Also listen for custom mega menu open events
    document.addEventListener('megaMenuOpened', function() {
        closeAccountDropdown();
    });
});