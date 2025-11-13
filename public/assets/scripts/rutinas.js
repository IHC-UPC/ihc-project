// Cargar rutinas desde localStorage o usar rutinas por defecto
let rutinas = JSON.parse(localStorage.getItem('smartwatt_rutinas')) || [
    { 
        id: 1, 
        nombre: 'Computadora', 
        activa: true, 
        encendido: '7:00 AM', 
        apagado: '11:00 PM',
        estado: true,
        imagen: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop'
    },
    { 
        id: 2, 
        nombre: 'Cargador', 
        activa: true, 
        encendido: '6:00 AM', 
        apagado: '5:00 PM',
        estado: true,
        imagen: 'https://images.unsplash.com/photo-1564404493814-0b1629f77cfe?w=400&h=300&fit=crop'
    },
    { 
        id: 3, 
        nombre: 'Refrigerador', 
        activa: true, 
        encendido: '7:00 AM', 
        apagado: '11:00 PM',
        estado: true,
        imagen: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop'
    },
    { 
        id: 4, 
        nombre: 'Televisor', 
        activa: false, 
        encendido: '7:00 AM', 
        apagado: '7:00 PM',
        estado: false,
        imagen: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop'
    }
];

// Asignar imágenes por defecto a rutinas antiguas que no las tengan
const imagenesDefault = {
    'Computadora': 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop',
    'Cargador': 'https://images.unsplash.com/photo-1564404493814-0b1629f77cfe?w=400&h=300&fit=crop',
    'Refrigerador': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop',
    'Televisor': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop'
};

rutinas.forEach(rutina => {
    if (!rutina.imagen) {
        rutina.imagen = imagenesDefault[rutina.nombre] || 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop';
    }
});

// Guardar rutinas actualizadas
if (localStorage.getItem('smartwatt_rutinas')) {
    localStorage.setItem('smartwatt_rutinas', JSON.stringify(rutinas));
}

// Guardar rutinas en localStorage
function guardarRutinas() {
    localStorage.setItem('smartwatt_rutinas', JSON.stringify(rutinas));
}

function initializeToggleSwitches() {
    const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
    toggleSwitches.forEach((toggle, index) => {
        toggle.addEventListener('change', function() {
            const rutinaCard = this.closest('.rutina-card');
            const statusSpan = rutinaCard.querySelector('.rutina-toggle span');
            const badge = rutinaCard.querySelector('.rutina-badge');
            if (this.checked) {
                statusSpan.textContent = 'Encendido';
                statusSpan.style.color = '#2ecc71';
                badge.textContent = 'Activa';
                badge.classList.remove('inactiva');
                badge.classList.add('activa');
                rutinas[index].estado = true;
                rutinas[index].activa = true;
                showNotification('success', `${rutinas[index].nombre} activada correctamente`);
            } else {
                statusSpan.textContent = 'Apagado';
                statusSpan.style.color = 'rgba(255, 255, 255, 0.6)';
                badge.textContent = 'Inactiva';
                badge.classList.remove('activa');
                badge.classList.add('inactiva');
                rutinas[index].estado = false;
                rutinas[index].activa = false;
                showNotification('info', `${rutinas[index].nombre} desactivada`);
            }
            guardarRutinas(); // Guardar cambios en localStorage
            console.log('Rutina actualizada:', rutinas[index]);
        });
    });
}
function initializeCarousel() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const rutinasGrid = document.querySelector('.rutinas-grid');
    if (!rutinasGrid) return;
    const scrollAmount = 350; 
    prevBtn.addEventListener('click', () => {
        rutinasGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    nextBtn.addEventListener('click', () => {
        rutinasGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    function updateCarouselButtons() {
        const maxScroll = rutinasGrid.scrollWidth - rutinasGrid.clientWidth;
        if (maxScroll <= 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            if (rutinasGrid.scrollLeft <= 0) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }
            if (rutinasGrid.scrollLeft >= maxScroll - 5) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        }
    }
    rutinasGrid.addEventListener('scroll', updateCarouselButtons);
    window.addEventListener('resize', updateCarouselButtons);
    updateCarouselButtons();
}

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
document.addEventListener('DOMContentLoaded', () => {
    console.log('SmartWatt - Rutinas cargadas');
    renderizarRutinas(); // Renderizar rutinas desde localStorage
    initializeToggleSwitches();
    initializeCarousel();
    initializeDeleteButtons(); // Inicializar botones de eliminar
});

// Función para renderizar todas las rutinas
function renderizarRutinas() {
    const rutinasGrid = document.querySelector('.rutinas-grid');
    if (!rutinasGrid) return;
    
    // Limpiar grid
    rutinasGrid.innerHTML = '';
    
    // Renderizar cada rutina
    rutinas.forEach(rutina => {
        const card = crearCardRutina(rutina);
        rutinasGrid.insertAdjacentHTML('beforeend', card);
    });
}

// Función para inicializar botones de eliminar
function initializeDeleteButtons() {
    document.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.btn-delete-rutina');
        if (deleteBtn) {
            const rutinaId = parseInt(deleteBtn.getAttribute('data-rutina-id'));
            eliminarRutina(rutinaId);
        }
    });
}

