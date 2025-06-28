/**
 * BASINOL Website - Partners Map
 * French version
 */

document.addEventListener('DOMContentLoaded', function () {
    initPartnersMap();
    initRegionFilter();
});

/**
 * Initialize Partners Map
 */
function initPartnersMap() {
    const mapPoints = document.querySelectorAll('.map-point');

    if (mapPoints.length === 0) return;

    // Add hover effect and click functionality to map points
    mapPoints.forEach(point => {
        const region = point.getAttribute('data-region');

        // Add hover effect
        point.addEventListener('mouseenter', function () {
            highlightRegion(region);
        });

        point.addEventListener('mouseleave', function () {
            resetHighlight();
        });

        // Add click functionality
        point.addEventListener('click', function () {
            filterByRegion(region);
        });
    });
}

/**
 * Initialize Region Filter
 */
function initRegionFilter() {
    const regionButtons = document.querySelectorAll('.region-btn');
    const regionContents = document.querySelectorAll('.region-content');

    if (regionButtons.length === 0) return;

    // Add click event to region buttons
    regionButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const region = this.getAttribute('data-region');

            // Skip if already active
            if (this.classList.contains('active')) return;

            // Update active state for buttons
            regionButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter partners by region
            filterByRegion(region);
        });
    });

    // Function to filter partners by region
    function filterByRegion(region) {
        // If 'all' is selected, show all regions
        if (region === 'all') {
            // Show only the first region content by default
            regionContents.forEach((content, index) => {
                if (index === 0) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
            return;
        }

        // Hide all region contents
        regionContents.forEach(content => {
            content.classList.remove('active');
        });

        // Show the selected region content
        const selectedContent = document.getElementById(region);
        if (selectedContent) {
            selectedContent.classList.add('active');

            // Scroll to the content
            selectedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Highlight the region on the map
        highlightRegion(region);
    }
}

/**
 * Highlight a region on the map
 * @param {string} region - Region identifier
 */
function highlightRegion(region) {
    // Skip for 'all' region
    if (region === 'all') return;

    const mapPoints = document.querySelectorAll('.map-point');

    // Dim all points
    mapPoints.forEach(point => {
        const pointMarker = point.querySelector('.point-marker');
        if (pointMarker) {
            pointMarker.style.opacity = '0.3';
        }
    });

    // Highlight the selected region
    const selectedPoint = document.querySelector(`.map-point[data-region="${region}"]`);
    if (selectedPoint) {
        const pointMarker = selectedPoint.querySelector('.point-marker');
        if (pointMarker) {
            pointMarker.style.opacity = '1';
            pointMarker.style.transform = 'scale(1.2)';
        }
    }
}

/**
 * Reset map highlights
 */
function resetHighlight() {
    const mapPoints = document.querySelectorAll('.map-point');

    // Reset all points
    mapPoints.forEach(point => {
        const pointMarker = point.querySelector('.point-marker');
        if (pointMarker) {
            pointMarker.style.opacity = '1';
            pointMarker.style.transform = '';
        }
    });
}
