/**
 * BASINOL Website - Hero Slider
 * French version - Elegant Apple-like Design
 */

document.addEventListener('DOMContentLoaded', function () {
    initHeroSlider();
});

/**
 * Initialize Hero Slider with elegant Apple-like animations
 */
function initHeroSlider() {
    const slider = document.querySelector('.hero__slider');

    if (!slider) return;

    const slides = slider.querySelectorAll('.hero__slide');
    const dots = slider.querySelectorAll('.hero__dot');
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false; // Flag to prevent animation interruption

    // Function to show a specific slide with refined animation
    function showSlide(index, direction = 'next') {
        // Skip if animation is in progress
        if (isAnimating) return;
        isAnimating = true;

        // Get current and next slides
        const currentSlideElement = slides[currentSlide];
        const nextSlideElement = slides[index];

        // Set initial state for the next slide based on direction
        if (direction === 'next') {
            nextSlideElement.style.opacity = '0';
            nextSlideElement.style.transform = 'scale(1.05)';
            nextSlideElement.style.zIndex = '1';
        } else {
            nextSlideElement.style.opacity = '0';
            nextSlideElement.style.transform = 'scale(0.95)';
            nextSlideElement.style.zIndex = '1';
        }

        // Hide content of current slide with animation
        if (currentSlideElement.querySelector('.hero__content')) {
            currentSlideElement.querySelector('.hero__content').style.opacity = '0';
            currentSlideElement.querySelector('.hero__content').style.transform = 'translateY(20px)';
        }

        // Show the next slide
        setTimeout(() => {
            // Deactivate all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            // Activate the corresponding dot
            if (dots[index]) {
                dots[index].classList.add('active');
            }

            // Make next slide visible with animation
            nextSlideElement.classList.add('active');
            currentSlideElement.classList.remove('active');

            // Show content of next slide with animation
            setTimeout(() => {
                if (nextSlideElement.querySelector('.hero__content')) {
                    nextSlideElement.querySelector('.hero__content').style.opacity = '1';
                    nextSlideElement.querySelector('.hero__content').style.transform = 'translateY(0)';
                }

                // Reset animation flag after animation completes
                setTimeout(() => {
                    isAnimating = false;
                }, 500);
            }, 300);

            // Update current slide index
            currentSlide = index;
        }, 100);
    }

    // Function to show the next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next, 'next');
    }

    // Function to show the previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev, 'prev');
    }

    // Start automatic slideshow with refined timing
    function startSlideshow() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }

        // Set new interval with longer duration for better user experience
        slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
    }

    // Pause slideshow on hover with subtle transition
    slider.addEventListener('mouseenter', function () {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    });

    // Resume slideshow on mouse leave
    slider.addEventListener('mouseleave', function () {
        startSlideshow();
    });

    // Add click event to dots with refined interaction
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            // Determine direction based on index
            const direction = index > currentSlide ? 'next' : 'prev';
            showSlide(index, direction);

            // Restart the slideshow timer when manually changing slides
            startSlideshow();
        });
    });

    // Add keyboard navigation with improved accessibility
    document.addEventListener('keydown', function (e) {
        // Only handle keyboard navigation if the slider is in the viewport
        if (isInViewport(slider)) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                startSlideshow();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                startSlideshow();
            }
        }
    });

    // Add swipe support for touch devices with improved sensitivity
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    slider.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    slider.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 40; // Lower threshold for more responsive swipes
        const verticalThreshold = 80; // Threshold to detect vertical scrolling

        // Calculate horizontal and vertical distance
        const horizontalDistance = touchEndX - touchStartX;
        const verticalDistance = Math.abs(touchEndY - touchStartY);

        // Only process horizontal swipes (ignore vertical scrolling)
        if (verticalDistance < verticalThreshold) {
            if (horizontalDistance < -swipeThreshold) {
                // Swipe left, show next slide
                nextSlide();
                startSlideshow();
            } else if (horizontalDistance > swipeThreshold) {
                // Swipe right, show previous slide
                prevSlide();
                startSlideshow();
            }
        }
    }

    // Add navigation arrows for better UX
    const createNavArrows = () => {
        const prevArrow = document.createElement('button');
        prevArrow.className = 'hero__nav hero__nav--prev';
        prevArrow.setAttribute('aria-label', 'Diapositive précédente');
        prevArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';

        const nextArrow = document.createElement('button');
        nextArrow.className = 'hero__nav hero__nav--next';
        nextArrow.setAttribute('aria-label', 'Diapositive suivante');
        nextArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

        slider.appendChild(prevArrow);
        slider.appendChild(nextArrow);

        prevArrow.addEventListener('click', function () {
            prevSlide();
            startSlideshow();
        });

        nextArrow.addEventListener('click', function () {
            nextSlide();
            startSlideshow();
        });
    };

    // Create navigation arrows
    createNavArrows();

    // Initialize the slider with first slide
    slides[0].classList.add('active');
    dots[0].classList.add('active');

    // Show content of first slide with animation
    setTimeout(() => {
        if (slides[0].querySelector('.hero__content')) {
            slides[0].querySelector('.hero__content').style.opacity = '1';
            slides[0].querySelector('.hero__content').style.transform = 'translateY(0)';
        }
    }, 300);

    // Start slideshow
    startSlideshow();

    // Add resize handler to ensure proper layout with debounce for performance
    window.addEventListener('resize', debounce(function () {
        // Recalculate slider dimensions if needed
        const currentSlideElement = slides[currentSlide];
        if (currentSlideElement) {
            // Ensure proper sizing and positioning
            currentSlideElement.classList.add('active');
        }
    }, 150)); // Reduced debounce time for more responsive resizing
}
