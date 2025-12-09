// script.js - COMPLETELY FIXED FOR ALL PAGES - Mobile Optimized
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    
    // 1. UNIVERSAL BURGER MENU - WORKS ON ALL PAGES
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (burgerMenu && navLinks) {
        // Toggle function
        const toggleMenu = (closeOnly = false) => {
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
            
            if (closeOnly) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                burgerMenu.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            } else {
                burgerMenu.classList.toggle('active');
                navLinks.classList.toggle('active');
                burgerMenu.setAttribute('aria-expanded', !isExpanded);
                body.style.overflow = !isExpanded ? 'hidden' : '';
            }
        };
        
        // Click burger
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close on link click
        const navLinksList = navLinks.querySelectorAll('a');
        navLinksList.forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !burgerMenu.contains(e.target)) {
                toggleMenu(true);
            }
        });
        
        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(true);
            }
        });
    }
    
    // 2. UPDATE COPYRIGHT YEAR
    const currentYearElements = document.querySelectorAll('#currentYear');
    currentYearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // 3. UNIVERSAL FAQ ACCORDION - WORKS ON ALL PAGES
    const initFAQ = () => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (faqQuestions.length > 0) {
            faqQuestions.forEach(question => {
                // Remove any existing listeners to prevent duplicates
                question.removeEventListener('click', handleFAQClick);
                question.addEventListener('click', handleFAQClick);
            });
        }
    };
    
    const handleFAQClick = function() {
        const answer = this.nextElementSibling;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQs on current page
        document.querySelectorAll('.faq-question').forEach(q => {
            if (q !== this) {
                q.classList.remove('active');
                q.setAttribute('aria-expanded', 'false');
                const otherAnswer = q.nextElementSibling;
                if (otherAnswer && otherAnswer.classList.contains('faq-answer')) {
                    otherAnswer.classList.remove('open');
                    otherAnswer.style.maxHeight = null;
                }
            }
        });
        
        // Toggle current FAQ
        this.classList.toggle('active');
        this.setAttribute('aria-expanded', !isExpanded);
        
        if (answer && answer.classList.contains('faq-answer')) {
            if (isExpanded) {
                answer.classList.remove('open');
                answer.style.maxHeight = null;
            } else {
                answer.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                
                // Smooth scroll on mobile only if needed
                if (window.innerWidth < 768) {
                    setTimeout(() => {
                        const rect = this.getBoundingClientRect();
                        if (rect.bottom > window.innerHeight - 100) {
                            this.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'center' 
                            });
                        }
                    }, 100);
                }
            }
        }
    };
    
    // Initialize FAQ immediately
    initFAQ();
    
    // Re-initialize FAQ if content loads dynamically
    const observer = new MutationObserver(initFAQ);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // 4. FORM SUBMISSION HANDLING
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4444';
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields marked with *');
                return;
            }
            
            const submitBtn = this.querySelector('.submit-btn');
            if (!submitBtn) return;
            
            const originalText = submitBtn.innerHTML;
            const originalBg = submitBtn.style.background;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';
            submitBtn.style.cursor = 'not-allowed';
            
            // Simulate API call
            setTimeout(() => {
                // Success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                    submitBtn.style.background = originalBg;
                    
                    // Show success toast
                    showToast('Thank you! We will contact you within 24 hours.');
                }, 2000);
            }, 1500);
        });
    }
    
    // 5. SMOOTH SCROLLING FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (burgerMenu && navLinks && navLinks.classList.contains('active')) {
                    burgerMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    body.style.overflow = '';
                }
                
                // Calculate scroll position with offset for fixed nav
                const navHeight = 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, href);
            }
        });
    });
    
    // 6. DESKTOP CTA BUTTON - FIXED
    function updateDesktopCTA() {
        const desktopCta = document.getElementById('desktopCta');
        if (desktopCta) {
            desktopCta.style.display = window.innerWidth >= 1024 ? 'inline-block' : 'none';
        }
    }
    
    // Initial check and resize listener
    updateDesktopCTA();
    window.addEventListener('resize', debounce(updateDesktopCTA, 250));
    
    // 7. TOUCH-FRIENDLY IMPROVEMENTS
    document.querySelectorAll('button, a.cta-btn, input[type="submit"], .card').forEach(element => {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
    });
    
    // 8. SERVICE MODAL - UNIVERSAL FIX
    const initServiceModal = () => {
        const serviceModal = document.getElementById('serviceModal');
        const serviceCards = document.querySelectorAll('.card[data-service]');
        const closeModalBtn = document.querySelector('.close-btn');
        
        if (serviceModal && serviceCards.length > 0) {
            // Service data for all pages
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
                seo: {
                    title: "SEO Implementation & Ranking Domination",
                    description: "Our proven SEO strategy delivers consistent Page 1 rankings, driving qualified organic traffic that converts into customers.",
                    reasons: [
                        "**Highest ROI Marketing:** Organic traffic provides the best long-term ROI",
                        "**24/7 Business Visibility:** Your website works for you even when you sleep",
                        "**Builds Trust & Authority:** Top rankings establish your brand as an industry leader",
                        "**Sustainable Growth:** Unlike ads, SEO results compound over time",
                        "**Targets Ready-to-Buy Users:** Capture users actively searching for your services",
                        "**Local Dominance:** Dominate local search results in your area"
                    ]
                },
                ads: {
                    title: "Precision Digital Marketing & PPC Ads",
                    description: "Launch high-converting ad campaigns that deliver immediate, measurable results with complete transparency and optimization.",
                    reasons: [
                        "**Instant Results:** Get leads and sales within 24 hours of launch",
                        "**Complete Control:** Set your budget, target audience, and schedule",
                        "**Real-time Optimization:** We constantly optimize campaigns for better results",
                        "**Measurable ROI:** Track every rupee spent and earned",
                        "**Flexible Scaling:** Easily increase or decrease spending based on performance",
                        "**Market Testing:** Quickly test new offers or target markets"
                    ]
                },
                whatsapp: {
                    title: "WhatsApp Automation Services",
                    description: "Transform your customer communication with intelligent WhatsApp automation that engages, sells, and supports 24/7.",
                    reasons: [
                        "**99% Open Rate:** WhatsApp messages have near-perfect open rates",
                        "**Direct Communication:** Connect with customers on their preferred platform",
                        "**Automated Sales:** Qualify leads and follow up automatically",
                        "**Reduce Support Load:** Handle common queries without human intervention",
                        "**Personalized Marketing:** Send targeted messages based on user behavior",
                        "**Cart Recovery:** Automatically remind users about abandoned carts"
                    ]
                },
                chatbot: {
                    title: "AI Chatbot & Enterprise API Integration",
                    description: "Implement intelligent AI chatbots and seamless API integrations that automate workflows and enhance customer experience.",
                    reasons: [
                        "**24/7 Customer Support:** Never miss a customer query, day or night",
                        "**Cost Reduction:** Handle 80% of queries without human agents",
                        "**Lead Generation:** Qualify and capture leads automatically",
                        "**Multi-language Support:** Serve customers in their preferred language",
                        "**Seamless Integration:** Connect with CRM, payment gateways, and databases",
                        "**Continuous Learning:** AI improves responses based on interactions"
                    ]
                },
                enterprise: {
                    title: "Enterprise Digital Transformation Package",
                    description: "Comprehensive digital solution combining web development, marketing, and automation for complete business transformation.",
                    reasons: [
                        "**Unified Strategy:** All digital efforts work together seamlessly",
                        "**Cost Efficiency:** Bundle discount compared to separate services",
                        "**Priority Support:** Dedicated account manager and faster response times",
                        "**Holistic Growth:** Address all aspects of your digital presence",
                        "**Consistent Branding:** Unified look and feel across all platforms",
                        "**Scalable Infrastructure:** Ready for rapid business growth"
                    ]
                }
            };
            
            // Open modal on card click (not hover)
            serviceCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    // Don't open modal if clicking on a link inside card
                    if (e.target.tagName === 'A' || e.target.closest('a')) {
                        return;
                    }
                    
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
                            li.style.marginBottom = '0.75rem';
                            li.style.paddingLeft = '0.5rem';
                            reasonsList.appendChild(li);
                        });
                        
                        serviceModal.style.display = 'flex';
                        setTimeout(() => {
                            serviceModal.style.opacity = '1';
                        }, 10);
                        body.style.overflow = 'hidden';
                    }
                });
                
                // Remove hover effect that might trigger modal
                card.addEventListener('mouseenter', function() {
                    this.style.cursor = 'pointer';
                });
            });
            
            // Close modal functions
            const closeModal = () => {
                serviceModal.style.opacity = '0';
                setTimeout(() => {
                    serviceModal.style.display = 'none';
                }, 300);
                body.style.overflow = '';
            };
            
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', closeModal);
            }
            
            serviceModal.addEventListener('click', (e) => {
                if (e.target === serviceModal) {
                    closeModal();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && serviceModal.style.display === 'flex') {
                    closeModal();
                }
            });
        }
    };
    
    // Initialize modal
    initServiceModal();
    
    // 9. IMAGE LOADING - IMPROVED
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '0';
        }
    });
    
    // 10. ADD STICKY MOBILE CTA
    const addMobileCTA = () => {
        if (window.innerWidth < 768) {
            // Check if already exists
            if (!document.getElementById('mobileStickyCTA')) {
                const mobileCTA = document.createElement('a');
                mobileCTA.id = 'mobileStickyCTA';
                mobileCTA.href = 'https://wa.me/91XXXXXXXXXX';
                mobileCTA.target = '_blank';
                mobileCTA.innerHTML = '<i class="fab fa-whatsapp"></i> Chat on WhatsApp';
                mobileCTA.style.cssText = `
                    position: fixed;
                    bottom: 80px;
                    right: 20px;
                    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
                    z-index: 998;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: transform 0.3s;
                `;
                document.body.appendChild(mobileCTA);
                
                // Add hover effect
                mobileCTA.addEventListener('mouseenter', () => {
                    mobileCTA.style.transform = 'translateY(-2px)';
                });
                mobileCTA.addEventListener('mouseleave', () => {
                    mobileCTA.style.transform = 'translateY(0)';
                });
            }
        } else {
            // Remove on desktop
            const existingCTA = document.getElementById('mobileStickyCTA');
            if (existingCTA) {
                existingCTA.remove();
            }
        }
    };
    
    // Initialize and update on resize
    addMobileCTA();
    window.addEventListener('resize', debounce(addMobileCTA, 250));
    
    // 11. UTILITY FUNCTIONS
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) existingToast.remove();
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-panel);
            color: var(--text-light);
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideUp 0.3s ease;
            border: 1px solid var(--primary);
            max-width: 90%;
            text-align: center;
        `;
        
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Add CSS for toast animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        .toast-message {
            transition: opacity 0.3s, transform 0.3s;
        }
    `;
    document.head.appendChild(style);
    
    // 12. FIX FORM PLACEHOLDER CONTRAST
    const styleFix = document.createElement('style');
    styleFix.textContent = `
        input::placeholder,
        textarea::placeholder {
            color: rgba(160, 160, 176, 0.9) !important;
            opacity: 1 !important;
        }
        
        @media (max-width: 767px) {
            input, select, textarea {
                font-size: 16px !important; /* Prevents iOS zoom */
            }
            
            .card {
                margin: 10px;
            }
            
            .floating-container {
                bottom: 100px !important;
            }
        }
    `;
    document.head.appendChild(styleFix);
    
    // 13. ENHANCE PERFORMANCE ON DESKTOP
    if (window.innerWidth >= 1024) {
        // Reduce animation duration on desktop
        document.querySelectorAll('.fade-in, .seo-fade-in, .seo-slide-in-left, .seo-slide-in-right').forEach(el => {
            el.style.animationDuration = '0.4s';
        });
    }
});

// Add global error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});
