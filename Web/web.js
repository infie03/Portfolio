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
    const particlesContainer = document.querySelector('.web-particles');
    const numParticles = 50;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        particlesContainer.appendChild(particle);
    }
}


// Project filtering functionality
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Update active filter button
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter projects
    projectCards.forEach(card => {
        const projectType = card.getAttribute('data-type').toLowerCase();
        if (category === 'all' || projectType === category.toLowerCase()) {
            card.style.display = 'block';
            // Add animation
            card.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and project cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Set initial active state on 'All' button
    document.querySelector('[data-filter="all"]').classList.add('active');

    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filter projects
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

    // Initialize particles
    initParticles();
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

// Particle System
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ParticleSystem {
    constructor(canvasId, color) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.color = color;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseX = e.x;
            this.mouseY = e.y;
            for (let i = 0; i < 3; i++) {
                this.particles.push(new Particle(this.mouseX, this.mouseY, this.color));
            }
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw(this.ctx);
            
            if (this.particles[i].size <= 0.2) {
                this.particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new ParticleSystem('particles-canvas', '#61dafb');
    particleSystem.animate();
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

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    // Project Cards Animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.2
        });
    });

    // Card Content Animation
    gsap.from(".card-content", {
        scrollTrigger: {
            trigger: ".card-content",
            start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // Particles Container Animation
    gsap.from(".particles-container", {
        scrollTrigger: {
            trigger: ".particles-container",
            start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1
    });

    // Card Hover Animations
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});
