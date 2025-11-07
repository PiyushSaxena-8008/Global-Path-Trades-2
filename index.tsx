document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Header Logic ---
    const header = document.getElementById('header') as HTMLElement;
    const mobileMenuButton = document.getElementById('mobile-menu-button') as HTMLButtonElement;
    const navbar = document.getElementById('navbar-sticky') as HTMLElement;
    const navLinksForMenuClose = navbar.querySelectorAll('a');
    const navbarList = navbar.querySelector('ul') as HTMLUListElement;
    const brandName = header.querySelector('a > span') as HTMLElement;
    const allNavLinks = document.querySelectorAll('#navbar-sticky a');
    const headerSocialLinks = document.querySelectorAll('.header-social-link');
    const headerPartition = document.getElementById('header-partition') as HTMLElement;

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

    // Header background change on scroll
    const heroSection = document.getElementById('home');
    if (header && heroSection) {
        const heroObserver = new IntersectionObserver(([entry]) => {
            const currentActiveLink = document.querySelector('#navbar-sticky a[aria-current="page"]');
            if (!entry.isIntersecting) {
                // Scrolled past hero, change to opaque header
                header.classList.add('bg-white', 'shadow-md', 'text-gray-700');
                header.classList.remove('text-white', 'bg-black/30', 'backdrop-blur-md');
                brandName.classList.add('text-blue-800');
                mobileMenuButton.classList.add('text-gray-500');
                mobileMenuButton.classList.remove('hover:bg-white/20', 'focus:ring-white/50');
                mobileMenuButton.classList.add('hover:bg-gray-100', 'focus:ring-gray-200');
                navbarList.classList.add('bg-gray-50', 'md:bg-transparent');
                navbarList.classList.remove('border-gray-700');
                if (headerPartition) {
                    headerPartition.classList.remove('bg-gray-400/50');
                    headerPartition.classList.add('bg-gray-300');
                }

                headerSocialLinks.forEach(link => {
                    link.classList.remove('hover:text-blue-300');
                    link.classList.add('hover:text-blue-700');
                });

                // Update nav links for scrolled state
                allNavLinks.forEach(link => {
                    link.classList.remove('font-bold', 'hover:text-blue-300'); // remove transparent styles
                    
                    // Differentiate between nav links and social icons in mobile menu
                    if (link.querySelector('i.fab')) {
                        link.classList.add('text-gray-700', 'hover:text-blue-700');
                    } else {
                        link.classList.add('text-gray-700', 'hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700');
                    }
                    
                    if (link === currentActiveLink) {
                        link.classList.add('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700');
                        link.classList.remove('text-gray-700');
                    }
                });

            } else {
                // Hero is in view, use translucent header
                header.classList.remove('bg-white', 'shadow-md', 'text-gray-700');
                header.classList.add('text-white', 'bg-black/30', 'backdrop-blur-md');
                brandName.classList.remove('text-blue-800');
                mobileMenuButton.classList.remove('text-gray-500');
                mobileMenuButton.classList.add('hover:bg-white/20', 'focus:ring-white/50');
                mobileMenuButton.classList.remove('hover:bg-gray-100', 'focus:ring-gray-200');
                navbarList.classList.remove('bg-gray-50', 'md:bg-transparent');
                navbarList.classList.add('border-gray-700');
                if (headerPartition) {
                    headerPartition.classList.add('bg-gray-400/50');
                    headerPartition.classList.remove('bg-gray-300');
                }
                
                headerSocialLinks.forEach(link => {
                    link.classList.add('hover:text-blue-300');
                    link.classList.remove('hover:text-blue-700');
                });
                
                // Update nav links for transparent state
                 allNavLinks.forEach(link => {
                    link.classList.remove('text-gray-700', 'hover:bg-gray-100', 'md:hover:bg-transparent', 'md:hover:text-blue-700', 'text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700', 'hover:text-blue-700');
                    link.classList.add('hover:text-blue-300');
                    if (link === currentActiveLink) {
                        link.classList.add('font-bold');
                        link.classList.remove('hover:text-blue-300');
                    }
                });
            }
        }, {
            // Trigger when the hero section is 80px from the top of the viewport
            rootMargin: '-80px 0px 0px 0px',
            threshold: 0
        });
        heroObserver.observe(heroSection);
    }


    // --- Active Section Highlighting ---
    const sections = document.querySelectorAll('main section');
    
    const observer = new IntersectionObserver((entries) => {
        const isHeaderScrolled = header.classList.contains('shadow-md');
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                allNavLinks.forEach(link => {
                    link.classList.remove('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700', 'font-bold');
                    link.removeAttribute('aria-current');

                    if (isHeaderScrolled) {
                         if (link.querySelector('i.fab')) {
                            link.classList.add('text-gray-700');
                        } else {
                            link.classList.add('text-gray-700');
                        }
                    }

                    if (link.getAttribute('href') === `#${id}`) {
                         link.setAttribute('aria-current', 'page');
                         if (isHeaderScrolled) {
                            link.classList.add('text-white', 'bg-blue-700', 'md:bg-transparent', 'md:text-blue-700');
                            link.classList.remove('text-gray-700');
                         } else {
                            link.classList.add('font-bold');
                         }
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Contact Form Logic ---
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const formStatus = document.getElementById('form-status') as HTMLDivElement;
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