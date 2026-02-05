// ==========================================
// SICHER TECH - MAIN JAVASCRIPT
// Interactive Features & Animations
// ==========================================

'use strict';

// ==========================================
// PAGE LOADER
// ==========================================
// Cacher le loader dès que le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideLoader);
} else {
    // DOM déjà chargé
    hideLoader();
}

// Aussi cacher quand tout est complètement chargé
window.addEventListener('load', hideLoader);

function hideLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        // Supprimer complètement après la transition
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// ==========================================
// MOBILE MENU TOGGLE - ANIMATION FLUIDE
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;

function toggleMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    if (menuOverlay) menuOverlay.classList.toggle('active');
    
    // Bloquer le scroll quand le menu est ouvert
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    body.style.overflow = '';
}

if (hamburger && navMenu) {
    // Toggle menu au clic sur hamburger
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Fermer le menu en cliquant sur l'overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
}

// ==========================================
// NAVBAR STICKY - TOUJOURS VISIBLE
// ==========================================
const navbar = document.querySelector('.navbar');

if (navbar) {
    let lastScroll = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Ajouter classe 'scrolled' pour effet visuel
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // La navbar reste toujours visible (sticky)
        // Suppression du hide/show - navigation toujours accessible
        
        lastScroll = currentScroll;
    });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const observeElements = document.querySelectorAll('.service-card, .why-item, .value-card, .mv-card, .team-member, .stat-item, .portfolio-item, .faq-item');
observeElements.forEach(el => observer.observe(el));

// ==========================================
// FAQ ACCORDION
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.replace(/[0-9]/g, '').trim();
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
};

// Observe stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                const target = parseInt(statNumber.textContent.replace(/\D/g, ''));
                statNumber.dataset.animated = 'true';
                animateCounter(statNumber, target);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// FORM VALIDATION (if contact form exists)
// ==========================================
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: this.querySelector('[name="firstName"]').value.trim(),
            lastName: this.querySelector('[name="lastName"]').value.trim(),
            email: this.querySelector('[name="email"]').value.trim(),
            phone: this.querySelector('[name="phone"]').value.trim(),
            company: this.querySelector('[name="company"]').value.trim(),
            service: this.querySelector('[name="service"]').value,
            budget: this.querySelector('[name="budget"]').value,
            timeline: this.querySelector('[name="timeline"]').value,
            message: this.querySelector('[name="message"]').value.trim(),
            newsletter: this.querySelector('[name="newsletter"]').checked,
            terms: this.querySelector('[name="terms"]').checked,
            submittedAt: new Date().toISOString()
        };
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        if (formData.firstName.length < 2) {
            isValid = false;
            errorMessage += 'Please enter a valid first name.\n';
        }
        
        if (formData.lastName.length < 2) {
            isValid = false;
            errorMessage += 'Please enter a valid last name.\n';
        }
        
        if (!isValidEmail(formData.email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        if (!isValidPhone(formData.phone)) {
            isValid = false;
            errorMessage += 'Please enter a valid phone number.\n';
        }
        
        if (!formData.service) {
            isValid = false;
            errorMessage += 'Please select a service.\n';
        }
        
        if (!formData.budget) {
            isValid = false;
            errorMessage += 'Please select a budget range.\n';
        }
        
        if (!formData.timeline) {
            isValid = false;
            errorMessage += 'Please select a timeline.\n';
        }
        
        if (formData.message.length < 10) {
            isValid = false;
            errorMessage += 'Message must be at least 10 characters long.\n';
        }
        
        if (!formData.terms) {
            isValid = false;
            errorMessage += 'You must agree to the terms and conditions.\n';
        }
        
        if (isValid) {
            // Save to localStorage & Firebase
            try {
                const saveResult = await saveFormSubmission(formData);
                
                let successMessage = 'Message envoyé avec succès!';
                if (saveResult.firebase) {
                    successMessage += ' (Sauvegardé dans le cloud ☁️)';
                } else {
                    successMessage += ' (Sauvegardé localement 💾)';
                }
                
                showNotification(successMessage, 'success');
                this.reset();
                
                console.log('Form Data Submitted:', formData);
                console.log('Save Result:', saveResult);
            } catch (error) {
                showNotification('Erreur lors de la sauvegarde. Réessayez.', 'error');
                console.error('Save error:', error);
            }
        } else {
            // Show error message
            showNotification(errorMessage, 'error');
        }
    });
    
    // Real-time validation
    const emailInput = contactForm.querySelector('[name="email"]');
    const phoneInput = contactForm.querySelector('[name="phone"]');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#ff0000';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                this.style.borderColor = '#ff0000';
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    // Accept various phone formats
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

