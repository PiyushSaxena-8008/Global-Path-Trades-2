document.addEventListener('DOMContentLoaded', () => {

    // --- Header Logic ---
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navbar = document.getElementById('navbar-sticky');
    const navLinksForMenuClose = navbar.querySelectorAll('a');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        navbar.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', navbar.classList.contains('hidden') ? 'false' : 'true');
    });

    // Close mobile menu on link click
    navLinksForMenuClose.forEach(link => {
        link.addEventListener('click', () => {
            if (!navbar.classList.contains('hidden')) {
                navbar.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Sticky header on scroll
    const updateHeader = () => {
        if (window.scrollY > 10) {
            header.classList.add('bg-white', 'shadow-md');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-white', 'shadow-md');
            header.classList.add('bg-transparent');
        }
    };
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Run on page load


    // --- Active Section Highlighting ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('#navbar-sticky a');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700');
                    link.classList.add('text-gray-700', 'hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700');
                    link.removeAttribute('aria-current');

                    if (link.getAttribute('href') === `#${id}`) {
                         link.classList.add('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700');
                         link.classList.remove('text-gray-700', 'hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700');
                         link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Contact Form Logic ---
    // FIX: Cast `form` to HTMLFormElement to access properties like 'action' and 'reset', and to use it with FormData.
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const formStatus = document.getElementById('form-status');
    // FIX: Cast `submitButton` to HTMLButtonElement to access the 'disabled' property.
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = 'mt-4 text-center';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.classList.add('text-green-600');
                form.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || `Server error: ${response.statusText}`);
            }

        } catch (error) {
            formStatus.textContent = `Something went wrong. Please try again.`;
            formStatus.classList.add('text-red-600');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
});