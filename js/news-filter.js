/**
 * BASINOL Website - News Filter
 * French version
 */

document.addEventListener('DOMContentLoaded', function () {
    initNewsFilter();
});

/**
 * Initialize News Filter
 */
function initNewsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    if (filterButtons.length === 0 || newsItems.length === 0) return;

    // Add click event to filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Skip if already active
            if (this.classList.contains('active')) return;

            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter news items
            filterNewsItems(filter);
        });
    });

    /**
     * Filter news items by category
     * @param {string} filter - Category filter
     */
    function filterNewsItems(filter) {
        // If 'all' is selected, show all items
        if (filter === 'all') {
            newsItems.forEach(item => {
                showItem(item);
            });
            return;
        }

        // Filter items by category
        newsItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (category === filter) {
                showItem(item);
            } else {
                hideItem(item);
            }
        });

        // Check if any items are visible
        const visibleItems = document.querySelectorAll('.news-item:not(.hidden)');
        if (visibleItems.length === 0) {
            // If no items match the filter, show a message
            showNoResultsMessage(filter);
        } else {
            // Hide any existing no results message
            hideNoResultsMessage();
        }
    }

    /**
     * Show a news item with animation
     * @param {Element} item - News item element
     */
    function showItem(item) {
        // Remove hidden class if it exists
        if (item.classList.contains('hidden')) {
            item.classList.remove('hidden');

            // Add fade-in animation
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 10);
        }
    }

    /**
     * Hide a news item with animation
     * @param {Element} item - News item element
     */
    function hideItem(item) {
        // Add hidden class
        item.classList.add('hidden');
        item.style.opacity = '0';
    }

    /**
     * Show a message when no results are found
     * @param {string} filter - Current filter
     */
    function showNoResultsMessage(filter) {
        // Remove any existing message
        hideNoResultsMessage();

        // Create and show new message
        const newsContainer = document.querySelector('.news-items');
        if (newsContainer) {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.textContent = `Aucun résultat trouvé pour la catégorie "${filter}".`;

            newsContainer.appendChild(message);
        }
    }

    /**
     * Hide the no results message
     */
    function hideNoResultsMessage() {
        const message = document.querySelector('.no-results-message');
        if (message) {
            message.remove();
        }
    }

    // Add CSS for hidden items and no results message
    addFilterStyles();
}

/**
 * Add required CSS styles for filtering
 */
function addFilterStyles() {
    // Check if styles already exist
    if (document.getElementById('news-filter-styles')) return;

    // Create style element
    const style = document.createElement('style');
    style.id = 'news-filter-styles';

    // Add CSS rules
    style.textContent = `
        .news-item.hidden {
            display: none;
        }
        
        .no-results-message {
            text-align: center;
            padding: 2rem;
            background-color: #f5f5f5;
            border-radius: 5px;
            margin: 2rem 0;
            font-style: italic;
            color: #666;
        }
    `;

    // Add to document head
    document.head.appendChild(style);
}
