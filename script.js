// script.js (New File)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Burger Menu Toggle
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Footer Year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // 3. Service Modal Logic (Only on services.html)
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.querySelector('.close-btn');
    const serviceCards = document.querySelectorAll('.card[data-service]');

    // Data structure for service pop-ups
    const serviceData = {
        webapp: {
            title: "Custom Web Application Development",
            description: "We craft tailor-made, enterprise-grade applications designed for your unique business logic and growth strategy.",
            reasons: [
                "**Scalability:** Built from the ground up to handle massive user loads.",
                "**Data Ownership:** You maintain complete control over your critical business data.",
                "**Bespoke Features:** Add any custom functionality (APIs, integrations) that off-the-shelf solutions can't offer."
            ]
        },
        seo: {
            title: "SEO Implementation & Ranking Domination",
            description: "Our strategy focuses on technical SEO, high-value content, and link building to secure a persistent Page 1 ranking for your most critical keywords.",
            reasons: [
                "**Highest ROI:** Organic traffic delivers the best long-term return on investment.",
                "**24/7 Visibility:** Your business appears in search results even while you sleep.",
                "**Authority Building:** Build trust and credibility by being the top result in your industry."
            ]
        },
        ads: {
            title: "Precision Digital Marketing & PPC Ads",
            description: "Launching high-conversion ad campaigns across platforms to deliver immediate, measurable traffic and leads right to your inbox.",
            reasons: [
                "**Immediate Traffic:** Get prospects instantly, bypassing the wait time for SEO.",
                "**Precise Targeting:** Reach specific demographics, interests, and locations.",
                "**Quick Market Testing:** Test new products/offers rapidly with defined budgets."
            ]
        },
        whatsapp: {
            title: "WhatsApp Automation Services (NEW)",
            description: "Integrate powerful automation flows directly into the world's most popular messaging platform to engage, sell, and support customers instantly.",
            reasons: [
                "**99% Open Rate:** Leverage the directness of messaging for crucial communication.",
                "**Instant Support:** Handle initial customer queries without human intervention.",
                "**Personalized Follow-ups:** Automate sales sequences and abandoned cart recovery."
            ]
        },
        chatbot: {
            title: "AI Chatbot & Enterprise API Integration (NEW)",
            description: "Seamlessly integrate custom AI chatbots into your platform and connect internal systems via robust APIs to eliminate manual work and boost efficiency.",
            reasons: [
                "**24/7 Availability:** Your customer support never sleeps, improving satisfaction.",
                "**Reduced Staff Load:** Free up your team to focus on complex, high-value tasks.",
                "**Workflow Automation:** Connect payment gateways, CRMs, and databases automatically."
            ]
        }
    };

    // Event listeners to open modal
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.dataset.service;
            const data = serviceData[serviceKey];
            
            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-description').textContent = data.description;
            
            const reasonsList = document.getElementById('modal-reasons');
            reasonsList.innerHTML = '';
            data.reasons.forEach(reason => {
                const li = document.createElement('li');
                li.innerHTML = reason; // Use innerHTML to allow for bolding (e.g., **Scalability**)
                reasonsList.appendChild(li);
            });
            
            modal.style.display = 'flex';
        });
    });

    // Event listeners to close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

});
