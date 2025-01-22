// header.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-item');

    // Pod�wietlanie aktywnej sekcji
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Usuwanie aktywnej klasy ze wszystkich link�w
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Dodawanie aktywnej klasy do klikni�tego linku
            e.target.classList.add('active');
        });
    });
});
