// Discord-style floating particles
function initParticles() {
    const particlesContainer = document.querySelector('.Discord-particles-1');
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

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    initParticles();
    
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random particle styles
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(100, 255, 218, ${Math.random() * 0.5 + 0.2});
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: float ${Math.random() * 10 + 5}s linear infinite;
        opacity: ${Math.random() * 0.5 + 0.3};
        box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(100, 255, 218, 0.3);
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (Math.random() * 10 + 5) * 1000);
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random particle styles
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(100, 255, 218, ${Math.random() * 0.5 + 0.2});
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * document.documentElement.scrollHeight}px;
        animation: float ${Math.random() * 10 + 5}s linear infinite;
        opacity: ${Math.random() * 0.5 + 0.3};
        box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(100, 255, 218, 0.3);
    `;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle();
    }, (Math.random() * 10 + 5) * 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 400; i++) { // Increased the number of particles
        createParticle();
    }
});

// Hamburger Menu
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
    const particleSystem = new ParticleSystem('particles-canvas', '#7289DA');
    particleSystem.animate();
});

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

infie.from(".discord-content",{
    y: 40,
    opacity: 0,
    duration: 0.44,
})

infie.from(".discord-features",{
    y: 40,
    opacity: 0,
    duration: 0.44,
    stagger: 0.3
})

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    // Discord Features Animation
    const discordFeatures = document.querySelectorAll('.discord-feature');
    discordFeatures.forEach((item, index) => {
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

    // Discord Content Animation
    gsap.from(".discord-content", {
        scrollTrigger: {
            trigger: ".discord-content",
            start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 0.8
    });

    // Server Section Animation
    gsap.from(".server-section", {
        scrollTrigger: {
            trigger: ".server-section",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
});
