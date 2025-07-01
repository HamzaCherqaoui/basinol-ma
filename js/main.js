/**
 * BASINOL Website - Main JavaScript
 * French version
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize components
    initMobileMenu();
    initCookieNotice();

    // Add smooth scrolling to all links
    initSmoothScroll();
});

/**
 * BASINOL Website - Main JavaScript
 * French version - Elegant Apple-like Design
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize mobile menu
    initMobileMenu();

    // Initialize cookie notice
    initCookieNotice();

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize header scroll effect
    initHeaderScrollEffect();

    // Add any other initialization here
});

/**
 * Initialize Mobile Menu with elegant animation
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav__list');
    const header = document.querySelector('.header');
    const body = document.body;

    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function () {
            navList.classList.toggle('show');
            mobileMenuToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navList.classList.contains('show')) {
                body.style.overflow = 'hidden';
                // Add backdrop blur to header when menu is open
                header.style.backdropFilter = 'blur(20px)';
                header.style.webkitBackdropFilter = 'blur(20px)';
            } else {
                body.style.overflow = '';
                // Reset backdrop blur
                header.style.backdropFilter = '';
                header.style.webkitBackdropFilter = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navList.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navList.classList.remove('show');
                mobileMenuToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.header__nav') && !event.target.closest('.mobile-menu-toggle')) {
                if (navList.classList.contains('show')) {
                    navList.classList.remove('show');
                    mobileMenuToggle.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });
    }
}

/**
 * Initialize Cookie Notice with elegant animation
 */
function initCookieNotice() {
    const cookieNotice = document.getElementById('cookieNotice');
    const acceptCookiesBtn = document.getElementById('acceptCookies');

    // Check if cookie notice exists
    if (!cookieNotice || !acceptCookiesBtn) return;

    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Show cookie notice after a short delay with smooth animation
        setTimeout(() => {
            cookieNotice.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            cookieNotice.classList.add('show');
        }, 1500);

        // Handle accept button click with elegant animation
        acceptCookiesBtn.addEventListener('click', function () {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieNotice.style.transform = 'translateY(10px)';
            cookieNotice.style.opacity = '0';

            setTimeout(() => {
                cookieNotice.classList.remove('show');
                cookieNotice.style.transform = '';
                cookieNotice.style.opacity = '';
            }, 300);
        });
    }
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Smooth scroll with elegant easing
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.product-card, .category, .quality-content, .welcome__features, .feature, .hero__content'
    );

    if (!animatedElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with slight delay based on index
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, 100);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each element
    animatedElements.forEach(element => {
        // Add initial state class
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

/**
 * Initialize header scroll effect (transparent to solid)
 */
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow and background when scrolling down
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down & past threshold
            header.classList.add('header-hidden');
        } else {
            // Scrolling up or at top
            header.classList.remove('header-hidden');
        }

        lastScrollTop = scrollTop;
    });
}

/**
 * Helper function to check if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} - The debounced function
 */
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

/**
 * Utility function to check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Utility function to format date
 * @param {Date|string} date - Date object or date string
 * @param {string} locale - Locale string (e.g., 'fr-FR')
 * @returns {string} Formatted date string
 */
function formatDate(date, locale = 'fr-FR') {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Utility function to create a debounced function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
