// Minecraft-style floating particles
function createParticle() {
    const particles = document.querySelector('.minecraft-particles');
    if (!particles) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random animation duration
    const duration = Math.random() * 5 + 5;
    particle.style.animation = `float ${duration}s linear infinite`;
    
    particles.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Initialize particles
function initParticles() {
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
    
    // Continue creating particles
    setInterval(createParticle, 200);
}

// Project data
const projectData = {
    'thunder-rtp': {
        title: 'Thunder RTP Plugin',
        type: 'Plugin',
        description: 'Thunder RTP is a cutting-edge Minecraft plugin designed for Spigot and Paper servers, aimed at enhancing player engagement through a unique quarry system.',
        features: [
            'Safe location detection',
            'Customizable teleport regions',
            'Cooldown system',
            'Permission-based access',
            'Multi-world support'
        ]
    },
    'advanced-rtp': {
        title: 'Advanced RTP Mod',
        type: 'Mod',
        description: 'A feature-rich random teleportation mod with enhanced functionality and user experience.',
        features: [
            'Biome-specific teleportation',
            'GUI interface',
            'Custom particle effects',
            'Integration with other mods',
            'Configuration system'
        ]
    },
    'resource-2': {
        title: 'Custom Resource Pack',
        type: 'Resource Pack',
        description: 'A high-quality resource pack that enhances the visual experience of Minecraft.',
        features: [
            'HD textures',
            'Custom UI elements',
            'Animated textures',
            'Custom sound effects',
            'Optimized performance'
        ]
    }
};

// Project Data
const projectsData = {
    'thunder-rtp': {
        title: 'Thunder RTP',
        category: 'Plugin',
        description: 'Thunder RTP is a cutting-edge Minecraft plugin designed for Spigot, Paper servers, aimed at enhancing player engagement through a unique quarry system.',
        image: 'images/Minecraft-logo.jpeg',
        features: [
            'Custom Quarry System',
            'Enhanced Player Engagement',
            'Server Performance Optimization',
            'Intuitive Configuration'
        ],
        downloads: [
            {
                platform: 'Spigot MC',
                url: '#',
                icon: 'images/spigot-icon.png'
            }
        ]
    },
    // Add more projects here following the same structure
};

document.addEventListener('DOMContentLoaded', () => {
    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-type') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Set 'All' filter as active by default
    const allFilter = document.querySelector('[data-filter="all"]');
    if (allFilter) {
        allFilter.click();
    }

    // Initialize particles
    setTimeout(createParticles, 100);
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(createParticles, 250);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});

// Particle system
function createParticles() {
    const container = document.querySelector('.minecraft-particles');
    container.innerHTML = '';

    // Reduced particle count for better performance
    const particleCount = Math.floor(window.innerWidth / 40);
    
    // Create particles in batches
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'minecraft-particle';
        
        // Random initial position
        const x = Math.random() * window.innerWidth;
        const delay = Math.random() * 10;
        
        particle.style.left = `${x}px`;
        particle.style.animationDelay = `-${delay}s`;
        
        // Random size variation
        const size = 1.5 + Math.random() * 1.5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity
        particle.style.opacity = 0.1 + Math.random() * 0.3;
        
        // Reduced drift range for better performance
        const drift = -10 + Math.random() * 20;
        particle.style.setProperty('--particle-drift', `${drift}px`);
        
        fragment.appendChild(particle);
    }
    
    container.appendChild(fragment);
}

// Three dot function for menu 
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

// Animation Timeline
var infie = gsap.timeline()

infie.from(".logo",{
    y: -20,
    opacity: 0,
    duration: 0.44,
    delay:0.5
})

infie.from(".nav-links li",{
    y: -20,
    opacity: 0,
    duration: 0.44,
    stagger: 0.3
})

infie.from(".minecraft-content",{
    y: 40,
    opacity: 0,
    duration: 0.44,
})

infie.from(".minecraft-features",{
    y: 40,
    opacity: 0,
    duration: 0.44,
    stagger: 0.3
})

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    // Minecraft Features Animation
    const minecraftFeatures = document.querySelectorAll('.minecraft-feature');
    minecraftFeatures.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.2
        });
    });

    // Minecraft Content Animation
    gsap.from(".minecraft-content", {
        scrollTrigger: {
            trigger: ".minecraft-content",
            start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 0.8
    });

    // Server Features Animation
    gsap.from(".server-features", {
        scrollTrigger: {
            trigger: ".server-features",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });

    // Pixel Art Animation for Minecraft Theme
    gsap.from(".pixel-art-element", {
        scrollTrigger: {
            trigger: ".pixel-art-element",
            start: "top 85%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1
    });
});
