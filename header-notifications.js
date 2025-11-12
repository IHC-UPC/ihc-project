const HeaderNotifications = {
    headerNotifBtn: null,
    notifDropdown: null,
    headerNotifBadge: null,
    notifDropdownContent: null,
    markAllReadHeader: null,

    init() {
        this.headerNotifBtn = document.getElementById('headerNotifBtn');
        this.notifDropdown = document.getElementById('notifDropdown');
        this.headerNotifBadge = document.getElementById('headerNotifBadge');
        this.notifDropdownContent = document.getElementById('notifDropdownContent');
        this.markAllReadHeader = document.getElementById('markAllReadHeader');

        this.setupEventListeners();
        this.render();
        
        setInterval(() => this.render(), 5000);
    },

    setupEventListeners() {
        if (this.headerNotifBtn) {
            this.headerNotifBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.notifDropdown.classList.toggle('show');
                if (this.notifDropdown.classList.contains('show')) {
                    this.render();
                }
            });
        }

        if (this.markAllReadHeader) {
            this.markAllReadHeader.addEventListener('click', (e) => {
                e.stopPropagation();
                AppState.marcarTodasLeidas();
                this.render();
                if (typeof showNotification === 'function') {
                    showNotification('success', 'Todas las notificaciones marcadas como leídas');
                }
            });
        }

        document.addEventListener('click', (e) => {
            if (this.notifDropdown && !this.notifDropdown.contains(e.target) && 
                this.headerNotifBtn && !this.headerNotifBtn.contains(e.target)) {
                this.notifDropdown.classList.remove('show');
            }
        });
    },

    render() {
        const notificaciones = AppState.getNotificacionesNoLeidas();
        
        if (this.headerNotifBadge) {
            const count = notificaciones.length;
            this.headerNotifBadge.textContent = count;
            this.headerNotifBadge.style.display = count > 0 ? 'flex' : 'none';
        }
        
        if (this.notifDropdownContent) {
            if (notificaciones.length === 0) {
                this.notifDropdownContent.innerHTML = `
                    <div class="notif-empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                        <p>No tienes notificaciones nuevas</p>
                    </div>
                `;
            } else {
                this.notifDropdownContent.innerHTML = '';
                notificaciones.forEach(notif => {
                    const notifItem = document.createElement('div');
                    notifItem.className = `notif-item ${notif.leida ? '' : 'unread'}`;
                    notifItem.dataset.id = notif.id;
                    
                    const icon = notif.tipo === 'alerta' ? '⚠️' : '💡';
                    
                    notifItem.innerHTML = `
                        <div class="notif-item-header">
                            <div class="notif-icon ${notif.tipo}">
                                ${icon}
                            </div>
                            <div class="notif-item-title">${notif.titulo}</div>
                        </div>
                        <div class="notif-item-desc">${notif.descripcion || notif.mensaje}</div>
                        <div class="notif-item-time">${this.formatearTiempo(notif.tiempo || notif.timestamp)}</div>
                    `;
                    
                    notifItem.addEventListener('click', () => {
                        AppState.marcarNotificacionLeida(notif.id);
                        this.render();
                        if (typeof showNotification === 'function') {
                            showNotification('success', 'Notificación marcada como leída');
                        }
                    });
                    
                    this.notifDropdownContent.appendChild(notifItem);
                });
            }
        }
    },

    formatearTiempo(timestamp) {
        const ahora = Date.now();
        const diferencia = ahora - timestamp;
        const minutos = Math.floor(diferencia / 60000);
        const horas = Math.floor(diferencia / 3600000);
        const dias = Math.floor(diferencia / 86400000);
        
        if (minutos < 1) return 'Ahora';
        if (minutos < 60) return `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
        if (horas < 24) return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
        return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AppState !== 'undefined') {
        HeaderNotifications.init();
    }
});
