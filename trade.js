document.addEventListener('DOMContentLoaded', () => {

    // --- Header Mobile Menu Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navbar = document.getElementById('navbar-sticky');

    mobileMenuButton.addEventListener('click', () => {
        navbar.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', navbar.classList.contains('hidden') ? 'false' : 'true');
    });

    // --- Trade Form Logic ---
    const form = document.getElementById('trade-form');
    const formContainer = document.getElementById('form-container');
    const thankYouSection = document.getElementById('thank-you-section');
    const quantitySelect = document.getElementById('quantity');
    const fclNumberContainer = document.getElementById('fcl-number-container');
    const fclNumberInput = document.getElementById('fcl-number');

    const countrySelect = document.getElementById('country');
    const postalCodeInput = document.getElementById('postal-code');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const postalCodeStatus = document.getElementById('postal-code-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('form-status');

    // --- Conditional Field for FCL Quantity ---
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
    
    // --- Location Auto-fill Logic ---
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


    // --- Form Submission ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        formStatus.textContent = '';
        formStatus.className = 'mt-4 text-center';

        const formData = new FormData(form);
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
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // --- 3. Show Success ---
                formContainer.classList.add('hidden');
                thankYouSection.classList.remove('hidden');
                triggerConfetti();

                // Reset form for potential future use without page reload
                setTimeout(() => {
                     form.reset();
                     postalCodeStatus.textContent = '';
                     submitButton.disabled = false;
                     submitButton.textContent = 'Submit Inquiry';
                }, 500);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error || 'Something went wrong with the email submission.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            formStatus.textContent = `Submission failed. Please try again. (Error: ${error.message})`;
            formStatus.classList.add('text-red-600');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Inquiry';
        }
    });
    
    // --- Confetti Animation ---
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