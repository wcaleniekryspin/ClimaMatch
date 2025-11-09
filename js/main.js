// Obsługa panelu logowania i menu
document.addEventListener('DOMContentLoaded', function() {
    const loginToggle = document.querySelector('.login-toggle');
    const loginPanel = document.querySelector('.login-panel');
    const menuToggle = document.querySelector('.bar');
    const menu = document.querySelector('.menu');
    const footerYear = document.querySelector('.footer-year');
    const easyLevel = document.getElementById('easy');
    const normalLevel = document.getElementById('normal');
    const trudnyLevel = document.getElementById('trudny');
    const levelSpan = document.querySelector('.level');

   


    // Obsługa poziomów trudności - tylko jeśli elementy istnieją
    if (easyLevel && levelSpan) {
        easyLevel.addEventListener('click', function() {
            levelSpan.textContent = 'Łatwy';
            if (menu) menu.classList.remove('active');
        });
    }

    if (normalLevel && levelSpan) {
        normalLevel.addEventListener('click', function() {
            levelSpan.textContent = 'Normalny';
            if (menu) menu.classList.remove('active');
        });
    }

    if (trudnyLevel && levelSpan) {
        trudnyLevel.addEventListener('click', function() {
            levelSpan.textContent = 'Trudny';
            if (menu) menu.classList.remove('active');
        });
    }

    // Funkcja do zamykania panelu logowania
    function closeLoginPanel() {
        if (loginPanel) {
            loginPanel.classList.remove('active');
        }
        document.removeEventListener('click', handleLoginClickOutside);
    }
    
    // Funkcja do zamykania menu
    function closeMenu() {
        if (menu) {
            menu.classList.remove('active');
        }
        document.removeEventListener('click', handleMenuClickOutside);
    }
    
    // Funkcja sprawdzająca czy kliknięto poza panelem logowania
    function handleLoginClickOutside(event) {
        if (loginPanel && !loginPanel.contains(event.target) && loginToggle && !loginToggle.contains(event.target)) {
            closeLoginPanel();
        }
    }
    
    // Funkcja sprawdzająca czy kliknięto poza menu
    function handleMenuClickOutside(event) {
        if (menu && !menu.contains(event.target) && menuToggle && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    }
    
    // Obsługa panelu logowania
    if (loginToggle && loginPanel) {
        loginToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            const isActive = loginPanel.classList.toggle('active');
            
            // Zamknij menu jeśli jest otwarte
            closeMenu();
            
            if (isActive) {
                setTimeout(() => {
                    document.addEventListener('click', handleLoginClickOutside);
                }, 10);
            } else {
                closeLoginPanel();
            }
        });
        
        loginPanel.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
    
    // Obsługa menu - tylko jeśli elementy istnieją
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            const isActive = menu.classList.toggle('active');
            
            // Zamknij panel logowania jeśli jest otwarty
            closeLoginPanel();
            
            if (isActive) {
                setTimeout(() => {
                    document.addEventListener('click', handleMenuClickOutside);
                }, 10);
            } else {
                closeMenu();
            }
        });
        
        menu.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

   /* window.addEventListener("load", () => {
        if (performance.getEntriesByType("navigation")[0].type === "reload") {
            window.location.replace("index.html"); 
        }
    });*/

    const handleCurrentYear = () => {
        const year = (new Date).getFullYear();
        if (footerYear) {
            footerYear.innerText = year;
        }
    }
     
    handleCurrentYear();
});