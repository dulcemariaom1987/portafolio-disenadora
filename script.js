// ==========================================
// DATOS DEL PORTAFOLIO
// ==========================================
const portfolioProjects = [

    {
        id: 2,
        title: 'Reels | Videos YouTube',
        category: 'video',
        icon: '🎬',
        description: 'Edición profesional de videos para redes sociales y/ youtube.'
    },
    {
        id: 9,
        title: 'Libros digitales',
        category: 'design',
        icon: '📘',
        description: 'Diseño de libros digitales para Amazon Books'
    },
    {
        id: 10,
        title: 'Posts | Stories',
        category: 'social',
        icon: '✨',
        description: 'Variedad de diseños de contenido para Instagram/Facebook.'
    }
];

// ==========================================
// VARIABLES GLOBALES
// ==========================================
let currentFilter = 'all';

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    setupEventListeners();
    handleScrollEffects();
});

// ==========================================
// INICIALIZAR PORTAFOLIO
// ==========================================
function initializePortfolio() {
    renderPortfolio();
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menu al click en link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Filtros de portafolio
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            renderPortfolio();
        });
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleContactSubmit);

    // Modal
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
}

// ==========================================
// RENDERIZAR PORTAFOLIO
// ==========================================
function renderPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    const filteredProjects = currentFilter === 'all' 
        ? portfolioProjects 
        : portfolioProjects.filter(p => p.category === currentFilter);

    portfolioGrid.innerHTML = filteredProjects.map(project => `
        <div class="portfolio-item" onclick="openProjectModal(${project.id})">
            <div class="portfolio-image">
                <span>${project.icon}</span>
            </div>
            <div class="portfolio-overlay">
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-category">${getCategoryName(project.category)}</p>
            </div>
        </div>
    `).join('');
}

// ==========================================
// OBTENER NOMBRE DE CATEGORÍA
// ==========================================
function getCategoryName(category) {
    const names = {
        'video': 'Edición de video',
        'social': 'Redes Sociales',
        'design': 'E-books'
    };
    return names[category] || category;
}

// ==========================================
// ABRIR MODAL DE PROYECTO
// ==========================================
function openProjectModal(projectId) {
    const project = portfolioProjects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 6rem; margin-bottom: 2rem;">${project.icon}</div>
            <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--dark);">${project.title}</h2>
            <p style="color: var(--primary); font-weight: 600; margin-bottom: 2rem; font-size: 1.1rem;">
                ${getCategoryName(project.category)}
            </p>
            <p style="color: var(--gray); font-size: 1.1rem; line-height: 1.8; max-width: 600px; margin: 0 auto;">
                ${project.description}
            </p>
            <div style="margin-top: 3rem;">
                <p style="color: var(--gray); font-size: 0.9rem; margin-bottom: 1rem;">
                    💼 Este proyecto está disponible en mi portafolio completo
                </p>
                <a href="https://dulcemariaportafolio.my.canva.site/" target="_blank" 
                   style="display: inline-block; padding: 1rem 2rem; background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; text-decoration: none; border-radius: 50px; font-weight: 600; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);">
                    Ver Portafolio Completo →
                </a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ==========================================
// CERRAR MODAL
// ==========================================
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ==========================================
// MANEJAR ENVÍO DE FORMULARIO
// ==========================================
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Más adelante se puede agregar la lógica para enviar el formulario
    // Por ahora, solo se muestra un mensaje
    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto. 😊');
    e.target.reset();
}

// ==========================================
// EFECTOS DE SCROLL
// ==========================================
function handleScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ==========================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// LOG INICIAL
// ==========================================
console.log('🎨 Portafolio de Diseño y Edición cargado');
console.log('💻 Desarrollado por Dulce María Méndez Santiago');