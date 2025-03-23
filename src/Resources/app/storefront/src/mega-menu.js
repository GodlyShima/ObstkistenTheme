document.addEventListener('DOMContentLoaded', function() {
    // Mega-Menü Funktionalität
    const megaMenuItems = document.querySelectorAll('.nav-main-item-with-children');
    const megaMenuOverlay = document.querySelector('.mega-menu-overlay');
    
    // Funktion zum Schließen aller Mega-Menüs
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
    
    // Event-Listener für jedes Menü-Element mit Untermenü
    megaMenuItems.forEach(item => {
        const link = item.querySelector('.nav-main-link');
        const megaMenu = item.querySelector('.mega-menu');
        
        // Desktop: Hover-Effekt und Klick-Effekt
        if (window.innerWidth >= 992) {
            // Anzeigen bei Hover
            item.addEventListener('mouseenter', function() {
                closeAllMegaMenus();
                
                // Kurze Verzögerung, damit das Menü nicht sofort erscheint
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
            
            // Link-Klick abfangen
            if (link) {
                link.addEventListener('click', function(e) {
                    // Auf Desktop das Standard-Verhalten verhindern, falls es sich um einen Dropdown-Trigger handelt
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
            // Mobile: Klick-Effekt
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
        
        // Menü schließen, wenn die Maus das Menü-Element verlässt
        item.addEventListener('mouseleave', function() {
            closeAllMegaMenus();
        });
    });
    
    // Schließen beim Klicken außerhalb
    document.addEventListener('click', function(e) {
        // Prüfen, ob der Klick innerhalb eines Mega-Menüs oder auf einem Menüpunkt war
        const isInMegaMenu = e.target.closest('.mega-menu') || e.target.closest('.nav-main-item-with-children');
        
        if (!isInMegaMenu) {
            closeAllMegaMenus();
        }
    });
    
    // Schließen mit der Escape-Taste
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllMegaMenus();
        }
    });
    
    // Schließen durch Klick auf den Overlay
    if (megaMenuOverlay) {
        megaMenuOverlay.addEventListener('click', closeAllMegaMenus);
    }
    
    // Menü-Status bei Fenstergröße anpassen
    window.addEventListener('resize', function() {
        if (window.innerWidth < 992) {
            closeAllMegaMenus();
        }
    });
});