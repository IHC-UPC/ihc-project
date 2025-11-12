const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
if (togglePassword) {
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
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
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un correo válido', 'error');
            return;
        }
        if (password.length < 6) {
            showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }
        showLoading();
        setTimeout(() => {
            hideLoading();
            
            // Usuarios por defecto (admin)
            const usuariosDefault = [
                { email: 'leonardo@smartwatt.com', password: '123456' },
                { email: 'admin@smartwatt.com', password: 'admin123' },
                { email: 'demo@smartwatt.com', password: 'demo123' }
            ];
            
            // Obtener usuarios registrados del localStorage
            const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
            
            // Combinar usuarios default con registrados
            const todosLosUsuarios = [...usuariosDefault, ...usuariosRegistrados];
            
            // Buscar usuario
            const usuario = todosLosUsuarios.find(u => u.email === email && u.password === password);
            
            if (usuario) {
                showNotification('¡Inicio de sesión exitoso!', 'success');
                if (remember) {
                    localStorage.setItem('rememberedEmail', email);
                }
                localStorage.setItem('smartwatt_logged_in', 'true');
                localStorage.setItem('smartwatt_user_email', email);
                
                // Guardar nombre si existe
                if (usuario.nombre) {
                    localStorage.setItem('smartwatt_user_name', usuario.nombre + ' ' + usuario.apellido);
                }
                
                setTimeout(() => {
                    window.location.href = 'home.html'; 
                }, 1500);
            } else {
                showNotification('Credenciales incorrectas. Intenta de nuevo.', 'error');
            }
        }, 2000);
    });
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    }, 4000);
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
        <span>Iniciando sesión...</span>
    `;
}
function hideLoading() {
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
        <span>Iniciar Sesión</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
}
window.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
});
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
        showNotification(`Iniciando sesión con ${provider}...`, 'success');
        setTimeout(() => {
            showNotification(`Login con ${provider} no implementado aún`, 'error');
        }, 2000);
    });
});
const formElements = document.querySelectorAll('.form-group, .form-options, .btn-submit, .divider, .social-login, .signup-link');
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
const emailInput = document.getElementById('email');
const passwordField = document.getElementById('password');
emailInput.addEventListener('input', function() {
    if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});
passwordField.addEventListener('input', function() {
    if (this.value && this.value.length < 6) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});
console.log('%c¡Bienvenido a SmartWatt! ', 'background: linear-gradient(135deg, #0A84FF, #00D9FF); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cInicia sesión para acceder a tu panel de control', 'color: #0A84FF; font-size: 14px;');

