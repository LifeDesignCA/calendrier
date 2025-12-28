// scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialisation des éléments de navigation
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');
    const orderButton = document.getElementById('order-btn');

    // 2. Création et gestion du bouton de menu mobile (Burger Icon)
    
    // On crée l'élément bouton
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '&#9776;'; // Symbole du hamburger (Unicode)
    menuToggle.setAttribute('aria-label', 'Toggle navigation');

    // On insère le bouton dans l'en-tête, avant la navigation
    header.insertBefore(menuToggle, nav);

    // Événement de bascule au clic sur le bouton menu
    menuToggle.addEventListener('click', () => {
        // Ajoute ou retire la classe 'active' sur la balise <nav> pour afficher/masquer
        nav.classList.toggle('active');

        // Change l'icône du bouton
        if (nav.classList.contains('active')) {
            menuToggle.innerHTML = '&#10005;'; // Symbole X pour fermer
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            menuToggle.innerHTML = '&#9776;'; // Symbole Hamburger
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // 3. Interactivité simple sur le bouton "Commander"
    if (orderButton) {
        orderButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            // C'est ici que vous intégrerez la redirection vers votre page de commande
            alert("Merci ! Vous serez bientôt redirigé vers la page de commande.");
        });
    }

    // 4. (Optionnel) Ajout d'une ombre au header au scroll pour un look professionnel
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
    });
});
