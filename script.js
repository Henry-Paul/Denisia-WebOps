// script.js - Mobile-optimized with all fixes

document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Burger Menu - COMPLETELY FIXED
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    
    if (burgerMenu && navLinks) {
        // Toggle menu on burger click
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent body scroll when menu is open
            if (!isExpanded) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    }
    
    // 2. Update copyright year
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // 3. FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            document.querySelectorAll('.faq-question').forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.classList.remove('open');
                }
            });
            
            // Toggle current FAQ
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                answer.classList.remove('open');
            } else {
                answer.classList.add('open');
                // Scroll into view on mobile
                if (window.innerWidth < 768) {
                    setTimeout(() => {
                        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 300);
                }
            }
        });
    });
    
    // 4. Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            if (!submitBtn) return;
            
            const originalText = submitBtn.textContent;
            const originalBg = submitBtn.style.background;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                // Success state
                submitBtn.textContent = '✓ Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = originalBg;
                    
                    // Show success message
                    alert('Thank you! We will contact you within 24 hours.');
                }, 2000);
            }, 1500);
        });
    }
    
    // 5. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (burgerMenu && navLinks) {
                    burgerMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    body.style.overflow = '';
                }
                
                // Calculate scroll position
                const navHeight = 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 6. Show desktop CTA button on larger screens
    function updateDesktopCTA() {
        const desktopCta = document.getElementById('desktopCta');
        if (desktopCta) {
            if (window.innerWidth >= 1024) {
                desktopCta.style.display = 'inline-block';
            } else {
                desktopCta.style.display = 'none';
            }
        }
    }
    
    // Initial check
    updateDesktopCTA();
    
    // Update on resize
    window.addEventListener('resize', updateDesktopCTA);
    
    // 7. Add touch-friendly improvements
    document.querySelectorAll('button, a, input, select').forEach(element => {
        element.style.tapHighlightColor = 'rgba(0, 242, 255, 0.1)';
    });
    
    // 8. Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // 9. Service Modal Functionality
    const serviceModal = document.getElementById('serviceModal');
    const serviceCards = document.querySelectorAll('.card[data-service]');
    const closeModalBtn = document.querySelector('.close-btn');
    
    if (serviceModal && serviceCards.length > 0) {
        // Service data
        const serviceData = {
            webapp: {
                title: "Custom Web Application Development",
                description: "We build enterprise-grade web applications tailored to your unique business needs, designed for scalability, security, and exceptional user experience.",
                reasons: [
                    "**Competitive Advantage:** Stand out with features competitors don't have",
                    "**Data Ownership:** Full control over your valuable business data",
                    "**Scalability:** Handle thousands of users without performance issues",
                    "**Integration:** Seamlessly connect with existing systems and APIs",
                    "**Custom Workflow:** Perfectly match your business processes",
                    "**Security:** Enterprise-level security protecting sensitive data"
                ]
            },
            // Add other services as needed
        };
        
        // Open modal on card click
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const serviceKey = this.dataset.service;
                const data = serviceData[serviceKey];
                
                if (data) {
                    document.getElementById('modal-title').textContent = data.title;
                    document.getElementById('modal-description').textContent = data.description;
                    
                    const reasonsList = document.getElementById('modal-reasons');
                    reasonsList.innerHTML = '';
                    
                    data.reasons.forEach(reason => {
                        const li = document.createElement('li');
                        const formattedReason = reason.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        li.innerHTML = formattedReason;
                        reasonsList.appendChild(li);
                    });
                    
                    serviceModal.style.display = 'flex';
                    body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                serviceModal.style.display = 'none';
                body.style.overflow = '';
            });
        }
        
        // Close modal on outside click
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                serviceModal.style.display = 'none';
                body.style.overflow = '';
            }
        });
    }
    
    // 10. Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.transition = 'opacity 0.3s';
        img.style.opacity = '0';
    });
    
    // 11. Performance optimization
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            updateDesktopCTA();
        }, 250);
    });
});
