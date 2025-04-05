// Create hover detection area
const createNavbarTriggerArea = () => {
    const triggerArea = document.createElement('div');
    triggerArea.className = 'navbar-trigger-area';
    document.body.appendChild(triggerArea);
    return triggerArea;
};

// Navbar visibility control
const navbar = document.querySelector('.navbar');
const triggerArea = createNavbarTriggerArea();
let lastScrollTop = 0;
let isHovering = false;

// Handle scroll events
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Scrolling down
        navbar.classList.add('scrolled');
    } else {
        // Scrolling up or at the top
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Handle hover events
const showNavbar = () => {
    if (window.pageYOffset > 50) {
        isHovering = true;
        navbar.classList.remove('scrolled');
        navbar.classList.add('show-on-hover');
    }
};

const hideNavbar = () => {
    if (window.pageYOffset > 50) {
        isHovering = false;
        navbar.classList.remove('show-on-hover');
        navbar.classList.add('scrolled');
    }
};

// Add hover listeners to both trigger area and navbar
triggerArea.addEventListener('mouseenter', showNavbar);
navbar.addEventListener('mouseenter', showNavbar);

triggerArea.addEventListener('mouseleave', (e) => {
    // Check if the mouse is not moving to the navbar
    if (!e.relatedTarget || !e.relatedTarget.closest('.navbar')) {
        hideNavbar();
    }
});

navbar.addEventListener('mouseleave', (e) => {
    // Check if the mouse is not moving to the trigger area
    if (!e.relatedTarget || !e.relatedTarget.closest('.navbar-trigger-area')) {
        hideNavbar();
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768 && hamburger && navLinks) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Here you would typically send the email to your server
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-toggle button');
    if (menuButtons.length) {
        menuButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                menuButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all menus
                document.getElementById('breakfast-menu').classList.add('d-none');
                document.getElementById('lunch-menu').classList.add('d-none');
                
                // Show selected menu
                const category = this.getAttribute('data-category');
                document.getElementById(`${category}-menu`).classList.remove('d-none');
            });
        });
    }
});

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');
    const counter = document.querySelector('.modal-counter');
    
    // Check if gallery elements exist
    if (!galleryItems.length || !modal || !modalImg || !closeModal || !prevButton || !nextButton || !counter) {
        console.log('Some gallery elements are missing');
        return;
    }
    
    let currentIndex = 0;
    const images = Array.from(galleryItems);

    // Open modal when clicking on gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            currentIndex = index;
            updateCounter();
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Update counter display
    function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    // Navigation functions
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
        modalImg.alt = images[currentIndex].alt;
        updateCounter();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        modalImg.alt = images[currentIndex].alt;
        updateCounter();
    }

    // Close modal function
    function closeGalleryModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners for navigation
    closeModal.addEventListener('click', closeGalleryModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    prevButton.addEventListener('click', function(e) {
        e.stopPropagation();
        showPrev();
    });

    nextButton.addEventListener('click', function(e) {
        e.stopPropagation();
        showNext();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display !== 'flex') return;
        
        switch(e.key) {
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
            case 'Escape':
                closeGalleryModal();
                break;
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                showNext();
            } else {
                showPrev();
            }
        }
    });
});

// Counter animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-number');
    
    // Check if counters exist
    if (!counters.length) {
        console.log('No counter elements found');
        return;
    }
    
    // Intersection Observer to trigger counter animation when visible
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 1500; // Animation duration in milliseconds (balanced speed)
                const increment = Math.ceil(target / 100); // Smaller increments for smoother counting
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        // Use moderate increments for balanced counting speed
                        current = Math.min(current + increment, target);
                        counter.textContent = current;
                        
                        // Use setTimeout with a small delay for more controlled speed
                        setTimeout(updateCounter, 9);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});




// Initialize Owl Carousel for testimonials if jQuery and Owl are loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof $ !== 'undefined' && typeof $.fn.owlCarousel !== 'undefined') {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }
});

// Add modal styles dynamically
const style = document.createElement('style');
style.textContent = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
    }
    .modal-content {
        position: relative;
        margin: auto;
        padding: 20px;
        width: 90%;
        max-width: 700px;
        top: 50%;
        transform: translateY(-50%);
    }
    .modal img {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }
    .close {
        position: absolute;
        right: 25px;
        top: 10px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
    }
    .close:hover {
        color: #e74c3c;
    }
`;
document.head.appendChild(style); 