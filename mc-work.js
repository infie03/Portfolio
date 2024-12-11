document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    initParticles();
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectPopup = document.querySelector('.project-popup');
    const popupClose = document.querySelector('.popup-close');
    const popupProjectCard = document.querySelector('.popup-project-card');
    const projectDetails = document.querySelector('.project-details');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
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
                }
            });
        });
    });

    // Card hover animation
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        // View Details Click Handler
        const viewDetailsBtn = card.querySelector('.view-details');
        viewDetailsBtn.addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            showProjectDetails(card, projectId);
        });
    });

    // Close popup
    popupClose.addEventListener('click', () => {
        projectPopup.classList.remove('active');
        setTimeout(() => {
            popupProjectCard.innerHTML = '';
            projectDetails.innerHTML = '';
        }, 300);
    });

    // Show project details
    function showProjectDetails(card, projectId) {
        // Clone the card for the left side
        const cardClone = card.cloneNode(true);
        popupProjectCard.innerHTML = '';
        popupProjectCard.appendChild(cardClone);

        // Load project details
        const details = getProjectDetails(projectId);
        if (details) {
            projectDetails.innerHTML = `
                <h2>${details.title}</h2>
                <div class="project-category">${details.category}</div>
                <div class="project-description">
                    <h3>Description</h3>
                    <p>${details.description}</p>
                </div>
                <div class="project-features">
                    <h3>Features</h3>
                    <ul>
                        ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-tech">
                    <h3>Technologies Used</h3>
                    <ul>
                        ${details.technologies.map(tech => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
                ${details.link ? `<a href="${details.link}" target="_blank" class="project-link">View Project</a>` : ''}
            `;
        }

        // Show popup
        projectPopup.classList.add('active');
    }

    // Project details data
    function getProjectDetails(projectId) {
        const projects = {
            'thunder-rtp': {
                title: 'Thunder RTP Plugin',
                category: 'Plugin',
                description: 'A powerful random teleportation plugin that adds unique weather-based features and extensive customization options to enhance player exploration and survival gameplay.',
                features: [
                    'Custom weather effects and animations',
                    'Safe location detection algorithm',
                    'Configurable biome filtering',
                    'Multi-world support',
                    'Permission-based cooldown system',
                    'Custom events API'
                ],
                technologies: [
                    'Spigot API',
                    'Java',
                    'Bukkit Events',
                    'Particle Effects API'
                ],
                link: 'https://www.spigotmc.org/resources/thunder_rtp-0-1.121225/'
            }
            // Add more project details here
        };
        return projects[projectId];
    }
});

// Minecraft-style floating particles
function initParticles() {
    const particlesContainer = document.querySelector('.minecraft-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

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
