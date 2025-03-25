/**
 * Script to ensure Bootstrap dropdowns work correctly
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fix the account dropdown menu
    const accountButton = document.getElementById('accountWidget');
    const accountMenu = document.querySelector('.account-menu-dropdown');
    
    if (accountButton && accountMenu) {
        // Manually handle dropdown functionality
        accountButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle aria-expanded attribute
            const isExpanded = accountButton.getAttribute('aria-expanded') === 'true';
            accountButton.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the show class on dropdown menu
            accountMenu.classList.toggle('show');
            
            // Add show class to the account menu container
            accountButton.closest('.account-menu').classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!accountButton.contains(e.target) && !accountMenu.contains(e.target)) {
                accountMenu.classList.remove('show');
                accountButton.setAttribute('aria-expanded', 'false');
                accountButton.closest('.account-menu').classList.remove('show');
            }
        });
    }
    
    // Add specific styling to ensure the dropdown displays correctly
    if (accountMenu) {
        // Adjust styles directly
        accountMenu.style.position = 'absolute';
        accountMenu.style.zIndex = '1500';
        accountMenu.style.top = '100%';
        accountMenu.style.right = '0';
        accountMenu.style.left = 'auto';
    }
});