// ==========================================
// SAVE FORM SUBMISSIONS TO LOCALSTORAGE & FIREBASE
// ==========================================
async function saveFormSubmission(formData) {
    try {
        // Toujours sauvegarder localement comme backup
        let submissions = JSON.parse(localStorage.getItem('sichertech_submissions')) || [];
        submissions.push(formData);
        
        if (submissions.length > 50) {
            submissions = submissions.slice(-50);
        }
        
        localStorage.setItem('sichertech_submissions', JSON.stringify(submissions));
        console.log('✅ Saved to localStorage. Total:', submissions.length);
        
        // Sauvegarder dans Firebase si disponible
        if (window.firebaseDB && window.firebaseDB.isInitialized()) {
            try {
                const result = await window.firebaseDB.save(formData);
                console.log('✅ Saved to Firebase:', result.id);
                return { localStorage: true, firebase: true, id: result.id };
            } catch (firebaseError) {
                console.warn('Firebase save failed, but localStorage succeeded:', firebaseError);
                return { localStorage: true, firebase: false };
            }
        } else {
            console.warn('Firebase not available, using localStorage only');
            return { localStorage: true, firebase: false };
        }
    } catch (error) {
        console.error('Error saving form submission:', error);
        throw error;
    }
}

// ==========================================
// GET ALL FORM SUBMISSIONS
// ==========================================
function getAllSubmissions() {
    try {
        return JSON.parse(localStorage.getItem('sichertech_submissions')) || [];
    } catch (error) {
        console.error('Error retrieving submissions:', error);
        return [];
    }
}

// ==========================================
// EXPORT SUBMISSIONS TO CSV
// ==========================================
function exportSubmissionsToCSV() {
    const submissions = getAllSubmissions();
    
    if (submissions.length === 0) {
        showNotification('No submissions to export', 'error');
        return;
    }
    
    // CSV Headers
    const headers = ['Date', 'First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Timeline', 'Message', 'Newsletter'];
    
    // CSV Rows
    const rows = submissions.map(sub => [
        new Date(sub.submittedAt).toLocaleString(),
        sub.firstName,
        sub.lastName,
        sub.email,
        sub.phone,
        sub.company || 'N/A',
        sub.service,
        sub.budget,
        sub.timeline,
        `"${sub.message.replace(/"/g, '""')}"`,
        sub.newsletter ? 'Yes' : 'No'
    ]);
    
    // Create CSV content
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sichertech_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification(`Exported ${submissions.length} submissions successfully!`, 'success');
}

// ==========================================
// CLEAR ALL SUBMISSIONS (Admin function)
// ==========================================
function clearAllSubmissions() {
    if (confirm('Are you sure you want to clear all form submissions? This cannot be undone.')) {
        localStorage.removeItem('sichertech_submissions');
        showNotification('All submissions cleared', 'success');
        console.log('All submissions cleared');
    }
}

// Expose functions to console for admin use
window.sichertechAdmin = {
    getAllSubmissions,
    exportSubmissionsToCSV,
    clearAllSubmissions
};

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff00' : '#ff0000'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        color: inherit;
    }
`;
document.head.appendChild(style);

// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// ==========================================
// TYPING EFFECT FOR HERO SUBTITLE
// ==========================================
const heroSubtitle = document.querySelector('.hero-subtitle');

if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing after page load
    setTimeout(typeWriter, 500);
}

// ==========================================
// SERVICE CARDS TILT EFFECT
// ==========================================
const serviceCards = document.querySelectorAll('.service-card, .value-card, .mv-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================
// CURSOR TRAIL EFFECT (Optional - can be removed if too much)
// ==========================================
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(0, 255, 0, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateTrail = () => {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX - 10 + 'px';
        trail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
};

// Uncomment to enable cursor trail
// if (window.innerWidth > 768) {
//     createCursorTrail();
// }

// ==========================================
// LAZY LOADING FOR IMAGES
// ==========================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: var(--bg-dark);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
};

createBackToTopButton();

// ==========================================
// PRELOADER (Optional)
// ==========================================
const createPreloader = () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">
                <span style="font-weight: 800;">SICHER</span>
                <span style="color: var(--text-color);">TECH</span>
            </div>
            <div style="width: 50px; height: 50px; border: 3px solid rgba(0, 255, 0, 0.3); border-top-color: var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
    
    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
};

// Uncomment to enable preloader
// createPreloader();

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c🚀 Sicher Tech Portfolio', 'color: #00ff00; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped with ❤️ by Sicher Tech', 'color: #00ff00; font-size: 14px;');
console.log('%cWebsite: https://sichertech.com', 'color: #666; font-size: 12px;');

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
        }, 0);
    });
}

// ==========================================
// SERVICE WORKER REGISTRATION (PWA Support)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ==========================================
// INITIALIZE ALL FEATURES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ All scripts loaded successfully');
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});
