/**
 * BASINOL Website - Cookie Manager
 * Comprehensive cookie management system
 */

// Cookie types and their default settings
const COOKIE_TYPES = {
    essential: {
        name: 'Essential',
        description: 'Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.',
        required: true,
        default: true
    },
    analytics: {
        name: 'Analytiques',
        description: 'Ces cookies nous permettent d\'analyser l\'utilisation du site pour mesurer et améliorer ses performances.',
        required: false,
        default: true
    },
    marketing: {
        name: 'Marketing',
        description: 'Ces cookies sont utilisés pour suivre les visiteurs sur les sites Web. L\'intention est d\'afficher des publicités pertinentes et engageantes pour l\'utilisateur.',
        required: false,
        default: false
    }
};

// Cookie Manager Class
class CookieManager {
    constructor() {
        this.cookiePreferences = {};
        this.initPreferences();
    }

    // Initialize cookie preferences
    initPreferences() {
        // Check if preferences are already set
        const savedPreferences = this.getCookie('cookiePreferences');

        if (savedPreferences) {
            try {
                this.cookiePreferences = JSON.parse(savedPreferences);
            } catch (e) {
                console.error('Error parsing cookie preferences:', e);
                this.resetToDefaults();
            }
        } else {
            this.resetToDefaults();
        }
    }

    // Reset preferences to defaults
    resetToDefaults() {
        this.cookiePreferences = {};

        // Set default values
        Object.keys(COOKIE_TYPES).forEach(type => {
            this.cookiePreferences[type] = COOKIE_TYPES[type].default;
        });
    }

    // Save current preferences
    savePreferences() {
        // Always enable required cookies
        Object.keys(COOKIE_TYPES).forEach(type => {
            if (COOKIE_TYPES[type].required) {
                this.cookiePreferences[type] = true;
            }
        });

        // Save to cookie
        this.setCookie('cookiePreferences', JSON.stringify(this.cookiePreferences), 365);
        this.setCookie('cookiesAccepted', 'true', 365);

        // Apply preferences
        this.applyPreferences();
    }

    // Apply current preferences (set or remove cookies based on preferences)
    applyPreferences() {
        // Essential cookies - always set
        if (this.cookiePreferences.essential) {
            this.setCookie('sessionCookie', this.generateSessionId(), 1);
        }

        // Analytics cookies
        if (this.cookiePreferences.analytics) {
            this.setCookie('analyticsEnabled', 'true', 365);
            // Here you would initialize your analytics service
        } else {
            this.eraseCookie('analyticsEnabled');
            // Here you would disable your analytics service
        }

        // Marketing cookies
        if (this.cookiePreferences.marketing) {
            this.setCookie('marketingEnabled', 'true', 365);
            // Here you would initialize marketing/advertising services
        } else {
            this.eraseCookie('marketingEnabled');
            // Here you would disable marketing/advertising services
        }
    }

    // Check if cookies have been accepted
    hasAcceptedCookies() {
        return !!this.getCookie('cookiesAccepted');
    }

    // Accept all cookies
    acceptAllCookies() {
        Object.keys(COOKIE_TYPES).forEach(type => {
            this.cookiePreferences[type] = true;
        });
        this.savePreferences();
    }

    // Accept only essential cookies
    acceptEssentialCookies() {
        Object.keys(COOKIE_TYPES).forEach(type => {
            this.cookiePreferences[type] = COOKIE_TYPES[type].required;
        });
        this.savePreferences();
    }

    // Update a specific cookie preference
    updatePreference(type, value) {
        if (COOKIE_TYPES[type]) {
            // Can't disable required cookies
            if (COOKIE_TYPES[type].required) {
                this.cookiePreferences[type] = true;
            } else {
                this.cookiePreferences[type] = !!value;
            }
        }
    }

    // Get current preferences
    getPreferences() {
        return { ...this.cookiePreferences };
    }

    // Cookie utility functions
    setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
    }

    getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }
}

// Create and export cookie manager instance
const cookieManager = new CookieManager();

// Initialize cookie notice
document.addEventListener('DOMContentLoaded', function () {
    const cookieNotice = document.getElementById('cookieNotice');
    const acceptCookiesBtn = document.getElementById('acceptCookies');

    // Check if cookie notice exists
    if (!cookieNotice || !acceptCookiesBtn) return;

    // Check if user has already accepted cookies
    if (!cookieManager.hasAcceptedCookies()) {
        // Show cookie notice
        cookieNotice.classList.add('show');
        cookieNotice.style.display = 'block';

        // Handle accept button click
        acceptCookiesBtn.addEventListener('click', function () {
            // Accept all cookies
            cookieManager.acceptAllCookies();

            // Add the hiding class to trigger the slide down animation
            cookieNotice.classList.add('hiding');

            // Remove the element after the animation completes
            setTimeout(() => {
                cookieNotice.classList.remove('show');
                cookieNotice.classList.remove('hiding');
                cookieNotice.style.display = 'none';
            }, 500);
        });
    }
});

// Make cookieManager available globally
window.cookieManager = cookieManager;
