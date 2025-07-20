/**
 * BASINOL Website - Elegant Hero Slider
 * Apple-like Design with Smooth Transitions
 */

document.addEventListener('DOMContentLoaded', function () {
    initElegantHeroSlider();
});

/**
 * Initialize Elegant Hero Slider with simple animations similar to main slider
 */
function initElegantHeroSlider() {
    const elegantSlider = document.querySelector('.hero--elegant .hero__slider');

    if (!elegantSlider) return;

    const slides = elegantSlider.querySelectorAll('.hero__slide');
    const dots = elegantSlider.querySelectorAll('.hero__dot');
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false; // Flag to prevent animation interruption

    // Function to show a specific slide with simple animation
    function showSlide(index) {
        // Skip if animation is in progress or same slide
        if (isAnimating || index === currentSlide) return;
        isAnimating = true;

        // Get current and next slides
        const currentSlideElement = slides[currentSlide];
        const nextSlideElement = slides[index];

        // First, hide all slides except current
        slides.forEach(slide => {
            if (slide !== currentSlideElement) {
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
                slide.classList.remove('active');
                slide.style.visibility = 'hidden';
                slide.style.display = 'none';
            }
        });

        // Then prepare only the next slide
        nextSlideElement.style.display = 'grid';
        nextSlideElement.style.visibility = 'visible';
        nextSlideElement.style.opacity = '0';
        nextSlideElement.style.zIndex = '1';

        // Hide content of current slide with subtle animation
        if (currentSlideElement.querySelector('.hero__content')) {
            currentSlideElement.querySelector('.hero__content').style.opacity = '0';
        }

        // Show the next slide
        setTimeout(() => {
            // Update dots - ensure they're visible
            const controlsElement = elegantSlider.querySelector('.hero__controls');
            if (controlsElement) {
                controlsElement.style.zIndex = '10';
                controlsElement.style.opacity = '1';
                controlsElement.style.visibility = 'visible';
            }

            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });

            // Make next slide visible with subtle animation
            nextSlideElement.classList.add('active');
            currentSlideElement.classList.remove('active');

            // Ensure proper z-index
            nextSlideElement.style.zIndex = '2';
            currentSlideElement.style.zIndex = '0';

            // Ensure proper opacity
            nextSlideElement.style.opacity = '1';
            currentSlideElement.style.opacity = '0';

            // Show content of next slide with subtle animation
            setTimeout(() => {
                if (nextSlideElement.querySelector('.hero__content')) {
                    nextSlideElement.querySelector('.hero__content').style.opacity = '1';
                }

                // Reset animation flag after animation completes
                setTimeout(() => {
                    isAnimating = false;

                    // Completely hide all non-active slides
                    slides.forEach((slide, i) => {
                        if (i !== index) {
                            slide.style.visibility = 'hidden';
                            slide.style.display = 'none';
                            slide.style.opacity = '0';
                        }
                    });
                }, 300);
            }, 200);

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
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
    }

    // Pause slideshow on hover
    elegantSlider.addEventListener('mouseenter', function () {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    });

    // Resume slideshow on mouse leave
    elegantSlider.addEventListener('mouseleave', function () {
        startSlideshow();
    });

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
            startSlideshow();
        });
    });

    // Add navigation arrows
    const createNavArrows = () => {
        const prevArrow = document.createElement('button');
        prevArrow.className = 'hero__nav hero__nav--prev';
        prevArrow.setAttribute('aria-label', 'Diapositive précédente');
        prevArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';

        const nextArrow = document.createElement('button');
        nextArrow.className = 'hero__nav hero__nav--next';
        nextArrow.setAttribute('aria-label', 'Diapositive suivante');
        nextArrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

        elegantSlider.appendChild(prevArrow);
        elegantSlider.appendChild(nextArrow);

        prevArrow.addEventListener('click', function () {
            prevSlide();
            startSlideshow();
        });

        nextArrow.addEventListener('click', function () {
            nextSlide();
            startSlideshow();
        });
    };

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

    elegantSlider.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    elegantSlider.addEventListener('touchend', function (e) {
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

    // Create navigation arrows
    createNavArrows();

    // Initialize the slider with first slide
    slides[0].classList.add('active');
    slides[0].style.opacity = '1';
    slides[0].style.zIndex = '2'; // Higher z-index for active slide
    slides[0].style.visibility = 'visible';
    slides[0].style.display = 'grid';

    // Make sure controls are visible
    const controlsElement = elegantSlider.querySelector('.hero__controls');
    if (controlsElement) {
        controlsElement.style.zIndex = '10';
        controlsElement.style.opacity = '1';
        controlsElement.style.visibility = 'visible';
    }

    dots[0].classList.add('active');

    // Hide all non-active slides initially
    slides.forEach((slide, i) => {
        if (i !== 0) {
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
            slide.style.visibility = 'hidden';
            slide.style.display = 'none';
        }
    });

    // Show content of first slide with animation
    setTimeout(() => {
        if (slides[0].querySelector('.hero__content')) {
            slides[0].querySelector('.hero__content').style.opacity = '1';
        }
    }, 200);

    // Start slideshow
    startSlideshow();
}
