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

function showDetails(projectId) {
    const popup = document.getElementById('project-details-popup');
    const selectedProject = document.querySelector(`[data-id="${projectId}"]`);
    
    if (!selectedProject || !popup) {
        console.error('Project or popup not found');
        return;
    }
    
    const project = projectData[projectId];
    if (!project) {
        console.error('Project data not found for ID:', projectId);
        return;
    }
    
    // Update popup content
    popup.querySelector('.popup-title').textContent = project.title;
    popup.querySelector('.project-type').textContent = project.type;
    popup.querySelector('.project-description').textContent = project.description;
    
    // Update features list
    const featuresList = popup.querySelector('.features-list');
    featuresList.innerHTML = project.features
        .map(feature => `<li>${feature}</li>`)
        .join('');
    
    // Update project image
    const projectImage = selectedProject.querySelector('.card-front img');
    if (projectImage) {
        const newImage = projectImage.cloneNode(true);
        const popupImage = popup.querySelector('.project-image');
        popupImage.innerHTML = '';
        popupImage.appendChild(newImage);
    }
    
    // Show popup
    document.body.style.overflow = 'hidden';
    popup.style.display = 'block';
    
    // Force reflow and add active class
    popup.offsetHeight;
    popup.classList.add('active');
}

function closePopup() {
    const popup = document.getElementById('project-details-popup');
    if (!popup) return;
    
    popup.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    const popup = document.getElementById('project-details-popup');
    if (popup && e.target === popup) {
        closePopup();
    }
});

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
    // Initialize particles
    initParticles();
    
    // Initialize project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            const projectId = this.closest('.project-card').getAttribute('data-id');
            showDetails(projectId);
        });
    });

    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            filterProjects(category);
        });
    });

    // Set initial filter to 'all'
    filterProjects('all');
});
