/**
 * Fixed dropdown functionality for account menu
 */
document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const accountBtn = document.getElementById('accountWidget');
    const accountDropdown = document.querySelector('.account-menu-dropdown');
    const accountMenu = accountBtn ? accountBtn.closest('.account-menu') : null;
    
    if (accountBtn && accountDropdown) {
        // Manually handle dropdown functionality
        accountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle aria-expanded attribute
            const isExpanded = accountBtn.getAttribute('aria-expanded') === 'true';
            accountBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle show classes
            accountDropdown.classList.toggle('show');
            accountMenu.classList.toggle('show');
            
            // Close mega menu if open when account menu is toggled
            closeMegaMenusIfOpen();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
                accountDropdown.classList.remove('show');
                accountBtn.setAttribute('aria-expanded', 'false');
                accountMenu.classList.remove('show');
            }
        });
        
        // Force correct positioning styles
        accountDropdown.style.position = 'absolute';
        accountDropdown.style.zIndex = '2100';
        accountDropdown.style.top = '100%';
        accountDropdown.style.right = '0';
        accountDropdown.style.left = 'auto';
    }
    
    // Function to close mega menus when account menu is opened
    function closeMegaMenusIfOpen() {
        const activeMegaMenus = document.querySelectorAll('.nav-main-item-with-children.nav-item-active');
        if (activeMegaMenus.length > 0) {
            activeMegaMenus.forEach(item => {
                item.classList.remove('nav-item-active');
                const megaMenu = item.querySelector('.mega-menu');
                if (megaMenu) {
                    megaMenu.style.opacity = '0';
                    megaMenu.style.visibility = 'hidden';
                    megaMenu.style.transform = 'translateY(10px)';
                }
            });
            
            // Hide overlay
            const overlay = document.querySelector('.mega-menu-overlay');
            if (overlay) {
                overlay.classList.remove('show');
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            }
            
            // Remove body class
            document.body.classList.remove('mega-menu-open');
        }
    }
});