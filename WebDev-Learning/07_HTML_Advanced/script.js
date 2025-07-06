// HTML Advanced - Interactive Features and Modern APIs
// This file demonstrates advanced HTML techniques with JavaScript

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function () {
    console.log('HTML Advanced examples loaded!');

    // Initialize all features
    initializeFontSizeControls();
    initializeIntersectionObserver();
    initializeServiceWorkerCheck();
    setupFormValidation();
    loadSavedFontSize();

    // Set up live region updates
    let statusUpdateCount = 0;
    window.updateStatus = function () {
        statusUpdateCount++;
        const statusElement = document.getElementById('status-message');
        statusElement.textContent = `Status updated ${statusUpdateCount} time(s) at ${new Date().toLocaleTimeString()}`;
    };
});

// ========== FONT SIZE CONTROLS ==========
let currentFontSize = 16; // Default font size in pixels

function initializeFontSizeControls() {
    // Font size controls are already set up in HTML with onclick handlers
    console.log('Font size controls initialized');
}

function changeFontSize(delta) {
    currentFontSize += delta;

    // Limit font size between 12px and 24px
    currentFontSize = Math.max(12, Math.min(24, currentFontSize));

    // Apply font size to document
    document.documentElement.style.fontSize = currentFontSize + 'px';

    // Save to localStorage
    localStorage.setItem('preferredFontSize', currentFontSize);

    // Announce change to screen readers
    const announcement = `Font size changed to ${currentFontSize} pixels`;
    announceToScreenReader(announcement);

    console.log('Font size changed to:', currentFontSize + 'px');
}

function loadSavedFontSize() {
    const savedSize = localStorage.getItem('preferredFontSize');
    if (savedSize) {
        currentFontSize = parseInt(savedSize);
        document.documentElement.style.fontSize = currentFontSize + 'px';
        console.log('Loaded saved font size:', currentFontSize + 'px');
    }
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ========== SCROLL TO CONTENT ==========
window.scrollToContent = function () {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
function initializeIntersectionObserver() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        console.log('Intersection Observer not supported');
        // Fallback: show all elements immediately
        const targets = document.querySelectorAll('.scroll-target');
        targets.forEach(target => target.classList.add('animate'));
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all scroll targets
    const scrollTargets = document.querySelectorAll('.scroll-target');
    scrollTargets.forEach(target => {
        observer.observe(target);
    });

    console.log('Intersection Observer initialized for', scrollTargets.length, 'elements');
}

// ========== WEB STORAGE API DEMO ==========
window.saveToLocal = function () {
    const input = document.getElementById('storage-input');
    const result = document.getElementById('storage-result');

    if (input.value.trim()) {
        try {
            localStorage.setItem('htmlAdvancedDemo', input.value);
            result.textContent = `Saved: "${input.value}"`;
            result.style.color = 'var(--success-color)';
        } catch (error) {
            result.textContent = `Error saving: ${error.message}`;
            result.style.color = 'var(--error-color)';
        }
    } else {
        result.textContent = 'Please enter some text to save';
        result.style.color = 'var(--warning-color)';
    }
};

window.loadFromLocal = function () {
    const input = document.getElementById('storage-input');
    const result = document.getElementById('storage-result');

    try {
        const stored = localStorage.getItem('htmlAdvancedDemo');
        if (stored) {
            input.value = stored;
            result.textContent = `Loaded: "${stored}"`;
            result.style.color = 'var(--success-color)';
        } else {
            result.textContent = 'No data found in storage';
            result.style.color = 'var(--warning-color)';
        }
    } catch (error) {
        result.textContent = `Error loading: ${error.message}`;
        result.style.color = 'var(--error-color)';
    }
};

window.clearLocal = function () {
    const input = document.getElementById('storage-input');
    const result = document.getElementById('storage-result');

    try {
        localStorage.removeItem('htmlAdvancedDemo');
        input.value = '';
        result.textContent = 'Storage cleared';
        result.style.color = 'var(--text-light)';
    } catch (error) {
        result.textContent = `Error clearing: ${error.message}`;
        result.style.color = 'var(--error-color)';
    }
};

// ========== GEOLOCATION API DEMO ==========
window.getLocation = function () {
    const result = document.getElementById('geo-result');

    if (!navigator.geolocation) {
        result.textContent = 'Geolocation is not supported by this browser';
        result.style.color = 'var(--error-color)';
        return;
    }

    result.textContent = 'Getting location...';
    result.style.color = 'var(--text-light)';

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            result.innerHTML = `
                <strong>Location found:</strong><br>
                Latitude: ${lat.toFixed(6)}<br>
                Longitude: ${lon.toFixed(6)}<br>
                Accuracy: ±${accuracy.toFixed(0)} meters
            `;
            result.style.color = 'var(--success-color)';
        },
        function (error) {
            let message = 'Unknown error occurred';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    message = 'User denied the request for geolocation';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Location information is unavailable';
                    break;
                case error.TIMEOUT:
                    message = 'The request to get user location timed out';
                    break;
            }
            result.textContent = `Error: ${message}`;
            result.style.color = 'var(--error-color)';
        },
        options
    );
};

