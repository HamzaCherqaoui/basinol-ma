/**
 * BASINOL Website - Hero Slider
 * French version
 */

document.addEventListener('DOMContentLoaded', function () {
    initHeroSlider();
});

/**
 * Initialize Hero Slider
 */
function initHeroSlider() {
    const slider = document.querySelector('.hero__slider');

    if (!slider) return;

    const slides = slider.querySelectorAll('.hero__slide');
    const dots = slider.querySelectorAll('.hero__dot');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the selected slide and activate corresponding dot
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        // Update current slide index
        currentSlide = index;
    }

    // Function to show the next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }

    // Function to show the previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }

    // Start automatic slideshow
    function startSlideshow() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }

        // Set new interval
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Pause slideshow on hover
    slider.addEventListener('mouseenter', function () {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    });

    // Resume slideshow on mouse leave
    slider.addEventListener('mouseleave', function () {
        startSlideshow();
    });

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
            // Restart the slideshow timer when manually changing slides
            startSlideshow();
        });
    });

    // Add keyboard navigation
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

    // Add swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe

        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, show next slide
            nextSlide();
            startSlideshow();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, show previous slide
            prevSlide();
            startSlideshow();
        }
    }

    // Initialize the slider
    showSlide(0);
    startSlideshow();

    // Add resize handler to ensure proper layout
    window.addEventListener('resize', debounce(function () {
        // Recalculate slider dimensions if needed
        showSlide(currentSlide);
    }, 250));
}