// Función para eliminar una rutina
function eliminarRutina(id) {
    const rutina = rutinas.find(r => r.id === id);
    if (!rutina) return;
    
    // Confirmar eliminación
    if (confirm(`¿Estás seguro de eliminar la rutina "${rutina.nombre}"?`)) {
        // Encontrar índice y eliminar
        const index = rutinas.findIndex(r => r.id === id);
        if (index !== -1) {
            rutinas.splice(index, 1);
            
            // Guardar cambios
            guardarRutinas();
            
            // Re-renderizar
            renderizarRutinas();
            
            // Reinicializar event listeners
            initializeToggleSwitches();
            
            // Mostrar notificación
            showNotification('success', `Rutina "${rutina.nombre}" eliminada correctamente`);
        }
    }
}

window.SmartWattRutinas = {
    getRutinas: () => rutinas,
    toggleRutina: (id) => {
        const rutina = rutinas.find(r => r.id === id);
        if (rutina) {
            rutina.estado = !rutina.estado;
            rutina.activa = !rutina.activa;
            return rutina;
        }
        return null;
    },
    addRutina: (nuevaRutina) => {
        rutinas.push({
            id: rutinas.length + 1,
            ...nuevaRutina
        });
        return rutinas;
    }
};

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
    inicializarModalNuevaRutina();
});

/* ===========================
   Modal Nueva Rutina
   =========================== */
function inicializarModalNuevaRutina() {
    const btnNuevaRutina = document.querySelector('.btn-nueva-rutina');
    const modalOverlay = document.getElementById('modalNuevaRutina');
    const closeModal = document.getElementById('closeModalRutina');
    const cancelarBtn = document.getElementById('cancelarRutina');
    const formNuevaRutina = document.getElementById('formNuevaRutina');

    // Abrir modal
    btnNuevaRutina.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modal
    function cerrarModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        formNuevaRutina.reset();
    }

    closeModal.addEventListener('click', cerrarModal);
    cancelarBtn.addEventListener('click', cerrarModal);

    // Cerrar al hacer click fuera del modal
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            cerrarModal();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            cerrarModal();
        }
    });

    // Manejar envío del formulario
    formNuevaRutina.addEventListener('submit', (e) => {
        e.preventDefault();
        crearNuevaRutina();
    });
}

function crearNuevaRutina() {
    const nombreDispositivo = document.getElementById('nombreDispositivo').value;
    const horaEncendido = document.getElementById('horaEncendido').value;
    const horaApagado = document.getElementById('horaApagado').value;
    const imagenDispositivo = document.getElementById('imagenDispositivo').value;
    const activarInmediatamente = document.getElementById('activarInmediatamente').checked;

    // Convertir hora de 24h a formato AM/PM
    function formatearHora(hora) {
        const [hours, minutes] = hora.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    }

    // Crear nueva rutina
    const nuevaRutina = {
        id: rutinas.length + 1,
        nombre: nombreDispositivo,
        activa: activarInmediatamente,
        encendido: formatearHora(horaEncendido),
        apagado: formatearHora(horaApagado),
        estado: activarInmediatamente,
        imagen: imagenDispositivo
    };

    // Añadir a array de rutinas
    rutinas.push(nuevaRutina);
    
    // Guardar en localStorage
    guardarRutinas();

    // Crear el HTML de la nueva card
    const rutinasGrid = document.querySelector('.rutinas-grid');
    const nuevaCard = crearCardRutina(nuevaRutina);
    rutinasGrid.insertAdjacentHTML('beforeend', nuevaCard);

    // Reinicializar los event listeners para la nueva card
    initializeToggleSwitches();

    // Cerrar modal
    document.getElementById('modalNuevaRutina').classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('formNuevaRutina').reset();

    // Mostrar notificación de éxito
    showNotification('success', `¡Rutina "${nombreDispositivo}" creada exitosamente!`);

    // Scroll a la nueva rutina
    setTimeout(() => {
        const nuevaCardElement = rutinasGrid.lastElementChild;
        nuevaCardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 100);

    console.log('Nueva rutina creada:', nuevaRutina);
}

function crearCardRutina(rutina) {
    return `
        <div class="rutina-card" data-rutina-id="${rutina.id}">
            <div class="rutina-image">
                <img src="${rutina.imagen || 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop'}" alt="${rutina.nombre}">
                <div class="rutina-badge ${rutina.activa ? 'activa' : 'inactiva'}">
                    ${rutina.activa ? 'Activa' : 'Inactiva'}
                </div>
                <button class="btn-delete-rutina" data-rutina-id="${rutina.id}" title="Eliminar rutina">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                </button>
            </div>
            <div class="rutina-info">
                <h4>${rutina.nombre}</h4>
                <div class="rutina-schedule">
                    <div class="schedule-item">
                        <span class="schedule-label">Encendido</span>
                        <span class="schedule-time">${rutina.encendido}</span>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    <div class="schedule-item">
                        <span class="schedule-label">Apagado</span>
                        <span class="schedule-time">${rutina.apagado}</span>
                    </div>
                </div>
                <div class="rutina-toggle">
                    <label class="switch">
                        <input type="checkbox" ${rutina.estado ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                    <span style="color: ${rutina.estado ? '#2ecc71' : 'rgba(255, 255, 255, 0.6)'};">
                        ${rutina.estado ? 'Encendido' : 'Apagado'}
                    </span>
                </div>
            </div>
        </div>
    `;
}


