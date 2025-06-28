/**
 * BASINOL Website - FAQ Accordion
 * French version
 */

document.addEventListener('DOMContentLoaded', function () {
    initFaqAccordion();
});

/**
 * Initialize FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    // Add click event to FAQ questions
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function () {
                // Toggle active class on the FAQ item
                item.classList.toggle('active');

                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });

    // Add keyboard accessibility
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            // Add tabindex to make the question focusable
            question.setAttribute('tabindex', '0');

            // Add keyboard event listener
            question.addEventListener('keydown', function (e) {
                // Activate on Enter or Space
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        }
    });

    // Open first FAQ item by default
    if (faqItems.length > 0 && !faqItems[0].classList.contains('active')) {
        faqItems[0].classList.add('active');
    }

    // Add URL hash support
    handleUrlHash();

    // Listen for hash changes
    window.addEventListener('hashchange', handleUrlHash);
}

/**
 * Handle URL hash for direct linking to FAQ items
 */
function handleUrlHash() {
    const hash = window.location.hash;

    if (hash && hash.startsWith('#faq-')) {
        // Extract the FAQ ID from the hash
        const faqId = hash.substring(1); // Remove the # character

        // Find the FAQ item with the matching ID
        const faqItem = document.getElementById(faqId);

        if (faqItem && faqItem.classList.contains('faq-item')) {
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open the target FAQ item
            faqItem.classList.add('active');

            // Scroll to the FAQ item
            setTimeout(() => {
                faqItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

/**
 * Add IDs to FAQ items for direct linking
 * This is called automatically when the page loads
 */
function addFaqIds() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item, index) => {
        // Add ID if it doesn't have one
        if (!item.id) {
            item.id = `faq-${index + 1}`;
        }

        // Add aria attributes for accessibility
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            const questionId = `question-${index + 1}`;
            const answerId = `answer-${index + 1}`;

            question.id = questionId;
            answer.id = answerId;

            question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
            question.setAttribute('aria-controls', answerId);

            answer.setAttribute('aria-labelledby', questionId);
            answer.setAttribute('role', 'region');
        }
    });
}

// Initialize FAQ IDs and ARIA attributes
document.addEventListener('DOMContentLoaded', function () {
    addFaqIds();
});
