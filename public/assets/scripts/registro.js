const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
function setupPasswordToggle(button, input) {
    if (button && input) {
        button.addEventListener('click', function() {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            const eyeIcon = this.querySelector('.eye-icon');
            if (type === 'text') {
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                `;
            } else {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                `;
            }
        });
    }
}
setupPasswordToggle(togglePassword, passwordInput);
setupPasswordToggle(toggleConfirmPassword, confirmPasswordInput);
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = calculatePasswordStrength(password);
    strengthFill.className = 'strength-fill';
    if (password.length === 0) {
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Ingresa una contraseña';
        strengthText.style.color = '#718096';
        return;
    }
    if (strength < 40) {
        strengthFill.classList.add('weak');
        strengthText.textContent = 'Débil - Añade más caracteres';
        strengthText.style.color = '#ee5a6f';
    } else if (strength < 70) {
        strengthFill.classList.add('medium');
        strengthText.textContent = 'Media - Casi ahí';
        strengthText.style.color = '#feca57';
    } else {
        strengthFill.classList.add('strong');
        strengthText.textContent = 'Fuerte - ¡Excelente!';
        strengthText.style.color = '#0A84FF';
    }
});
function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
    return strength;
}
const registroForm = document.getElementById('registroForm');
if (registroForm) {
    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        if (nombre.length < 2) {
            showNotification('El nombre debe tener al menos 2 caracteres', 'error');
            return;
        }
        if (apellido.length < 2) {
            showNotification('El apellido debe tener al menos 2 caracteres', 'error');
            return;
        }
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un correo válido', 'error');
            return;
        }
        if (!isValidPhone(telefono)) {
            showNotification('Por favor, ingresa un teléfono válido', 'error');
            return;
        }
        if (password.length < 8) {
            showNotification('La contraseña debe tener al menos 8 caracteres', 'error');
            return;
        }
        if (password !== confirmPassword) {
            showNotification('Las contraseñas no coinciden', 'error');
            return;
        }
        if (!terms) {
            showNotification('Debes aceptar los términos y condiciones', 'error');
            return;
        }
        showLoading();
        setTimeout(() => {
            hideLoading();
            const success = Math.random() > 0.2; 
            if (success) {
                showNotification('¡Cuenta creada exitosamente!', 'success');
                registroForm.reset();
                strengthFill.style.width = '0%';
                strengthText.textContent = 'Ingresa una contraseña';
                strengthText.style.color = '#718096';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showNotification('El correo ya está registrado. Intenta con otro.', 'error');
            }
        }, 2500);
    });
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s+()-]{8,}$/;
    return phoneRegex.test(phone);
}
function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    document.body.appendChild(notification);
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 30px;
                right: 30px;
                z-index: 10000;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: slideIn 0.3s ease;
                backdrop-filter: blur(10px);
            }
            .notification-success {
                background: linear-gradient(135deg, #00D9FF, #0A84FF);
                color: white;
            }
            .notification-error {
                background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
                color: white;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.8rem;
            }
            .notification-icon {
                font-size: 1.3rem;
                font-weight: bold;
            }
            .notification-message {
                font-size: 1rem;
                font-weight: 600;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
function showLoading() {
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="spinner" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.3"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
            </path>
        </svg>
        <span>Creando cuenta...</span>
    `;
}
function hideLoading() {
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
        <span>Crear Cuenta</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
}
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('telefono');
nombreInput.addEventListener('input', function() {
    if (this.value && this.value.length < 2) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});
apellidoInput.addEventListener('input', function() {
    if (this.value && this.value.length < 2) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});
emailInput.addEventListener('input', function() {
    if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});
telefonoInput.addEventListener('input', function() {
    if (this.value && !isValidPhone(this.value)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});
confirmPasswordInput.addEventListener('input', function() {
    if (this.value && this.value !== passwordInput.value) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
        showNotification(`Registrando con ${provider}...`, 'success');
        setTimeout(() => {
            showNotification(`Registro con ${provider} no implementado aún`, 'error');
        }, 2000);
    });
});
const formElements = document.querySelectorAll('.form-group, .form-row, .btn-submit, .divider, .social-login, .signup-link');
formElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100 * index);
});
const infoFeatures = document.querySelectorAll('.info-feature');
infoFeatures.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-30px)';
    feature.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        feature.style.opacity = '1';
        feature.style.transform = 'translateX(0)';
    }, 200 + (100 * index));
});
telefonoInput.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            this.value = `+${value}`;
        } else if (value.length <= 6) {
            this.value = `+${value.slice(0, 2)} ${value.slice(2)}`;
        } else {
            this.value = `+${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 8)} ${value.slice(8, 11)}`;
        }
    }
});
console.log('%c¡Únete a SmartWatt! ', 'background: linear-gradient(135deg, #0A84FF, #00D9FF); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cCrea tu cuenta y comienza a ahorrar energía', 'color: #0A84FF; font-size: 14px;');

