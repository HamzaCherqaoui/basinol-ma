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

/* This function has been moved to the bottom of the file */

/**
 * Cookie management functions
 */
// Set a cookie with name, value and expiration days
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
}

// Get a cookie by name
function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Delete a cookie by name
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 * Initialize Cookie Notice with elegant animation and actual cookie functionality
 */
function initCookieNotice() {
    const cookieNotice = document.getElementById('cookieNotice');
    const acceptCookiesBtn = document.getElementById('acceptCookies');

    // Check if cookie notice exists
    if (!cookieNotice || !acceptCookiesBtn) return;

    // Check if user has already accepted cookies
    if (!getCookie('cookiesAccepted')) {
        // Show cookie notice immediately
        cookieNotice.classList.add('show');
        cookieNotice.style.display = 'block';

        // Handle accept button click with slide down animation
        acceptCookiesBtn.addEventListener('click', function () {
            // Set cookies with 365 days expiration
            setCookie('cookiesAccepted', 'true', 365);

            // Set essential cookies
            setCookie('sessionCookie', generateSessionId(), 1);

            // Set analytics cookies if needed
            setCookie('analyticsEnabled', 'true', 365);

            // Also store in localStorage for backward compatibility
            localStorage.setItem('cookiesAccepted', 'true');

            // Add the hiding class to trigger the slide down animation
            cookieNotice.classList.add('hiding');

            // Remove the element after the animation completes
            setTimeout(() => {
                cookieNotice.classList.remove('show');
                cookieNotice.classList.remove('hiding');
                cookieNotice.style.display = 'none';
            }, 500); // Match this with the CSS transition duration
        });
    }
}

/**
 * Generate a random session ID
 * @returns {string} Random session ID
 */
