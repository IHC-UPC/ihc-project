document.addEventListener('DOMContentLoaded', () => {
    console.log('SmartWatt - Página de inicio cargada');
    
    setTimeout(() => {
        showNotification('success', '¡Bienvenido a SmartWatt!');
    }, 500);
});

function showNotification(type, message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    notification.innerHTML = `
        ${icons[type]}
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }

    .notification svg {
        flex-shrink: 0;
    }

    .notification span {
        font-size: 0.95rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
    }

    .notification.success {
        border-color: #2ecc71;
    }

    .notification.success svg {
        stroke: #2ecc71;
    }

    .notification.error {
        border-color: #ff6b6b;
    }

    .notification.error svg {
        stroke: #ff6b6b;
    }

    .notification.warning {
        border-color: #FFC107;
    }

    .notification.warning svg {
        stroke: #FFC107;
    }

    .notification.info {
        border-color: #0A84FF;
    }

    .notification.info svg {
        stroke: #0A84FF;
    }
`;
document.head.appendChild(notificationStyles);

const floatingBtn = document.getElementById('floatingBtn');
const floatingPanel = document.getElementById('floatingPanel');
const closePanel = document.getElementById('closePanel');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

if (floatingBtn) {
    floatingBtn.addEventListener('click', () => {
        floatingPanel.classList.toggle('show');
        if (floatingPanel.classList.contains('show')) {
            ChatIA.renderizarMensajes();
            chatInput?.focus();
        }
    });
}

if (closePanel) {
    closePanel.addEventListener('click', () => {
        floatingPanel.classList.remove('show');
    });
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mensaje = chatInput.value.trim();
        
        if (mensaje) {
            ChatIA.agregarMensaje(mensaje, true);
            ChatIA.renderizarMensajes();
            chatInput.value = '';
            chatInput.focus();
        }
    });
}

document.addEventListener('click', (e) => {
    if (floatingPanel && floatingBtn && !floatingPanel.contains(e.target) && !floatingBtn.contains(e.target)) {
        floatingPanel.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    ChatIA.inicializar();
});
