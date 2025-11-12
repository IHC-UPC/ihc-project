const notificationData = {
    alertas: [
        {
            id: 1,
            tipo: 'alerta',
            titulo: 'Consumo energético aumentado',
            descripcion: 'El consumo de energía ha aumentado un 35% en las últimas 24 horas. Se recomienda revisar los dispositivos activos.',
            tiempo: 'Hace 5 minutos',
            leida: false
        },
        {
            id: 2,
            tipo: 'alerta',
            titulo: 'Aire acondicionado consume mucho',
            descripcion: 'El aire acondicionado en el dormitorio principal está consumiendo más energía de lo habitual.',
            tiempo: 'Hace 2 horas',
            leida: false
        },
        {
            id: 3,
            tipo: 'alerta',
            titulo: 'Zona de casa detectada sin uso',
            descripcion: 'Se detectaron dispositivos encendidos en la sala de estar sin actividad durante 3 horas.',
            tiempo: 'Hace 5 horas',
            leida: true
        }
    ],
    recomendaciones: [
        {
            id: 4,
            tipo: 'recomendacion',
            titulo: 'Apaga dispositivos en stand-by',
            descripcion: 'Desconecta los dispositivos que no estés usando. Podrías ahorrar hasta S/. 45 al mes.',
            tiempo: 'Hace 1 hora',
            leida: false
        },
        {
            id: 5,
            tipo: 'recomendacion',
            titulo: 'Usa iluminación LED',
            descripcion: 'Reemplaza las bombillas tradicionales por LED. Reducirás el consumo de iluminación en un 75%.',
            tiempo: 'Hace 3 horas',
            leida: false
        },
        {
            id: 6,
            tipo: 'recomendacion',
            titulo: 'Optimiza temperatura del refrigerador',
            descripcion: 'Ajusta el refrigerador a 3-4°C y el congelador a -18°C para un consumo óptimo.',
            tiempo: 'Hace 6 horas',
            leida: false
        }
    ]
};

const floatingBtn = document.getElementById('floatingBtn');
const floatingPanel = document.getElementById('floatingPanel');
const closePanel = document.getElementById('closePanel');
const floatingContent = document.getElementById('floatingContent');
const floatingBadge = document.querySelector('.floating-badge');
const markAllReadBtn = document.getElementById('markAllRead');

function createFloatingNotification(notif) {
    const item = document.createElement('div');
    item.className = `floating-notif-item ${notif.tipo}`;
    item.dataset.id = notif.id;

    item.innerHTML = `
        <div class="floating-notif-title">${notif.titulo}</div>
        <div class="floating-notif-desc">${notif.descripcion}</div>
        <div class="floating-notif-time">${notif.tiempo}</div>
    `;

    item.addEventListener('click', () => {
        markAsRead(notif.id);
    });

    return item;
}

function renderFloatingNotifications() {
    floatingContent.innerHTML = '';

    const todasNotificaciones = [
        ...notificationData.alertas,
        ...notificationData.recomendaciones
    ].sort((a, b) => {
        const timeA = parseTimeString(a.tiempo);
        const timeB = parseTimeString(b.tiempo);
        return timeA - timeB;
    });

    if (todasNotificaciones.length === 0) {
        floatingContent.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <p>No tienes notificaciones</p>
            </div>
        `;
        return;
    }

    todasNotificaciones.forEach(notif => {
        floatingContent.appendChild(createFloatingNotification(notif));
    });
}

function parseTimeString(timeStr) {
    const match = timeStr.match(/(\d+)\s*(minuto|hora|día)/);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2];

    if (unit === 'minuto') return value;
    if (unit === 'hora') return value * 60;
    if (unit === 'día') return value * 1440;
    return 0;
}

function updateBadgeCount() {
    const unreadCount = [
        ...notificationData.alertas,
        ...notificationData.recomendaciones
    ].filter(notif => !notif.leida).length;

    if (floatingBadge) {
        floatingBadge.textContent = unreadCount;
        floatingBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

function markAsRead(id) {
    const alerta = notificationData.alertas.find(a => a.id === id);
    const recomendacion = notificationData.recomendaciones.find(r => r.id === id);

    if (alerta) alerta.leida = true;
    if (recomendacion) recomendacion.leida = true;

    renderFloatingNotifications();
    updateBadgeCount();
    showNotification('success', 'Notificación marcada como leída');
}

if (floatingBtn) {
    floatingBtn.addEventListener('click', () => {
        floatingPanel.classList.toggle('show');
        if (floatingPanel.classList.contains('show')) {
            renderFloatingNotifications();
        }
    });
}

if (closePanel) {
    closePanel.addEventListener('click', () => {
        floatingPanel.classList.remove('show');
    });
}

document.addEventListener('click', (e) => {
    if (floatingPanel && floatingBtn && !floatingPanel.contains(e.target) && !floatingBtn.contains(e.target)) {
        floatingPanel.classList.remove('show');
    }
});

if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        notificationData.alertas.forEach(a => a.leida = true);
        notificationData.recomendaciones.forEach(r => r.leida = true);
        renderFloatingNotifications();
        updateBadgeCount();
        showNotification('success', 'Todas las notificaciones marcadas como leídas');
    });
}

function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #2ecc71, #27ae60)' : 
                     type === 'error' ? 'linear-gradient(135deg, #ff6b6b, #ee5a6f)' : 
                     type === 'warning' ? 'linear-gradient(135deg, #FFC107, #FF9800)' :
                     'linear-gradient(135deg, #0A84FF, #00D9FF)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.4s ease, slideOutRight 0.4s ease 2.6s;
    `;
    notification.textContent = message;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;

    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

updateBadgeCount();
renderFloatingNotifications();
