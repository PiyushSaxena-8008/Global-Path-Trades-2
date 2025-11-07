document.addEventListener('DOMContentLoaded', () => {

    // --- Header Logic ---
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navbar = document.getElementById('navbar-sticky');
    const navbarList = navbar.querySelector('ul');
    const brandName = document.getElementById('brand-name');
    const allNavLinks = document.querySelectorAll('#navbar-sticky a, footer a, .hero-buttons a');
    const headerSocialLinks = document.querySelectorAll('.header-social-link');
    const headerPartition = document.getElementById('header-partition');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        navbar.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', navbar.classList.contains('hidden') ? 'false' : 'true');
    });

    // --- Smooth Scrolling & Mobile Menu Close for Nav Links ---
    allNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');

            // Handle smooth scrolling for internal links
            if (href && href.startsWith('#')) {
                event.preventDefault();
                
                // Close mobile menu if open and if the link is in the navbar
                if (link.closest('#navbar-sticky') && !navbar.classList.contains('hidden')) {
                    navbar.classList.add('hidden');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // The header's height is roughly 80px, matching scroll-pt-20.
                    // This provides an offset to ensure the section title is visible below the sticky header.
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // Header background change on scroll
    const heroSection = document.getElementById('home');
    if (header && heroSection) {
        const heroObserver = new IntersectionObserver(([entry]) => {
            const currentActiveLink = document.querySelector('#navbar-sticky a[aria-current="page"]');
            const headerLinksForStyling = document.querySelectorAll('#navbar-sticky a');

            if (!entry.isIntersecting) {
                // Scrolled past hero, change to opaque header
                header.classList.add('bg-white', 'shadow-md', 'text-gray-700');
                header.classList.remove('text-white', 'bg-gray-900');
                if (brandName) {
                    brandName.classList.add('text-blue-800');
                    brandName.classList.remove('text-blue-400');
                }
                mobileMenuButton.classList.add('text-gray-500');
                mobileMenuButton.classList.remove('hover:bg-gray-700', 'focus:ring-gray-600');
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
                headerLinksForStyling.forEach(link => {
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
                header.classList.add('text-white', 'bg-gray-900');
                if (brandName) {
                    brandName.classList.add('text-blue-400');
                    brandName.classList.remove('text-blue-800');
                }
                mobileMenuButton.classList.remove('text-gray-500');
                mobileMenuButton.classList.add('hover:bg-gray-700', 'focus:ring-gray-600');
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
                 headerLinksForStyling.forEach(link => {
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

    // --- Hero Slider Logic ---
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('prev-slide-btn');
    const nextBtn = document.getElementById('next-slide-btn');
    const dotsContainer = document.getElementById('slider-dots');

    if (slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
        let currentSlide = 0;
        let slideInterval;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        const goToSlide = (slideIndex) => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active-slide', index === slideIndex);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active-dot', index === slideIndex);
            });
            currentSlide = slideIndex;
        };

        const nextSlide = () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        };

        const prevSlide = () => {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        };

        const startInterval = () => {
            slideInterval = window.setInterval(nextSlide, 5000); // Change slide every 5 seconds
        };
        
        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        
        // Initial setup
        goToSlide(0);
        startInterval();
    }


    // --- Active Section Highlighting ---
    const sections = document.querySelectorAll('main section');
    
    const observer = new IntersectionObserver((entries) => {
        const isHeaderScrolled = header.classList.contains('shadow-md');
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const navLinksToUpdate = document.querySelectorAll('#navbar-sticky a');
                navLinksToUpdate.forEach(link => {
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

    // --- Scroll-triggered Animations ---
    const animationTargets = document.querySelectorAll('.animate-on-scroll, .animate-fade-in');
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element after it has animated
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animationTargets.forEach(target => {
        animationObserver.observe(target);
    });

    // --- Trade Modal & Form Logic ---
    const tradeModal = document.getElementById('trade-modal');
    const tradeModalContent = document.getElementById('trade-modal-content');
    const openModalButton = document.getElementById('trade-with-us-button');
    const closeModalButton = document.getElementById('close-modal-button');
    
    const tradeForm = document.getElementById('trade-form');
    const formContainer = document.getElementById('form-container');
    const thankYouSection = document.getElementById('thank-you-section');
    const quantitySelect = document.getElementById('quantity');
    const fclNumberContainer = document.getElementById('fcl-number-container');
    const fclNumberInput = document.getElementById('fcl-number');
    
    const countrySelect = document.getElementById('country');
    const postalCodeInput = document.getElementById('postal-code');
    const cityInput = document.getElementById('trade-city');
    const stateInput = document.getElementById('trade-state');
    const postalCodeStatus = document.getElementById('postal-code-status');
    const tradeSubmitButton = tradeForm.querySelector('button[type="submit"]');
    const tradeFormStatus = document.getElementById('trade-form-status');

    const openModal = () => {
        tradeModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        tradeModalContent.classList.remove('scale-100', 'opacity-100');
        tradeModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            tradeModal.classList.remove('is-open');
            document.body.style.overflow = '';
        }, 300); // Match transition duration
    };

    openModalButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    tradeModal.addEventListener('click', (event) => {
        if (event.target === tradeModal) {
            closeModal();
        }
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && tradeModal.classList.contains('is-open')) {
            closeModal();
        }
    });

    // Conditional Field for FCL Quantity
    quantitySelect.addEventListener('change', () => {
        if (quantitySelect.value === 'FCL') {
            fclNumberContainer.classList.remove('hidden');
            fclNumberInput.required = true;
        } else {
            fclNumberContainer.classList.add('hidden');
            fclNumberInput.required = false;
            fclNumberInput.value = '';
        }
    });

    // Location Auto-fill Logic
    const fetchLocationInfo = async () => {
        const countryCode = countrySelect.value;
        const postalCode = postalCodeInput.value.trim();

        if (countryCode && postalCode) {
            postalCodeStatus.textContent = 'Fetching location...';
            postalCodeStatus.className = 'text-sm mt-1 text-gray-500';
            cityInput.value = '';
            stateInput.value = '';

            try {
                const response = await fetch(`https://api.zippopotam.us/${countryCode}/${postalCode}`);
                if (!response.ok) {
                    throw new Error('Invalid postal code for the selected country.');
                }
                const data = await response.json();
                
                if (data && data.places && data.places.length > 0) {
                    const place = data.places[0];
                    cityInput.value = place['place name'] || '';
                    stateInput.value = place['state'] || '';
                    postalCodeStatus.textContent = 'Location found!';
                    postalCodeStatus.className = 'text-sm mt-1 text-green-600';
                } else {
                     throw new Error('Location not found.');
                }
            } catch (error) {
                postalCodeStatus.textContent = error.message || 'Could not fetch location.';
                postalCodeStatus.className = 'text-sm mt-1 text-red-600';
            }
        } else {
             postalCodeStatus.textContent = '';
        }
    };
    
    countrySelect.addEventListener('change', fetchLocationInfo);
    postalCodeInput.addEventListener('blur', fetchLocationInfo);


    // Trade Form Submission
    tradeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!tradeForm.checkValidity()) {
            tradeForm.reportValidity();
            return;
        }
        
        tradeSubmitButton.disabled = true;
        tradeSubmitButton.textContent = 'Submitting...';
        if(tradeFormStatus) {
            tradeFormStatus.textContent = '';
            tradeFormStatus.className = 'mt-4 text-center';
        }

        const formData = new FormData(tradeForm);
        const data = Object.fromEntries(formData.entries());
        const countryName = countrySelect.options[countrySelect.selectedIndex].text;

        // --- 1. Send SMS (via WhatsApp) ---
        // The form data is sent to the specified mobile number using a WhatsApp link.
        // This provides an instant notification similar to an SMS.
        let message = `*New Trade Inquiry from ${data['full-name']}*\n\n`;
        message += `*Category:* ${data.category}\n`;
        message += `*Commodity Type:* ${data['commodity-type']}\n`;
        message += `*Specific Product:* ${data['specific-product']}\n`;
        message += `*Quantity:* ${data.quantity}\n`;
        if (data.quantity === 'FCL' && data['fcl-number']) {
            message += `*Number of FCL:* ${data['fcl-number']}\n`;
        }
        message += `\n*Contact & Location:*\n`;
        message += `*Name:* ${data['full-name']}\n`;
        message += `*Phone:* +91${data['contact-number']}\n`;
        message += `*Email:* ${data.email}\n`;
        message += `*Address:* ${data.address}\n`;
        message += `*City:* ${data.city}\n`;
        message += `*State/Province:* ${data.state}\n`;
        message += `*Postal Code:* ${data['postal-code']}\n`;
        message += `*Country:* ${countryName}`;

        const whatsappNumber = '919699085715';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // --- 2. Send Email (via Formspree) ---
        // The form is configured to send data to a Formspree endpoint.
        // Formspree then emails the data to the configured address (Globalpathtrades@gmail.com).
        // The subject can be configured in the Formspree dashboard to "New Trade Inquiry Received".
        try {
            const response = await fetch(tradeForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // --- 3. Show Success ---
                formContainer.classList.add('hidden');
                thankYouSection.classList.remove('hidden');
                triggerConfetti();

                setTimeout(() => {
                    closeModal();
                    setTimeout(() => {
                        formContainer.classList.remove('hidden');
                        thankYouSection.classList.add('hidden');
                        tradeForm.reset();
                        postalCodeStatus.textContent = '';
                        if(tradeFormStatus) tradeFormStatus.textContent = '';
                        tradeSubmitButton.disabled = false;
                        tradeSubmitButton.textContent = 'Submit Inquiry';
                    }, 500);
                }, 5000);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error || 'Something went wrong with the email submission.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            if(tradeFormStatus) {
                tradeFormStatus.textContent = `Submission failed. Please try again. (Error: ${error.message})`;
                tradeFormStatus.classList.add('text-red-600');
            }
            tradeSubmitButton.disabled = false;
            tradeSubmitButton.textContent = 'Submit Inquiry';
        }
    });
    
    // Confetti Animation
    function triggerConfetti() {
        const container = thankYouSection;
        if (!container) return;
        
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const piece = document.createElement('div');
                piece.style.position = 'absolute';
                piece.style.left = `${Math.random() * 100}%`;
                piece.style.top = `${-20}px`;
                piece.style.width = `${Math.random() * 8 + 4}px`;
                piece.style.height = piece.style.width;
                piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                piece.style.opacity = `${Math.random() + 0.5}`;
                piece.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                const animation = piece.animate([
                    { transform: `translateY(0px) rotate(${Math.random() * 360}deg)`, opacity: 1 },
                    { transform: `translateY(${container.offsetHeight + 20}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 3000 + 4000,
                    easing: 'ease-out',
                    iterations: 1
                });
                
                animation.onfinish = () => piece.remove();
                
                container.appendChild(piece);
            }, i * 15);
        }
    }
});