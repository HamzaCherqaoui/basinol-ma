/**
 * BASINOL Website - Hero Slider
 * Minimalist Apple-like Design
 */

document.addEventListener('DOMContentLoaded', function () {
    initHeroSlider();
});

/**
 * Initialize Hero Slider with minimalist Apple-like animations
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
    function showSlide(index) {
        // Skip if animation is in progress
        if (isAnimating) return;
        isAnimating = true;

        // Get current and next slides
        const currentSlideElement = slides[currentSlide];
        const nextSlideElement = slides[index];

        // Check if we're wrapping around from last to first slide
        const isWrappingAround = (currentSlide === slides.length - 1 && index === 0);

        // Handle wrap-around case specially
        if (isWrappingAround) {
            // Immediately hide all other slides except current and next
            slides.forEach((slide, i) => {
                if (i !== currentSlide && i !== index) {
                    slide.style.opacity = '0';
                    slide.style.zIndex = '0';
                    slide.style.display = 'none';
                    slide.classList.remove('active');
                }
            });

            // Set initial state for the first slide
            nextSlideElement.style.display = 'flex';
            nextSlideElement.style.opacity = '0';
            nextSlideElement.style.zIndex = '1';

            // Hide content of current slide with subtle animation
            if (currentSlideElement.querySelector('.hero__content')) {
                currentSlideElement.querySelector('.hero__content').style.opacity = '0';
            }

            // Fade out current slide first
            currentSlideElement.style.opacity = '0';

            // Then show the first slide after a short delay
            setTimeout(() => {
                // Update dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                    dot.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                    dot.style.transform = 'scale(1)';
                });

                if (dots[index]) {
                    dots[index].classList.add('active');
                    dots[index].style.backgroundColor = '#ffffff';
                    dots[index].style.transform = 'scale(1.2)';
                }

                // Make first slide visible
                nextSlideElement.classList.add('active');
                currentSlideElement.classList.remove('active');
                nextSlideElement.style.opacity = '1';

                // Show content of first slide
                setTimeout(() => {
                    if (nextSlideElement.querySelector('.hero__content')) {
                        nextSlideElement.querySelector('.hero__content').style.opacity = '1';
                    }

                    // Reset animation flag
                    setTimeout(() => {
                        isAnimating = false;
                    }, 300);
                }, 200);

                // Update current slide index
                currentSlide = index;
            }, 400); // Longer delay for wrap-around transition
        } else {
            // Normal transition between adjacent slides

            // Reset all slides first
            slides.forEach(slide => {
                if (slide !== currentSlideElement && slide !== nextSlideElement) {
                    slide.style.opacity = '0';
                    slide.style.zIndex = '0';
                    slide.classList.remove('active');
                }
            });

            // Set initial state for the next slide
            nextSlideElement.style.display = 'flex'; // Ensure it's visible
            nextSlideElement.style.opacity = '0';
            nextSlideElement.style.zIndex = '1';

            // Hide content of current slide with subtle animation
            if (currentSlideElement.querySelector('.hero__content')) {
                currentSlideElement.querySelector('.hero__content').style.opacity = '0';
            }

            // Show the next slide
            setTimeout(() => {
                // Deactivate all dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                    dot.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                    dot.style.transform = 'scale(1)';
                });

                // Activate the corresponding dot
                if (dots[index]) {
                    dots[index].classList.add('active');
                    dots[index].style.backgroundColor = '#ffffff';
                    dots[index].style.transform = 'scale(1.2)';
                }

                // Make next slide visible with subtle animation
                nextSlideElement.classList.add('active');
                currentSlideElement.classList.remove('active');

                // Ensure proper z-index
                nextSlideElement.style.zIndex = '1';
                currentSlideElement.style.zIndex = '0';

                // Ensure proper opacity
                nextSlideElement.style.opacity = '1';

                // Show content of next slide with subtle animation
                setTimeout(() => {
                    if (nextSlideElement.querySelector('.hero__content')) {
                        nextSlideElement.querySelector('.hero__content').style.opacity = '1';
                    }

                    // Reset animation flag after animation completes
                    setTimeout(() => {
                        isAnimating = false;
                    }, 300);
                }, 200);

                // Update current slide index
                currentSlide = index;
            }, 100);
        }
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

    // Start automatic slideshow with refined timing
    function startSlideshow() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }

        // Set new interval with longer duration for better user experience
        slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
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
        if (e.key === 'ArrowLeft') {
            prevSlide();
            startSlideshow();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            startSlideshow();
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
        const swipeThreshold = 50;
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

    // Add navigation arrows for better UX
    const createNavArrows = () => {
        const prevArrow = document.createElement('button');
        prevArrow.className = 'hero__nav hero__nav--prev';
        prevArrow.setAttribute('aria-label', 'Diapositive précédente');
        prevArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';

        const nextArrow = document.createElement('button');
        nextArrow.className = 'hero__nav hero__nav--next';
        nextArrow.setAttribute('aria-label', 'Diapositive suivante');
        nextArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

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
    dots[0].style.backgroundColor = '#ffffff';
    dots[0].style.transform = 'scale(1.2)';

    // Show content of first slide with animation
    setTimeout(() => {
        if (slides[0].querySelector('.hero__content')) {
            slides[0].querySelector('.hero__content').style.opacity = '1';
        }
    }, 200);

    // Start slideshow
    startSlideshow();
}

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
