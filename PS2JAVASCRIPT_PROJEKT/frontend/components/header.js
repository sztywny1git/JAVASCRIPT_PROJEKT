// header.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-item');

    // Podœwietlanie aktywnej sekcji
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Usuwanie aktywnej klasy ze wszystkich linków
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Dodawanie aktywnej klasy do klikniêtego linku
            e.target.classList.add('active');
        });
    });
});
