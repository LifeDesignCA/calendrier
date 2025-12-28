// scripts/app.js

// --- Configuration des Noms (en Français) ---
const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const calendarContainer = document.getElementById('calendar-container');
const monthDisplay = document.getElementById('current-month-display');
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth(); // 0 pour Janvier, 11 pour Décembre

document.addEventListener('DOMContentLoaded', () => {
    // Afficher l'année courante dans le footer
    document.getElementById('current-year').textContent = currentYear;
    
    // Initialiser le premier affichage
    generateCalendar(currentYear, currentMonth);

    // Gestion de la navigation
    document.getElementById('prev-month').addEventListener('click', () => {
        changeMonth(-1);
    });
    document.getElementById('next-month').addEventListener('click', () => {
        changeMonth(1);
    });

    // Logique de bascule du thème (Dark Mode)
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Optionnel: Stocker la préférence utilisateur
        // localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
});

/**
 * Change le mois et régénère le calendrier.
 * @param {number} delta - +1 pour le mois suivant, -1 pour le mois précédent.
 */
function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
}

/**
 * Génère le contenu HTML de la grille du calendrier.
 */
function generateCalendar(year, month) {
    monthDisplay.textContent = `${monthNames[month]} ${year}`;
    
    // 1. Déterminer les jours limites
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // 2. Déterminer le décalage (où commence le 1er jour)
    // getDay(): 0=Dim, 1=Lun... Nous voulons Lun(1) avoir un index de 0.
    let startDayIndex = firstDayOfMonth.getDay();
    // Si Dimanche (0), l'index de décalage est 6. Sinon, c'est jour - 1.
    startDayIndex = startDayIndex === 0 ? 6 : startDayIndex - 1; 

    let htmlContent = '';

    // 3. Ajout des jours vides (décalage)
    for (let i = 0; i < startDayIndex; i++) {
        htmlContent += '<div class="day-cell empty-day"></div>';
    }

    // 4. Ajout des jours réels du mois
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        
        // Classes conditionnelles
        const isToday = (currentDate.toDateString() === today.toDateString()) ? ' is-today' : '';
        const dayOfWeek = currentDate.getDay(); // 0 (Dim) à 6 (Sam)
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6) ? ' is-weekend' : ''; 

        htmlContent += `<div class="day-cell${isToday}${isWeekend}">
                            <span class="day-number">${day}</span>
                            </div>`;
    }

    calendarContainer.innerHTML = htmlContent;
}