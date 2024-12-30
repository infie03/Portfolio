function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');

    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
    } else {
        navLinks.classList.add('active');
        menuIcon.classList.add('active');
    }
}

// Close the menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const menuIcon = document.querySelector('.menu-icon');

        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
    });
});
