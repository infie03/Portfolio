document.querySelectorAll('pre code').forEach((codeBlock) => {
    const container = codeBlock.parentElement;
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';

    const copyIcon = document.createElement('i');
    copyIcon.className = 'fas fa-copy'; // Font Awesome copy icon class
    copyButton.appendChild(copyIcon);

    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(codeBlock.textContent);
            copyIcon.className = 'fas fa-check'; // Font Awesome check icon class for success
            copyButton.classList.add('copied');

            // Play Minecraft-like click sound
            const clickSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            clickSound.volume = 0.3;
            clickSound.play().catch(() => { });

            setTimeout(() => {
                copyIcon.className = 'fas fa-copy'; // Revert back to the original copy icon
                copyButton.classList.remove('copied');
            }, 2000);
        } catch (err) {
            copyIcon.className = 'fas fa-exclamation-triangle'; // Font Awesome error icon class
            setTimeout(() => {
                copyIcon.className = 'fas fa-copy'; // Revert back to the original copy icon
            }, 2000);
        }
    });

    container.style.position = 'relative';
    container.appendChild(copyButton);
});


// Smooth scrolling function
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Close menu after clicking if screen width is less than 1006px
    if (window.innerWidth <= 1006) {
        const navLinks = document.querySelector('.nav-links');
        const menuIcon = document.querySelector('.menu-icon');
        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
    }
}

// Add smooth scrolling to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// Add active class to current section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.plugin-nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Check window size and handle menu visibility
function checkWindowSize() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (window.innerWidth <= 1006) {
        menuIcon.style.display = 'block';
        if (!navLinks.classList.contains('active')) {
            navLinks.classList.remove('desktop');
        }
    } else {
        menuIcon.style.display = 'none';
        navLinks.classList.add('desktop');
        navLinks.classList.remove('active');
    }
}

// Initial check and add resize listener
window.addEventListener('load', checkWindowSize);
window.addEventListener('resize', checkWindowSize);

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

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (!menuIcon.contains(e.target) && !navLinks.contains(e.target)) {
        menuIcon.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

function goBack() {
    window.history.back();
}