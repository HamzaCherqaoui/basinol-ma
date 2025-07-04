/**
 * Lazy Loading Script for BASINOL Website
 * Provides fallback lazy loading for browsers that don't support native lazy loading
 */

document.addEventListener('DOMContentLoaded', function () {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading, nothing to do
        console.log('Browser supports native lazy loading');
    } else {
        // Browser doesn't support native lazy loading, use IntersectionObserver
        console.log('Browser does not support native lazy loading, using IntersectionObserver');

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Find parent picture element if it exists
                    const picture = img.closest('picture');

                    if (picture) {
                        // Handle all source elements in the picture
                        const sources = picture.querySelectorAll('source');
                        sources.forEach(function (source) {
                            if (source.dataset.srcset) {
                                source.srcset = source.dataset.srcset;
                                delete source.dataset.srcset;
                            }
                        });
                    }

                    // Handle the img element
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        delete img.dataset.src;
                    }

                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px', // Start loading when image is 200px from viewport
            threshold: 0.01
        });

        lazyImages.forEach(function (img) {
            // Convert loading="lazy" to data attributes for our custom implementation
            if (img.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }

            // Find parent picture element if it exists
            const picture = img.closest('picture');
            if (picture) {
                const sources = picture.querySelectorAll('source');
                sources.forEach(function (source) {
                    if (source.srcset) {
                        source.dataset.srcset = source.srcset;
                        source.srcset = '';
                    }
                });
            }

            imageObserver.observe(img);
        });
    }
});