// ========== SERVICE WORKER CHECK ==========
function initializeServiceWorkerCheck() {
    window.checkServiceWorker = function () {
        const result = document.getElementById('sw-result');

        if (!('serviceWorker' in navigator)) {
            result.textContent = 'Service Worker is not supported by this browser';
            result.style.color = 'var(--error-color)';
            return;
        }

        navigator.serviceWorker.getRegistrations().then(registrations => {
            if (registrations.length > 0) {
                const registration = registrations[0];
                let status = 'Service Worker registered';

                if (registration.active) {
                    status += ' and active';
                } else if (registration.installing) {
                    status += ' and installing';
                } else if (registration.waiting) {
                    status += ' and waiting';
                }

                result.textContent = status;
                result.style.color = 'var(--success-color)';
            } else {
                result.textContent = 'No Service Worker registered';
                result.style.color = 'var(--warning-color)';
            }
        }).catch(error => {
            result.textContent = `Error checking Service Worker: ${error.message}`;
            result.style.color = 'var(--error-color)';
        });
    };
}

// ========== FORM VALIDATION ==========
function setupFormValidation() {
    const form = document.querySelector('.accessible-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('full-name');
        const emailInput = document.getElementById('email-address');

        let isValid = true;
        let errors = [];

        // Validate name
        if (!nameInput.value.trim()) {
            errors.push('Full name is required');
            nameInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            nameInput.setAttribute('aria-invalid', 'false');
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            errors.push('Email address is required');
            emailInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            errors.push('Please enter a valid email address');
            emailInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            emailInput.setAttribute('aria-invalid', 'false');
        }

        if (isValid) {
            // Show success message
            showFormMessage('Form submitted successfully!', 'success');
            form.reset();

            // Reset aria-invalid attributes
            nameInput.removeAttribute('aria-invalid');
            emailInput.removeAttribute('aria-invalid');
        } else {
            // Show error messages
            const errorMessage = 'Please fix the following errors: ' + errors.join(', ');
            showFormMessage(errorMessage, 'error');

            // Focus first invalid field
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageDiv.setAttribute('aria-live', 'polite');
    messageDiv.textContent = message;

    // Style the message
    messageDiv.style.padding = 'var(--spacing-md)';
    messageDiv.style.marginTop = 'var(--spacing-md)';
    messageDiv.style.borderRadius = 'var(--radius-md)';
    messageDiv.style.fontWeight = '500';

    if (type === 'success') {
        messageDiv.style.backgroundColor = 'rgba(72, 187, 120, 0.1)';
        messageDiv.style.color = 'var(--success-color)';
        messageDiv.style.border = '1px solid var(--success-color)';
    } else {
        messageDiv.style.backgroundColor = 'rgba(245, 101, 101, 0.1)';
        messageDiv.style.color = 'var(--error-color)';
        messageDiv.style.border = '1px solid var(--error-color)';
    }

    // Insert after form
    const form = document.querySelector('.accessible-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// ========== PERFORMANCE MONITORING ==========
function logPerformanceMetrics() {
    if (!('performance' in window)) {
        console.log('Performance API not supported');
        return;
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const metrics = {
                'DNS Lookup': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
                'TCP Connection': Math.round(perfData.connectEnd - perfData.connectStart),
                'Request/Response': Math.round(perfData.responseEnd - perfData.requestStart),
                'DOM Processing': Math.round(perfData.domContentLoadedEventEnd - perfData.responseEnd),
                'Load Complete': Math.round(perfData.loadEventEnd - perfData.navigationStart)
            };

            console.group('Performance Metrics');
            Object.entries(metrics).forEach(([key, value]) => {
                console.log(`${key}: ${value}ms`);
            });
            console.groupEnd();
        }, 0);
    });
}

// Initialize performance monitoring
logPerformanceMetrics();

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
function debounce(func, wait) {
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

// Check for reduced motion preference
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Lazy load images when they come into view
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
setupLazyLoading();

// ========== KEYBOARD NAVIGATION ENHANCEMENT ==========
document.addEventListener('keydown', function (event) {
    // Enhanced keyboard navigation for better accessibility
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
});

// Add styles for keyboard navigation
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyles);

// ========== ERROR HANDLING ==========
window.addEventListener('error', function (event) {
    console.error('JavaScript error:', event.error);

    // Could send error reports to a logging service in production
    // logErrorToService(event.error);
});

window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled promise rejection:', event.reason);

    // Prevent the default handling (which would log to console)
    event.preventDefault();
});

console.log('HTML Advanced script fully loaded with all features initialized!');
