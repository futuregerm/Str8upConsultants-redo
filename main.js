// Progress Bar
const initProgressBar = () => {
    window.addEventListener('scroll', () => {
        const scrollProgress = document.querySelector('.progress-bar');
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    });
};

// Header Scroll Effect
const initHeaderScroll = () => {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
};

// Mobile Navigation
const initMobileNav = () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const navMenu = document.querySelector('.nav-menu');

    // Open menu
    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close menu
    mobileNavClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileNavToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
};

// Smooth Scroll
const initSmoothScroll = () => {
    // Logo click handler for smooth scroll to top
    document.querySelector('.logo').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navigation links smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                // Scroll to top for "#" links
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const offset = 20;
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
};

// Scroll Animation
const initScrollAnimation = () => {
    const scrollElements = document.querySelectorAll('.scroll-fade-in');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initialize scroll animations
    handleScrollAnimation();
};

// Initialize all functionality
const initializeApp = () => {
    initProgressBar();
    initHeaderScroll();
    initMobileNav();
    initSmoothScroll();
    initScrollAnimation();
};

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Mobile Navigation Handling
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements with exact class names
    const toggle = document.querySelector('button.mobile-nav-toggle');
    const menu = document.querySelector('nav.nav-menu');
    const header = document.querySelector('header.header');

    // Debug log to verify elements
    console.log('Elements found:', {
        toggle,
        menu,
        header
    });

    // Only proceed if we have the required elements
    if (!toggle || !menu) {
        console.error('Required navigation elements not found');
        return;
    }

    // Mobile menu toggle
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Toggle clicked'); // Debug log
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking links
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .scroll-fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Add this to your existing CSS to prevent background scrolling when menu is open
document.body.style.cssText = `
    body.nav-open {
        overflow: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
    }
`; 