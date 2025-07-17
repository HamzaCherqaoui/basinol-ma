/**
 * BASINOL Website - Google Analytics Integration
 * Loads and configures Google Analytics based on user cookie preferences
 */

// Google Analytics Measurement ID - Replace with your actual GA ID
const GA_MEASUREMENT_ID = 'G-6VR9376KCE'; // Replace with your actual Google Analytics ID (e.g., G-ABCDEF1234)

// Analytics Manager Class
class AnalyticsManager {
    constructor() {
        this.initialized = false;
        this.checkAndInitialize();
    }

    // Check cookie preferences and initialize if allowed
    checkAndInitialize() {
        // Wait for cookie manager to be available
        if (typeof window.cookieManager === 'undefined') {
            setTimeout(() => this.checkAndInitialize(), 100);
            return;
        }

        // Check if analytics cookies are accepted
        const preferences = window.cookieManager.getPreferences();
        if (preferences.analytics) {
            this.initialize();
        }
    }

    // Initialize Google Analytics
    initialize() {
        if (this.initialized) return;

        // Load Google Analytics script
        this.loadGoogleAnalytics();
        this.initialized = true;
    }

    // Load Google Analytics script
    loadGoogleAnalytics() {
        // Add Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('js', new Date());

        // Configure with respect to cookie consent
        gtag('config', GA_MEASUREMENT_ID, {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure',
            'cookie_expires': 365 * 24 * 60 * 60 // 1 year in seconds
        });

        // Make gtag available globally
        window.gtag = gtag;

        console.log('Google Analytics initialized');
    }

    // Track page view
    trackPageView(path) {
        if (!this.initialized || typeof window.gtag === 'undefined') return;

        const pagePath = path || window.location.pathname;
        window.gtag('event', 'page_view', {
            page_path: pagePath
        });
    }

    // Track custom event
    trackEvent(eventName, parameters = {}) {
        if (!this.initialized || typeof window.gtag === 'undefined') return;

        window.gtag('event', eventName, parameters);
    }

    // Disable analytics
    disable() {
        // Disable tracking
        if (typeof window.gtag !== 'undefined') {
            window.gtag('config', GA_MEASUREMENT_ID, {
                'send_page_view': false
            });
        }

        // Remove cookies
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.indexOf('_ga') === 0 || cookie.indexOf('_gid') === 0 || cookie.indexOf('_gat') === 0) {
                document.cookie = cookie.split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            }
        }

        this.initialized = false;
        console.log('Google Analytics disabled');
    }
}

// Create analytics manager instance
const analyticsManager = new AnalyticsManager();

// Listen for cookie preference changes
document.addEventListener('DOMContentLoaded', function () {
    // Wait for cookie manager to be available
    function checkCookieManager() {
        if (typeof window.cookieManager !== 'undefined') {
            // Extend the applyPreferences method to handle analytics
            const originalApplyPreferences = window.cookieManager.applyPreferences;
            window.cookieManager.applyPreferences = function () {
                // Call the original method
                originalApplyPreferences.call(this);

                // Handle analytics based on preferences
                if (this.cookiePreferences.analytics) {
                    if (!analyticsManager.initialized) {
                        analyticsManager.initialize();
                    }
                } else {
                    if (analyticsManager.initialized) {
                        analyticsManager.disable();
                    }
                }
            };
        } else {
            setTimeout(checkCookieManager, 100);
        }
    }

    checkCookieManager();
});

// Track initial page view when analytics are enabled
window.addEventListener('load', function () {
    if (analyticsManager.initialized) {
        analyticsManager.trackPageView();
    }
});

// Make analytics manager available globally
window.analyticsManager = analyticsManager;