function generateSessionId() {
    return 'session_' + Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
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
 * Initialize Mobile Menu with Apple-like animation
 */
function initMobileMenu() {
    // Get DOM elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav__list');
    const body = document.body;

    // Check if elements exist
    if (!mobileMenuToggle || !navList) return;

    // Create overlay element
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(menuOverlay);

    // Get dropdown items
    const dropdownItems = document.querySelectorAll('.nav__item.has-dropdown');

    // Variable to track menu state
    let menuOpen = false;

    // Toggle menu function
    function toggleMenu() {
        menuOpen = !menuOpen;

        if (menuOpen) {
            // Force reflow for animation restart
            navList.classList.add('animating');
            void navList.offsetWidth; // triggers reflow

            // Get header height to position the menu correctly
            const headerHeight = document.querySelector('.header').offsetHeight;
            navList.style.top = headerHeight + 'px';

            // Show menu with Apple-like animation
            navList.classList.add('show');
            mobileMenuToggle.classList.add('active');
            menuOverlay.classList.add('show');

            // Prevent body scrolling but allow menu scrolling
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';

            // Animate nav items with staggered delay
            const navItems = navList.querySelectorAll('.nav__item');
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100 + (index * 50));
            });
        } else {
            // Hide menu with reverse animation
            navList.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
            menuOverlay.classList.remove('show');

            // Reset body styles
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';

            // Reset nav items
            const navItems = navList.querySelectorAll('.nav__item');
            navItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });

            // Close dropdowns and reset their state
            dropdownItems.forEach(item => {
                item.classList.remove('active');
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) dropdown.style.display = 'none';
            });

            // Reset all dropdown sections and click states
            const dropdownSections = document.querySelectorAll('.dropdown-section');
            dropdownSections.forEach(section => {
                section.classList.remove('active');
                const title = section.querySelector('.dropdown-title');
                if (title && clickedTitles) {
                    clickedTitles.delete(title);
                }
            });
        }
    }

    // Add event listener to menu toggle button
    mobileMenuToggle.addEventListener('click', function (e) {
        e.preventDefault();
        toggleMenu();
    });

    // Handle dropdown menus
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        const dropdown = item.querySelector('.dropdown');

        if (link && dropdown) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    const isOpen = item.classList.contains('active');

                    if (!isOpen) {
                        e.preventDefault(); // First click: just open
                        // Close other dropdowns
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active')) {
                                otherItem.classList.remove('active');
                                const otherDropdown = otherItem.querySelector('.dropdown');
                                if (otherDropdown) otherDropdown.style.display = 'none';
                            }
                        });
                        // Open current with smooth animation
                        item.classList.add('active');
                        dropdown.style.display = 'block';

                        // Animate dropdown items
                        setTimeout(() => {
                            const dropdownLinks = dropdown.querySelectorAll('.dropdown-link');
                            dropdownLinks.forEach((link, index) => {
                                link.style.opacity = '0';
                                link.style.transform = 'translateY(10px)';

                                setTimeout(() => {
                                    link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                                    link.style.opacity = '1';
                                    link.style.transform = 'translateY(0)';
                                }, 50 + (index * 30));
                            });
                        }, 50);
                    }
                    // If already open, let it navigate normally (no preventDefault)
                }
            });
        }
    });

    // Handle nested dropdowns (subcategories)
    const dropdownTitles = document.querySelectorAll('.dropdown-title');

    // Track which titles have been clicked once
    const clickedTitles = new Set();

    dropdownTitles.forEach(title => {
        // Find the parent dropdown section
        const section = title.closest('.dropdown-section');
        // Find the dropdown list (subcategories)
        const list = section ? section.querySelector('.dropdown-list') : null;

        if (section && list) {
            // Add click event to toggle subcategories
            title.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    // Always prevent default navigation on first click
                    e.preventDefault();

                    // Check if this title has been clicked before
                    const hasBeenClicked = clickedTitles.has(title);

                    // First click behavior: expand the dropdown
                    if (!hasBeenClicked) {
                        // Close all other open sections first
                        const parentDropdown = section.closest('.dropdown');
                        if (parentDropdown) {
                            const allSections = parentDropdown.querySelectorAll('.dropdown-section');
                            allSections.forEach(otherSection => {
                                if (otherSection !== section) {
                                    otherSection.classList.remove('active');
                                    // Also remove any clicked titles that aren't this one
                                    const otherTitle = otherSection.querySelector('.dropdown-title');
                                    if (otherTitle) {
                                        clickedTitles.delete(otherTitle);
                                    }
                                }
                            });
                        }

                        // Toggle this section
                        section.classList.add('active');
                        clickedTitles.add(title);

                        // Ensure the expanded content is visible
                        setTimeout(() => {
                            const sectionRect = section.getBoundingClientRect();
                            const sectionBottom = sectionRect.bottom;
                            const viewportHeight = window.innerHeight;

                            if (sectionBottom > viewportHeight) {
                                section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                        }, 100);
                    }
                    // Second click behavior: navigate to the page
                    else {
                        const href = title.getAttribute('href');
                        if (href && href !== '#') {
                            // Remove from clicked set before navigating
                            clickedTitles.delete(title);
                            window.location.href = href;
                        } else {
                            // If no href, just toggle the section
                            section.classList.toggle('active');
                            clickedTitles.delete(title);
                        }
                    }
                }
            });
        }
    });

    // Handle link clicks - simple navigation without delays
    const regularLinks = navList.querySelectorAll('.nav__link:not(.has-dropdown > .nav__link)');
    regularLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768 && !link.parentElement.classList.contains('has-dropdown')) {
                // For anchor links or javascript links, just toggle the menu
                if (this.getAttribute('href').indexOf('#') === 0 || this.getAttribute('href').indexOf('javascript:') === 0) {
                    toggleMenu();
                }
                // For regular links, let the default navigation happen
                // No preventDefault() means the browser will navigate normally
                menuOpen = false;
            }
        });
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function () {
        if (menuOpen) {
            menuOpen = false; // Set this first to avoid potential race conditions

            // Hide menu with reverse animation
            navList.classList.remove('show');
            mobileMenuToggle.classList.remove('active');
            menuOverlay.classList.remove('show');

            // Reset body styles
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';

            // Reset nav items
            const navItems = navList.querySelectorAll('.nav__item');
            navItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });

            // Close dropdowns and reset click states
            dropdownItems.forEach(item => {
                item.classList.remove('active');
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.style.display = 'none';
                    // Reset all section click states within this dropdown
                    const sections = dropdown.querySelectorAll('.dropdown-section');
                    sections.forEach(section => {
                        section.classList.remove('active');
                        const title = section.querySelector('.dropdown-title');
                        if (title && clickedTitles) {
                            clickedTitles.delete(title);
                        }
                    });
                }
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navList.classList.contains('show')) {
            toggleMenu();
        }
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
