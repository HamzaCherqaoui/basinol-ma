/**
 * BASINOL Website - Contact Form
 * French version
 */

document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
});

/**
 * Initialize Contact Form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    // Add form submission handler
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate form
        if (validateForm(this)) {
            // In a real implementation, this would submit the form data to a server
            // For this demo, we'll just show a success message
            showFormMessage('success', 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.');

            // Reset form
            this.reset();
        }
    });

    // Add input validation on blur
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateInput(this);
        });
    });
}

/**
 * Validate the entire form
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;

    // Validate each required input
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    // Check if privacy checkbox is checked
    const privacyCheckbox = form.querySelector('#privacy');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        showInputError(privacyCheckbox, 'Veuillez accepter la politique de confidentialité.');
        isValid = false;
    }

    return isValid;
}

/**
 * Validate a single input
 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} input - The input to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
    // Skip validation for non-required empty inputs
    if (!input.required && !input.value.trim()) {
        clearInputError(input);
        return true;
    }

    // Check if input is empty
    if (input.required && !input.value.trim()) {
        showInputError(input, 'Ce champ est requis.');
        return false;
    }

    // Validate email format
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            showInputError(input, 'Veuillez entrer une adresse email valide.');
            return false;
        }
    }

    // Validate phone format (optional)
    if (input.type === 'tel' && input.value.trim()) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(input.value)) {
            showInputError(input, 'Veuillez entrer un numéro de téléphone valide.');
            return false;
        }
    }

    // Validate select
    if (input.tagName === 'SELECT' && input.required && input.value === '') {
        showInputError(input, 'Veuillez sélectionner une option.');
        return false;
    }

    // If we get here, the input is valid
    clearInputError(input);
    return true;
}

/**
 * Show an error message for an input
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showInputError(input, message) {
    // Clear any existing error
    clearInputError(input);

    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;

    // Add error class to input
    input.classList.add('error');

    // Add error message after input
    if (input.type === 'checkbox' || input.type === 'radio') {
        // For checkboxes and radios, add after the label
        const label = input.closest('label') || input.parentNode;
        label.parentNode.appendChild(errorElement);
    } else {
        // For other inputs, add after the input
        input.parentNode.appendChild(errorElement);
    }
}

/**
 * Clear error message for an input
 * @param {HTMLElement} input - The input element
 */
function clearInputError(input) {
    // Remove error class from input
    input.classList.remove('error');

    // Find and remove error message
    let parent = input.parentNode;
    if (input.type === 'checkbox' || input.type === 'radio') {
        // For checkboxes and radios, look in the label's parent
        const label = input.closest('label') || input.parentNode;
        parent = label.parentNode;
    }

    const errorElement = parent.querySelector('.form-error');
    if (errorElement) {
        parent.removeChild(errorElement);
    }
}

/**
 * Show a form message (success or error)
 * @param {string} type - Message type ('success' or 'error')
 * @param {string} message - The message text
 */
function showFormMessage(type, message) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Add message to the form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageElement, form);

    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Remove success message after a delay
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Add CSS for form validation
document.addEventListener('DOMContentLoaded', function () {
    addFormStyles();
});

/**
 * Add required CSS styles for form validation
 */
function addFormStyles() {
    // Check if styles already exist
    if (document.getElementById('contact-form-styles')) return;

    // Create style element
    const style = document.createElement('style');
    style.id = 'contact-form-styles';

    // Add CSS rules
    style.textContent = `
        .form-error {
            color: #d32f2f;
            font-size: 0.85rem;
            margin-top: 0.25rem;
        }
        
        input.error,
        textarea.error,
        select.error {
            border-color: #d32f2f !important;
        }
        
        .form-message {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 5px;
        }
        
        .form-message.success {
            background-color: #e8f5e9;
            color: #388e3c;
            border: 1px solid #c8e6c9;
        }
        
        .form-message.error {
            background-color: #ffebee;
            color: #d32f2f;
            border: 1px solid #ffcdd2;
        }
    `;

    // Add to document head
    document.head.appendChild(style);
}
