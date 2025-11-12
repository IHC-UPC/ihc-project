let prorrateos = [
    {
        id: 1,
        direccion: "Depto Av. X - Octubre 2025",
        periodo: "S/450.00",
        miembros: 5
    },
    {
        id: 2,
        direccion: "Depto Av. Y - Mayo 2025",
        periodo: "S/620.00",
        miembros: 6
    }
];
let ambientesSeleccionados = [];
const btnNuevoProrrateo = document.getElementById('btnNuevoProrrateo');
if (btnNuevoProrrateo) {
    btnNuevoProrrateo.addEventListener('click', () => {
        const direccion = prompt('Ingresa la dirección del nuevo prorrateo:');
        if (!direccion) return;
        const periodo = prompt('Ingresa el monto del periodo (ej: 450):');
        if (!periodo || isNaN(periodo)) {
            showNotification('Por favor ingresa un monto válido', 'warning');
            return;
        }
        const miembros = prompt('¿Cuántos miembros participan?');
        if (!miembros || isNaN(miembros)) {
            showNotification('Por favor ingresa un número válido de miembros', 'warning');
            return;
        }
        const nuevoProrrateo = {
            id: prorrateos.length + 1,
            direccion: direccion,
            periodo: `S/${periodo}.00`,
            miembros: parseInt(miembros)
        };
        prorrateos.push(nuevoProrrateo);
        agregarProrrateoDOM(nuevoProrrateo);
        showNotification('Prorrateo creado exitosamente', 'success');
    });
}
function agregarProrrateoDOM(prorrateo) {
    const prorrateosList = document.querySelector('.prorrateos-list');
    const btnScroll = document.querySelector('.btn-scroll-right');
    const card = document.createElement('div');
    card.className = 'prorrateo-card';
    card.innerHTML = `
        <div class="prorrateo-info">
            <div class="info-row">
                <span class="info-label">Dirección</span>
                <span class="info-value">${prorrateo.direccion}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Periodo</span>
                <span class="info-value">${prorrateo.periodo}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Estado</span>
                <span class="info-value members-count">${prorrateo.miembros} MIEMBROS</span>
            </div>
        </div>
        <div class="prorrateo-actions">
            <button class="btn-action btn-abrir" data-id="${prorrateo.id}">ABRIR</button>
            <button class="btn-action btn-duplicar" data-id="${prorrateo.id}">DUPLICAR</button>
            <button class="btn-action btn-eliminar" data-id="${prorrateo.id}">ELIMINAR</button>
        </div>
    `;
    prorrateosList.insertBefore(card, btnScroll);
    agregarEventosAcciones(card);
}
function agregarEventosAcciones(card) {
    const btnAbrir = card.querySelector('.btn-abrir');
    const btnDuplicar = card.querySelector('.btn-duplicar');
    const btnEliminar = card.querySelector('.btn-eliminar');
    if (btnAbrir) {
        btnAbrir.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            abrirProrrateo(id);
        });
    }
    if (btnDuplicar) {
        btnDuplicar.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            duplicarProrrateo(id);
        });
    }
    if (btnEliminar) {
        btnEliminar.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            eliminarProrrateo(id, card);
        });
    }
}
function abrirProrrateo(id) {
    const prorrateo = prorrateos.find(p => p.id === id);
    if (prorrateo) {
        showNotification(`Abriendo prorrateo: ${prorrateo.direccion}`, 'info');
    }
}
function duplicarProrrateo(id) {
    const prorrateo = prorrateos.find(p => p.id === id);
    if (prorrateo) {
        const nuevoProrrateo = {
            id: prorrateos.length + 1,
            direccion: prorrateo.direccion + ' (Copia)',
            periodo: prorrateo.periodo,
            miembros: prorrateo.miembros
        };
        prorrateos.push(nuevoProrrateo);
        agregarProrrateoDOM(nuevoProrrateo);
        showNotification('Prorrateo duplicado exitosamente', 'success');
    }
}
function eliminarProrrateo(id, card) {
    if (confirm('¿Estás seguro de eliminar este prorrateo?')) {
        prorrateos = prorrateos.filter(p => p.id !== id);
        card.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            card.remove();
            showNotification('Prorrateo eliminado', 'success');
        }, 300);
    }
}
document.querySelectorAll('.prorrateo-card').forEach(card => {
    agregarEventosAcciones(card);
});
const btnScrollRight = document.querySelector('.btn-scroll-right');
const prorrateosList = document.querySelector('.prorrateos-list');
if (btnScrollRight && prorrateosList) {
    btnScrollRight.addEventListener('click', () => {
        prorrateosList.scrollBy({
            left: 400,
            behavior: 'smooth'
        });
    });
}
const btnAgregarPersonas = document.getElementById('btnAgregarPersonas');
if (btnAgregarPersonas) {
    btnAgregarPersonas.addEventListener('click', () => {
        const nombre = prompt('Ingresa el nombre de la persona:');
        if (!nombre) return;
        const iniciales = nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const grupoContent = document.querySelector('.grupo-content');
        const nuevoMiembro = document.createElement('div');
        nuevoMiembro.className = 'miembro-item';
        nuevoMiembro.innerHTML = `
            <img src="https:
                 alt="${nombre}" 
                 class="miembro-avatar"
                 onerror="this.src='https:
            <div class="miembro-info">
                <span class="miembro-name">${iniciales}</span>
                <span class="miembro-role">| Miembro</span>
            </div>
        `;
        grupoContent.insertBefore(nuevoMiembro, btnAgregarPersonas);
        showNotification(`${nombre} agregado al grupo`, 'success');
    });
}
const botonesAmbiente = document.querySelectorAll('.btn-ambiente:not(.btn-agregar-ambiente)');
botonesAmbiente.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const ambiente = btn.dataset.ambiente;
        if (btn.classList.contains('active')) {
            ambientesSeleccionados.push(ambiente);
            showNotification(`${btn.textContent} seleccionado`, 'info');
        } else {
            ambientesSeleccionados = ambientesSeleccionados.filter(a => a !== ambiente);
            showNotification(`${btn.textContent} deseleccionado`, 'info');
        }
    });
});
const btnAgregarAmbiente = document.getElementById('btnAgregarAmbiente');
if (btnAgregarAmbiente) {
    btnAgregarAmbiente.addEventListener('click', () => {
        const nombreAmbiente = prompt('Ingresa el nombre del nuevo ambiente:');
        if (!nombreAmbiente) return;
        const ambientesGrid = document.querySelector('.ambientes-grid');
        const nuevoBtn = document.createElement('button');
        nuevoBtn.className = 'btn-ambiente';
        nuevoBtn.dataset.ambiente = nombreAmbiente.toLowerCase().replace(' ', '-');
        nuevoBtn.textContent = nombreAmbiente;
        nuevoBtn.addEventListener('click', () => {
            nuevoBtn.classList.toggle('active');
            const ambiente = nuevoBtn.dataset.ambiente;
            if (nuevoBtn.classList.contains('active')) {
                ambientesSeleccionados.push(ambiente);
                showNotification(`${nombreAmbiente} seleccionado`, 'info');
            } else {
                ambientesSeleccionados = ambientesSeleccionados.filter(a => a !== ambiente);
                showNotification(`${nombreAmbiente} deseleccionado`, 'info');
            }
        });
        ambientesGrid.insertBefore(nuevoBtn, btnAgregarAmbiente);
        showNotification(`Ambiente "${nombreAmbiente}" agregado`, 'success');
    });
}
const btnGuardar = document.querySelector('.btn-guardar');
if (btnGuardar) {
    btnGuardar.addEventListener('click', () => {
        const miembros = document.querySelectorAll('.miembro-item').length;
        const ambientes = ambientesSeleccionados.length;
        if (miembros === 0) {
            showNotification('Debes agregar al menos un miembro', 'warning');
            return;
        }
        if (ambientes === 0) {
            showNotification('Debes seleccionar al menos un ambiente', 'warning');
            return;
        }
        showNotification(`Configuración guardada: ${miembros} miembros, ${ambientes} ambientes`, 'success');
    });
}
const btnReglas = document.getElementById('btnReglas');
if (btnReglas) {
    btnReglas.addEventListener('click', () => {
        showNotification('Abriendo Reglas de Reparto y Simulador...', 'info');
        setTimeout(() => {
            alert('Funcionalidad de Reglas y Simulador\n\n' +
                  'Aquí podrás:\n' +
                  '• Definir reglas de distribución de consumo\n' +
                  '• Simular diferentes escenarios de reparto\n' +
                  '• Ver estimaciones de pago por miembro\n' +
                  '• Ajustar porcentajes de consumo por ambiente');
        }, 500);
    });
}
const btnRepetir = document.getElementById('btnRepetir');
if (btnRepetir) {
    btnRepetir.addEventListener('click', () => {
        if (prorrateos.length === 0) {
            showNotification('No hay prorrateos para repetir', 'warning');
            return;
        }
        const ultimoProrrateo = prorrateos[prorrateos.length - 1];
        duplicarProrrateo(ultimoProrrateo.id);
        showNotification('Repitiendo último prorrateo...', 'info');
    });
}
function showNotification(message, type = 'info') {
    const existingNotif = document.querySelector('.prorrateo-notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    const notification = document.createElement('div');
    notification.className = `prorrateo-notification ${type}`;
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    notification.innerHTML = `
        <span class="notif-icon">${icons[type]}</span>
        <span class="notif-message">${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
const notifStyles = document.createElement('style');
notifStyles.textContent = `
    .prorrateo-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.98);
        color: rgba(30, 58, 138, 1);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-left: 4px solid #4A90E2;
    }
    .prorrateo-notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    .prorrateo-notification.success {
        border-left-color: #22c55e;
    }
    .prorrateo-notification.success .notif-icon {
        background: rgba(34, 197, 94, 0.2);
        color: #22c55e;
    }
    .prorrateo-notification.error {
        border-left-color: #ff6b6b;
    }
    .prorrateo-notification.error .notif-icon {
        background: rgba(255, 107, 107, 0.2);
        color: #ff6b6b;
    }
    .prorrateo-notification.warning {
        border-left-color: #f39c12;
    }
    .prorrateo-notification.warning .notif-icon {
        background: rgba(243, 156, 18, 0.2);
        color: #f39c12;
    }
    .prorrateo-notification.info {
        border-left-color: #4A90E2;
    }
    .prorrateo-notification.info .notif-icon {
        background: rgba(74, 144, 226, 0.2);
        color: #4A90E2;
    }
    .notif-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
        flex-shrink: 0;
    }
    .notif-message {
        font-weight: 600;
        font-size: 0.95rem;
        color: rgba(30, 58, 138, 1);
    }
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
    @media (max-width: 768px) {
        .prorrateo-notification {
            right: 10px;
            left: 10px;
            transform: translateY(-100px);
        }
        .prorrateo-notification.show {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(notifStyles);
console.log('Prorrateo page loaded successfully');
showNotification('Sistema de prorrateo cargado correctamente', 'success');

const floatingBtn = document.getElementById('floatingBtn');
const floatingPanel = document.getElementById('floatingPanel');
const closePanel = document.getElementById('closePanel');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

if (floatingBtn) {
    floatingBtn.addEventListener('click', () => {
        floatingPanel.classList.toggle('show');
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

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mensaje = chatInput.value.trim();
        if (mensaje) {
            ChatIA.agregarMensaje(mensaje, 'user');
            chatInput.value = '';
            setTimeout(() => {
                const respuesta = ChatIA.obtenerRespuesta(mensaje);
                ChatIA.agregarMensaje(respuesta, 'ia');
            }, 800);
        }
    });
}

if (chatInput) {
    chatInput.addEventListener('focus', () => {
        if (!floatingPanel.classList.contains('show')) {
            floatingPanel.classList.add('show');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof ChatIA !== 'undefined') {
        ChatIA.inicializar();
    }
});

