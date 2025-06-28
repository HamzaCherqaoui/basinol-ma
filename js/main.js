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
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav__list');

    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navList.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.header__nav') && navList.classList.contains('show')) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('show');
            }
        });

        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && navList.classList.contains('show')) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('show');
            }
        });
    }
}

/**
 * Cookie Notice
 */
function initCookieNotice() {
    const cookieNotice = document.getElementById('cookieNotice');
    const acceptCookiesBtn = document.getElementById('acceptCookies');

    if (cookieNotice && acceptCookiesBtn) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            // Show cookie notice with a slight delay
            setTimeout(function () {
                cookieNotice.classList.add('show');
            }, 1000);

            // Handle accept button click
            acceptCookiesBtn.addEventListener('click', function () {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieNotice.classList.remove('show');
            });
        }
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Get header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
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
