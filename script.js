/* ========================================
   BELLO EL-RUFAI EMPOWERMENT HUB (BEE-HUB) - JAVASCRIPT
   ========================================
    
    This file contains all interactive functionality:
    - Mobile navigation toggle
    - Hero section slideshow
    - Gallery image grid and modal
    - Smooth scrolling
    - Form handling
    - Program application modal
    
    TO UPDATE IMAGES:
    - Modify the heroImages array for hero slideshow
    - Modify the galleryImages array for gallery section
    
    ======================================== */

// ========================================
// CONFIGURATION SECTION
// ======================================== 

// HERO SLIDESHOW IMAGES
// TO UPDATE: Replace these URLs with your own images
const heroImages = [
    {
        url: 'https://i.ibb.co/wNnNV1LB/1761119851739.jpg',
        caption: 'Empowering Youth Through Education'
    },
    {
        url: 'https://i.ibb.co/k2hMVLnB/1761119866971.jpg',
        caption: 'Building Skills for the Future'
    },
    {
        url: 'https://i.ibb.co/8DL3j9C5/1761119874237.jpg',
        caption: 'Community Development Programs'
    },
    {
        url: 'https://i.ibb.co/23wDC71K/IMG-20251022-WA0014.jpg',
        caption: 'Creating Opportunities for All'
    }
];

// GALLERY IMAGES
// TO UPDATE: Replace these URLs with your event photos
const galleryImages = [
    {
        url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop',
        caption: 'Educational Workshop'
    },
    {
        url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
        caption: 'Tech Skills Training Session'
    },
    {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
        caption: 'Leadership Development Program'
    },
    {
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop',
        caption: 'Community Service Day'
    },
    {
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
        caption: 'Team Collaboration Workshop'
    },
    {
        url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
        caption: 'Graduation Ceremony'
    },
    {
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
        caption: 'Vocational Training'
    },
    {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
        caption: 'Youth Conference'
    },
    {
        url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop',
        caption: 'Scholarship Recipients'
    }
];

// Slideshow interval (milliseconds)
const SLIDESHOW_INTERVAL = 5000; // 5 seconds

// ========================================
// GLOBAL VARIABLES
// ======================================== 
let currentSlide = 0;
let slideInterval;
let currentGalleryImage = 0;

// ========================================
// MOBILE NAVIGATION
// ======================================== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLLING
// ======================================== 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle smooth scrolling for hash links on the current page
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        // For other links (like donate.html, volunteer.html), allow normal navigation
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ======================================== 
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// HERO SLIDESHOW FUNCTIONALITY
// ======================================== 

// Initialize slideshow
function initSlideshow() {
    const slideshowContainer = document.querySelector('.hero-slideshow');
    const dotsContainer = document.getElementById('slideshow-dots');
    
    // Create slides
    heroImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image.url}" alt="${image.caption}">`;
        slideshowContainer.appendChild(slide);
        
        // Create dots
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Start auto-play
    startSlideshow();
}

// Show specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetSlideInterval();
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % heroImages.length;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + heroImages.length) % heroImages.length;
    showSlide(currentSlide);
}

// Start auto-play
function startSlideshow() {
    slideInterval = setInterval(nextSlide, SLIDESHOW_INTERVAL);
}

// Reset interval (when user manually changes slide)
function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideshow();
}

// Event listeners for slideshow controls
document.getElementById('nextBtn').addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    prevSlide();
    resetSlideInterval();
});

// ========================================
// GALLERY FUNCTIONALITY
// ======================================== 

// Initialize gallery
function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.caption}">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        galleryItem.addEventListener('click', () => openGalleryModal(index));
        galleryGrid.appendChild(galleryItem);
    });
}

// Open gallery modal
function openGalleryModal(index) {
    currentGalleryImage = index;
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    
    modal.classList.add('active');
    modalImage.src = galleryImages[index].url;
    modalCaption.textContent = galleryImages[index].caption;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close gallery modal
function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate gallery modal
function navigateGallery(direction) {
    if (direction === 'next') {
        currentGalleryImage = (currentGalleryImage + 1) % galleryImages.length;
    } else {
        currentGalleryImage = (currentGalleryImage - 1 + galleryImages.length) % galleryImages.length;
    }
    
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    modalImage.src = galleryImages[currentGalleryImage].url;
    modalCaption.textContent = galleryImages[currentGalleryImage].caption;
}

// Gallery modal event listeners
document.getElementById('modal-close').addEventListener('click', closeGalleryModal);
document.getElementById('modal-prev').addEventListener('click', () => navigateGallery('prev'));
document.getElementById('modal-next').addEventListener('click', () => navigateGallery('next'));

// Close modal when clicking outside image
document.getElementById('gallery-modal').addEventListener('click', (e) => {
    if (e.target.id === 'gallery-modal') {
        closeGalleryModal();
    }
});

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('gallery-modal');
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            navigateGallery('next');
        } else if (e.key === 'ArrowLeft') {
            navigateGallery('prev');
        } else if (e.key === 'Escape') {
            closeGalleryModal();
        }
    }
});

// ========================================
// PROGRAM APPLICATION MODAL
// ======================================== 

const applicationModal = document.getElementById('application-modal');
const applyButtons = document.querySelectorAll('.apply-btn');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');

// Open application modal
applyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const programName = button.getAttribute('data-program');
        document.getElementById('selected-program').value = programName;
        document.getElementById('app-program-display').value = programName;
        applicationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close application modal
function closeApplicationModal() {
    applicationModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Reset form
    document.querySelector('.application-form').reset();
}

closeModalBtn.addEventListener('click', closeApplicationModal);
cancelBtn.addEventListener('click', closeApplicationModal);

// Close modal when clicking outside
applicationModal.addEventListener('click', (e) => {
    if (e.target === applicationModal) {
        closeApplicationModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && applicationModal.classList.contains('active')) {
        closeApplicationModal();
    }
});

// ========================================
// FORM HANDLING
// ======================================== 

// Netlify Forms will handle the submission automatically
// The forms are configured with data-netlify="true" in the HTML
// After submission, users will be redirected to Netlify's success page
// To customize the success page, add a custom success page in Netlify settings
// or add action="/success" to the form tag and create a success.html page

// Optional: Add client-side validation here if needed
// The forms will submit normally and Netlify will capture the data

// ========================================
// SCROLL ANIMATIONS
// ======================================== 

// Add fade-in animation to sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all program cards and gallery items
document.addEventListener('DOMContentLoaded', () => {
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ========================================
// INITIALIZATION
// ======================================== 

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initGallery();
    
    console.log('BEE-Hub website loaded successfully!');
});

// ========================================
// UTILITY FUNCTIONS
// ======================================== 

// Scroll to top button (optional enhancement)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show scroll-to-top button when scrolled down
window.addEventListener('scroll', () => {
    const scrollButton = document.getElementById('scroll-to-top');
    if (scrollButton) {
        if (window.scrollY > 500) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});
