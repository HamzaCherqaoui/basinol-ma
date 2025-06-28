/**
 * BASINOL Website - Language Switcher
 * French version
 */

document.addEventListener('DOMContentLoaded', function () {
    initLanguageSwitcher();
});

/**
 * Initialize Language Switcher
 * Note: This is a simplified version that demonstrates the UI interaction.
 * In a real implementation, this would load different language files or redirect to localized versions.
 */
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    if (langButtons.length === 0) return;

    // Get stored language preference or default to French
    const currentLang = localStorage.getItem('language') || 'fr';

    // Set active state based on stored preference
    langButtons.forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        if (lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Add click event to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');

            // Skip if already active
            if (this.classList.contains('active')) return;

            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Store language preference
            localStorage.setItem('language', lang);

            // In a real implementation, we would either:
            // 1. Redirect to the localized version of the current page
            // 2. Load and apply translations dynamically

            // For this demo, we'll simulate a page reload with a notification
            const currentPage = window.location.pathname;

            // Determine the equivalent page in the other language
            let targetPage;

            if (lang === 'en') {
                // French to English mapping
                // This would be more sophisticated in a real implementation
                targetPage = currentPage.replace('.html', '-en.html');

                // Show notification about redirection
                alert('Switching to English version. In a real implementation, this would redirect to the English version of the current page.');

                // Simulate page reload (in a real implementation, this would be a redirect)
                // window.location.href = targetPage;
                console.log('Would redirect to:', targetPage);
            } else {
                // For demo purposes, just reload the current page when switching back to French
                // In a real implementation, this would redirect to the French version

                // Show notification about redirection
                alert('Switching to French version. In a real implementation, this would redirect to the French version of the current page.');

                // Simulate page reload
                // window.location.reload();
                console.log('Would reload current page or redirect to French version');
            }
        });
    });
}

/**
 * Get text translation
 * Note: In a real implementation, this would load translations from a JSON file
 * @param {string} key - Translation key
 * @param {string} lang - Language code
 * @returns {string} Translated text
 */
function getTranslation(key, lang = 'fr') {
    // This is a simplified example with just a few translations
    const translations = {
        'fr': {
            'home': 'Accueil',
            'company': 'Entreprise',
            'products': 'Produits',
            'partners': 'Partenaires de vente',
            'news': 'Actualités',
            'contact': 'Contactez-nous',
            'discover': 'Découvrir maintenant',
            'learn_more': 'En savoir plus',
            'explore': 'Explorer'
        },
        'en': {
            'home': 'Home',
            'company': 'Company',
            'products': 'Products',
            'partners': 'Sales Partners',
            'news': 'News',
            'contact': 'Contact us',
            'discover': 'Discover now',
            'learn_more': 'Learn more',
            'explore': 'Explore'
        }
    };

    // Return the translation or the key if not found
    return (translations[lang] && translations[lang][key]) || key;
}
