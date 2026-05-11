/* ============================================
   Steven Design Studio — Portfolio Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 600);
    });
    // Fallback: hide after 3s even if load event doesn't fire
    setTimeout(() => preloader.classList.add('hidden'), 3000);

    // --- Scroll-based nav styling ---
    const nav = document.getElementById('nav');
    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // --- Portfolio filter ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;

            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter items with animation
            portfolioItems.forEach((item, i) => {
                const category = item.dataset.category;
                const match = filter === 'all' || category === filter;

                if (match) {
                    item.classList.remove('hidden');
                    item.style.animation = `fadeInUp 0.4s ${i * 0.05}s var(--ease-out) both`;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.portfolio-image').forEach(img => {
        img.addEventListener('click', () => {
            const src = img.querySelector('img').src;
            const title = img.querySelector('h3')?.textContent || '';
            lightboxImg.src = src;
            lightboxCaption.textContent = title;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // --- Scroll animations (Intersection Observer) ---
    const animateElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // --- Contact form ---
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Opening Email...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';

        // Gather form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const eventType = document.getElementById('eventType').value;
        const eventDate = document.getElementById('eventDate').value;
        const designStyle = document.getElementById('designStyle').value;
        const colorPalette = document.getElementById('colorPalette').value;
        const moodElements = document.querySelectorAll('input[name="mood"]:checked');
        const moods = Array.from(moodElements).map(el => el.value).join(', ');
        const message = document.getElementById('message').value;

        // Build email content
        const subject = `Design Inquiry: ${eventType} from ${name}`;
        const body = `Name: ${name}
Email: ${email}
Event Type: ${eventType}
Event Date: ${eventDate || 'Not specified'}

DESIGN PREFERENCES:
Style: ${designStyle}
Color Palette: ${colorPalette || 'Not specified'}
Moods: ${moods || 'Not specified'}
Terms: Accepted (Required for submission)

Message:
${message}`;
        
        // Target email address - YOU SHOULD UPDATE THIS
        const targetEmail = "wjbear2020@gmail.com";

        // Trigger mailto link
        window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Provide visual feedback
        submitBtn.textContent = 'Redirecting to Email...';
        
        const successMsg = document.createElement('p');
        successMsg.style.color = 'var(--accent)';
        successMsg.style.fontSize = '0.9rem';
        successMsg.style.marginTop = '1rem';
        successMsg.style.textAlign = 'center';
        successMsg.textContent = 'Opening your email client. Please finish and send the email there!';
        form.appendChild(successMsg);

        // Reset UI after a short delay
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
            setTimeout(() => successMsg.remove(), 5000);
        }, 3000);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});

// --- Add fadeInUp animation ---
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
