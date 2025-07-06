/**
 * Portfolio Website - JavaScript Implementation
 * A comprehensive portfolio website demonstrating modern web development practices
 */

// ===== APPLICATION STATE MANAGEMENT =====
class PortfolioApp {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'light';
        this.isMenuOpen = false;
        this.intersectionObserver = null;
        this.init();
    }

    init() {
        this.setupTheme();
        this.bindEvents();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupFormValidation();
        this.setupLazyLoading();
        this.initializeAnimations();
    }

    // ===== THEME MANAGEMENT =====
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('portfolio-theme', this.currentTheme);
        this.updateThemeIcon();
        this.showNotification(`Switched to ${this.currentTheme} theme`, 'success');
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }

    getStoredTheme() {
        return localStorage.getItem('portfolio-theme');
    }

    // ===== EVENT BINDING =====
    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Mobile navigation toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.closeMobileMenu();
                this.updateActiveNavLink(link);
            });
        });

        // Project modal events
        document.querySelectorAll('[data-action="view"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectCard = e.target.closest('.project-card');
                const projectData = projectCard.dataset.project;
                this.openProjectModal(projectData);
            });
        });

        // Modal close events
        document.getElementById('modalClose')?.addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('projectModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'projectModal') {
                this.closeModal();
            }
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Window events
        window.addEventListener('scroll', this.throttle(() => {
            this.updateNavigationOnScroll();
        }, 100));

        window.addEventListener('resize', this.debounce(() => {
            this.handleWindowResize();
        }, 250));
    }

    // ===== NAVIGATION FUNCTIONALITY =====
    toggleMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');

        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active', this.isMenuOpen);
        navToggle.classList.toggle('active', this.isMenuOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');

        this.isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateNavigationOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    this.updateActiveNavLink(activeLink);
                }
            }
        });

        // Update header background on scroll
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    }

    // ===== SMOOTH SCROLLING =====
    setupSmoothScrolling() {
        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.project-card, .stat, .skill-category, .contact-method'
        );

        animatedElements.forEach(el => {
            this.intersectionObserver.observe(el);
        });
    }

    // ===== PROJECT MODAL FUNCTIONALITY =====
    openProjectModal(projectData) {
        const modalContent = document.getElementById('modalContent');
        const projectModal = document.getElementById('projectModal');

        const projectDetails = this.getProjectDetails(projectData);

        modalContent.innerHTML = `
            <div class="project-modal-content">
                <img src="${projectDetails.image}" alt="${projectDetails.title}" class="modal-image">
                <div class="modal-text">
                    <h2>${projectDetails.title}</h2>
                    <p class="project-category">${projectDetails.category}</p>
                    <div class="project-description">
                        ${projectDetails.description}
                    </div>
                    <div class="project-features">
                        <h3>Key Features:</h3>
                        <ul>
                            ${projectDetails.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="project-technologies">
                        <h3>Technologies Used:</h3>
                        <div class="tech-tags">
                            ${projectDetails.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-links">
                        <a href="${projectDetails.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener">
                            View Live Demo
                        </a>
                        <a href="${projectDetails.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener">
                            View Source Code
                        </a>
                    </div>
                </div>
            </div>
        `;

        projectModal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const projectModal = document.getElementById('projectModal');
        projectModal.classList.remove('visible');
        document.body.style.overflow = '';
    }

    getProjectDetails(projectData) {
        const projects = {
            ecommerce: {
                title: 'E-commerce Platform',
                category: 'Full-Stack Web Application',
                image: './assets/images/projects/project1.jpg',
                description: `
                    <p>A comprehensive e-commerce platform built with modern web technologies. 
                    This project demonstrates full-stack development skills including user authentication, 
                    payment processing, inventory management, and responsive design.</p>
                    <p>The application features a clean, intuitive interface that provides an excellent 
                    user experience across all devices. It includes advanced features like real-time 
                    inventory updates, order tracking, and an admin dashboard.</p>
                `,
                features: [
                    'User authentication and authorization',
                    'Product catalog with search and filtering',
                    'Shopping cart and checkout process',
                    'Payment integration with Stripe',
                    'Order management system',
                    'Admin dashboard',
                    'Responsive design',
                    'Real-time inventory updates'
                ],
                technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT', 'Sass'],
                liveUrl: 'https://ecommerce-demo.example.com',
                githubUrl: 'https://github.com/johndoe/ecommerce-platform'
            },
            weather: {
                title: 'Weather Dashboard',
                category: 'Frontend Web Application',
                image: './assets/images/projects/project2.jpg',
                description: `
                    <p>A beautiful and responsive weather application that provides current weather 
                    conditions and forecasts. The app uses geolocation to automatically detect the 
                    user's location and displays weather data in an intuitive, visual format.</p>
                    <p>Features include interactive charts, multiple location support, and a clean 
                    design that adapts to different weather conditions with dynamic backgrounds.</p>
                `,
                features: [
                    'Current weather conditions',
                    '7-day weather forecast',
                    'Geolocation integration',
                    'Multiple location support',
                    'Interactive weather charts',
                    'Dynamic backgrounds',
                    'Responsive design',
                    'Offline support with PWA'
                ],
                technologies: ['Vue.js', 'OpenWeather API', 'Chart.js', 'CSS Grid', 'Service Workers'],
                liveUrl: 'https://weather-app-demo.example.com',
                githubUrl: 'https://github.com/johndoe/weather-dashboard'
            },
            task: {
                title: 'Task Management App',
                category: 'Collaborative Web Application',
                image: './assets/images/projects/project3.jpg',
                description: `
                    <p>A collaborative task management application that helps teams organize and 
                    track their work efficiently. The app features real-time updates, team collaboration 
                    tools, and an intuitive drag-and-drop interface.</p>
                    <p>Built with modern web technologies to ensure smooth performance and excellent 
                    user experience. Includes advanced features like file attachments, commenting 
                    system, and detailed analytics.</p>
                `,
                features: [
                    'Real-time task updates',
                    'Drag-and-drop task management',
                    'Team collaboration tools',
                    'File attachments',
                    'Commenting system',
                    'Project analytics',
                    'Responsive design',
                    'Offline functionality'
                ],
                technologies: ['JavaScript ES6+', 'WebSocket', 'Express', 'Socket.io', 'MongoDB', 'JWT'],
                liveUrl: 'https://task-manager-demo.example.com',
                githubUrl: 'https://github.com/johndoe/task-management-app'
            }
        };

        return projects[projectData] || projects.ecommerce;
    }

    // ===== FORM VALIDATION AND SUBMISSION =====
    setupFormValidation() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required.`;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }

        // Name validation
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long.';
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long.';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const inputs = form.querySelectorAll('.form-input');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please fix the errors in the form.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);

            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
        }
    }

    async simulateFormSubmission(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Randomly succeed or fail for demo purposes
                if (Math.random() > 0.1) {
                    console.log('Form data:', data);
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====
    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ===== ANIMATIONS =====
    initializeAnimations() {
        // Add CSS classes for animations
        const style = document.createElement('style');
        style.textContent = `
            .project-card,
            .stat,
            .skill-category,
            .contact-method {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .project-card.animate-in,
            .stat.animate-in,
            .skill-category.animate-in,
            .contact-method.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .project-card:nth-child(1) { transition-delay: 0.1s; }
            .project-card:nth-child(2) { transition-delay: 0.2s; }
            .project-card:nth-child(3) { transition-delay: 0.3s; }
            
            .stat:nth-child(1) { transition-delay: 0.1s; }
            .stat:nth-child(2) { transition-delay: 0.2s; }
            .stat:nth-child(3) { transition-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }

    // ===== KEYBOARD NAVIGATION =====
    handleKeyboardNavigation(e) {
        // Close modal with Escape key
        if (e.key === 'Escape') {
            if (document.getElementById('projectModal').classList.contains('visible')) {
                this.closeModal();
            }
            if (this.isMenuOpen) {
                this.closeMobileMenu();
            }
        }

        // Navigate sections with arrow keys
        if (e.ctrlKey || e.metaKey) {
            const sections = ['home', 'about', 'projects', 'contact'];
            const currentSection = this.getCurrentSection();
            const currentIndex = sections.indexOf(currentSection);

            if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                this.scrollToSection(sections[currentIndex - 1]);
            } else if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                this.scrollToSection(sections[currentIndex + 1]);
            }
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;

        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                return section.getAttribute('id');
            }
        }
        return 'home';
    }

    // ===== NOTIFICATIONS =====
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#06b6d4'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 400px;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;

        notification.textContent = message;

        // Add animation styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    // ===== WINDOW RESIZE HANDLER =====
    handleWindowResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }

    // ===== UTILITY FUNCTIONS =====
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== PERFORMANCE MONITORING =====
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                console.log(`Page loaded in ${loadTime}ms`);
            });
        }
    }

    // ===== PUBLIC API =====
    getTheme() {
        return this.currentTheme;
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    openContactForm() {
        this.scrollToSection('contact');
        setTimeout(() => {
            const nameField = document.getElementById('name');
            if (nameField) nameField.focus();
        }, 1000);
    }
}

