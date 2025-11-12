let metaActual = {
    tipo: 'consumo',
    mes: 11,
    consumoMax: 200,
    consumoActual: 160
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('SmartWatt - Metas cargadas');
    
    initChart();
    initTipoToggle();
    initPeriodoButtons();
    initConsumoInput();
    initButtons();
    updateAlcance();
});

function initChart() {
    const ctx = document.getElementById('metaChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            datasets: [{
                label: 'Consumo Real',
                data: [42.5, 39, 46, 32.5],
                borderColor: '#0A84FF',
                backgroundColor: 'rgba(10, 132, 255, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: '#0A84FF',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 8
            }, {
                label: 'Meta Semanal',
                data: [50, 50, 50, 50],
                borderColor: '#00D9FF',
                backgroundColor: 'transparent',
                borderDash: [10, 5],
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(10, 132, 255, 0.5)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' kWh';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return value + ' kWh';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 11,
                            weight: '600'
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initTipoToggle() {
    const tipoBtns = document.querySelectorAll('.tipo-btn');
    
    tipoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tipoBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            metaActual.tipo = btn.dataset.tipo;
            
            const unit = document.querySelector('.unit');
            if (metaActual.tipo === 'costo') {
                unit.textContent = 'S/.';
            } else {
                unit.textContent = 'kWh';
            }
            
            showNotification('success', `Tipo de meta cambiado a: ${metaActual.tipo === 'costo' ? 'Costo' : 'Consumo'}`);
        });
    });
}

function initPeriodoButtons() {
    const periodoBtns = document.querySelectorAll('.periodo-btn');
    
    periodoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            periodoBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            metaActual.mes = parseInt(btn.dataset.mes);
            
            const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            document.querySelector('.meta-mes').textContent = meses[metaActual.mes - 1];
            
            showNotification('info', `Mes seleccionado: ${meses[metaActual.mes - 1]}`);
        });
    });
}

function initConsumoInput() {
    const input = document.getElementById('consumoMax');
    
    input.addEventListener('input', () => {
        metaActual.consumoMax = parseFloat(input.value) || 0;
        updateAlcance();
    });
}

function updateAlcance() {
    const porcentaje = (metaActual.consumoActual / metaActual.consumoMax) * 100;
    const progress = document.getElementById('alcanceProgress');
    const label = progress.querySelector('.alcance-label');
    const info = document.querySelectorAll('.alcance-info span');
    
    progress.style.width = Math.min(porcentaje, 100) + '%';
    label.textContent = Math.round(porcentaje) + '%';
    
    info[0].textContent = `${metaActual.consumoActual} kWh consumidos`;
    info[1].textContent = `${Math.max(0, metaActual.consumoMax - metaActual.consumoActual)} kWh restantes`;
    
    if (porcentaje > 90) {
        progress.style.background = 'linear-gradient(90deg, #FF6B6B, #EE5A6F)';
    } else if (porcentaje > 70) {
        progress.style.background = 'linear-gradient(90deg, #FFC107, #FF9800)';
    } else {
        progress.style.background = 'linear-gradient(90deg, #2ecc71, #27ae60)';
    }
}

function initButtons() {
    const btnCrear = document.querySelector('.btn-crear');
    const btnEditar = document.querySelector('.btn-editar');
    const btnGuardar = document.querySelector('.btn-guardar');
    const btnWhatIf = document.querySelector('.btn-whatif');
    const btnNotif = document.querySelector('.btn-notif');
    
    btnCrear.addEventListener('click', () => {
        showNotification('info', 'Función de crear nueva meta en desarrollo');
    });
    
    btnEditar.addEventListener('click', () => {
        showNotification('info', 'Función de editar meta en desarrollo');
    });
    
    btnGuardar.addEventListener('click', () => {
        showNotification('success', '¡Meta guardada exitosamente!');
        console.log('Meta guardada:', metaActual);
    });
    
    btnWhatIf.addEventListener('click', () => {
        showNotification('info', 'Abriendo simulador What If...');
    });
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

