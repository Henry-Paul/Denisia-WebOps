// script.js - Enhanced with animations and service modal

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Burger Menu Toggle
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Footer Year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // 3. Service Modal Logic
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.querySelector('.close-btn');
    const serviceCards = document.querySelectorAll('.card[data-service]');

    // Service descriptions with compelling reasons
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

    // Event listeners to open modal
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.dataset.service;
            const data = serviceData[serviceKey];
            
            if (data) {
                document.getElementById('modal-title').textContent = data.title;
                document.getElementById('modal-description').textContent = data.description;
                
                const reasonsList = document.getElementById('modal-reasons');
                reasonsList.innerHTML = '';
                
                data.reasons.forEach(reason => {
                    const li = document.createElement('li');
                    // Convert **bold** to <strong> tags
                    const formattedReason = reason.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    li.innerHTML = formattedReason;
                    reasonsList.appendChild(li);
                });
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 4. SEO Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = element.dataset.animation;
                const delay = element.dataset.delay;
                
                if (animationClass) {
                    element.classList.add(animationClass);
                    if (delay) {
                        element.style.animationDelay = delay;
                    }
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with animation attributes
    document.querySelectorAll('[data-animation]').forEach(element => {
        observer.observe(element);
    });

    // 5. Form submission enhancement
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.textContent = 'Request Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, var(--success) 0%, #00cc6a 100%)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    
                    // Show success message
                    alert('Thank you! We will contact you within 24 hours at the email provided.');
                }, 2000);
            }, 1500);
        });
    }

    // 6. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Add animation to hero elements on load
    setTimeout(() => {
        document.querySelectorAll('.seo-fade-in, .seo-slide-in-left, .seo-slide-in-right, .seo-scale-up').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translate(0) scale(1)';
        });
    }, 100);
});

// 8. Google Analytics integration (uncomment and add your ID)
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR_GA_ID');
*/