// ===== APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the portfolio app
    window.portfolioApp = new PortfolioApp();

    // Performance monitoring
    window.portfolioApp.measurePerformance();

    // Development helpers
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🚀 Portfolio Website Development Mode');
        console.log('Available commands:');
        console.log('- portfolioApp.toggleTheme() - Toggle theme');
        console.log('- portfolioApp.scrollToSection(id) - Scroll to section');
        console.log('- portfolioApp.showNotification(message, type) - Show notification');
        console.log('- portfolioApp.openContactForm() - Open contact form');

        // Add development helpers to window
        window.dev = {
            fillContactForm: () => {
                document.getElementById('name').value = 'John Doe';
                document.getElementById('email').value = 'john@example.com';
                document.getElementById('subject').value = 'Test Message';
                document.getElementById('message').value = 'This is a test message for development purposes.';
            },
            simulateProjectClick: (projectName = 'ecommerce') => {
                const projectCard = document.querySelector(`[data-project="${projectName}"]`);
                const viewBtn = projectCard?.querySelector('[data-action="view"]');
                if (viewBtn) viewBtn.click();
            }
        };

        console.log('🛠️ Development helpers available as window.dev');
    }
});

// ===== SERVICE WORKER REGISTRATION (FOR PWA SUPPORT) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here for PWA functionality
        console.log('📱 PWA support available - Service Worker ready for registration');
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);

    if (window.portfolioApp) {
        window.portfolioApp.showNotification(
            'An error occurred. Please refresh the page if problems persist.',
            'error'
        );
    }
});

// ===== ANALYTICS HELPER =====
window.trackEvent = function (category, action, label) {
    // Analytics tracking would go here
    console.log('Analytics Event:', { category, action, label });
};
