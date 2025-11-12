const ctx = document.getElementById('consumoChart');
if (ctx) {
    const consumoChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Consumo (kWh)',
                data: [6.2, 7.8, 8.5, 9.1, 12.8, 8.3, 7.6],
                backgroundColor: function(context) {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(10, 132, 255, 0.8)');
                    gradient.addColorStop(1, 'rgba(0, 217, 255, 0.4)');
                    return gradient;
                },
                borderColor: '#0A84FF',
                borderWidth: 2,
                borderRadius: 10,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#00D9FF',
                    borderColor: 'rgba(10, 132, 255, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' kWh';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        font: {
                            size: 12,
                            weight: '500'
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
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 13,
                            weight: '600'
                        }
                    }
                }
            }
        }
    });
}
const mesSelect = document.getElementById('mesSelect');
const yearSelect = document.getElementById('yearSelect');
if (mesSelect && yearSelect) {
    const updateReporte = () => {
        const mes = mesSelect.options[mesSelect.selectedIndex].text;
        const year = yearSelect.value;
        showNotification(`Cargando datos de ${mes} ${year}...`, 'info');
        setTimeout(() => {
            const nuevoConsumo = Math.floor(Math.random() * (280 - 200) + 200);
            const promedio = (nuevoConsumo / 31).toFixed(1);
            document.getElementById('consumoTotal').textContent = nuevoConsumo;
            document.getElementById('promedioDiario').textContent = promedio;
            if (consumoChart) {
                consumoChart.data.datasets[0].data = Array.from({length: 7}, () => 
                    Math.floor(Math.random() * (15 - 5) + 5)
                );
                consumoChart.update();
            }
            showNotification('Datos actualizados correctamente', 'success');
        }, 800);
    };
    mesSelect.addEventListener('change', updateReporte);
    yearSelect.addEventListener('change', updateReporte);
}
const btnExport = document.querySelector('.btn-export');
if (btnExport) {
    btnExport.addEventListener('click', () => {
        showNotification('Generando reporte PDF...', 'info');
        setTimeout(() => {
            showNotification('Reporte descargado exitosamente', 'success');
        }, 1500);
    });
}
const btnEditLimite = document.querySelector('.btn-edit-limite');
if (btnEditLimite) {
    btnEditLimite.addEventListener('click', () => {
        const nuevoLimite = prompt('Ingresa el nuevo límite de energía (kWh):', '8');
        if (nuevoLimite && !isNaN(nuevoLimite) && nuevoLimite > 0) {
            document.querySelector('.limite-number').textContent = nuevoLimite;
            showNotification(`Límite actualizado a ${nuevoLimite} kWh`, 'success');
        } else if (nuevoLimite !== null) {
            showNotification('Por favor ingresa un valor válido', 'warning');
        }
    });
}
window.addEventListener('load', () => {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300 + (index * 150));
    });
});
function showNotification(message, type = 'info') {
    const existingNotif = document.querySelector('.reportes-notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    const notification = document.createElement('div');
    notification.className = `reportes-notification ${type}`;
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
    .reportes-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-left: 4px solid #0A84FF;
    }
    .reportes-notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    .reportes-notification.success {
        border-left-color: #2ecc71;
    }
    .reportes-notification.success .notif-icon {
        background: rgba(46, 204, 113, 0.2);
        color: #2ecc71;
    }
    .reportes-notification.error {
        border-left-color: #ff6b6b;
    }
    .reportes-notification.error .notif-icon {
        background: rgba(255, 107, 107, 0.2);
        color: #ff6b6b;
    }
    .reportes-notification.warning {
        border-left-color: #f39c12;
    }
    .reportes-notification.warning .notif-icon {
        background: rgba(243, 156, 18, 0.2);
        color: #f39c12;
    }
    .reportes-notification.info {
        border-left-color: #0A84FF;
    }
    .reportes-notification.info .notif-icon {
        background: rgba(10, 132, 255, 0.2);
        color: #0A84FF;
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
        font-weight: 500;
        font-size: 0.95rem;
    }
    @media (max-width: 768px) {
        .reportes-notification {
            right: 10px;
            left: 10px;
            transform: translateY(-100px);
        }
        .reportes-notification.show {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(notifStyles);
const chartScript = document.createElement('script');
chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
chartScript.onload = () => {
    console.log('Chart.js loaded successfully');
    if (typeof Chart !== 'undefined' && document.getElementById('consumoChart')) {
        const ctx = document.getElementById('consumoChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Consumo (kWh)',
                    data: [6.2, 7.8, 8.5, 9.1, 12.8, 8.3, 7.6],
                    backgroundColor: function(context) {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, 'rgba(10, 132, 255, 0.8)');
                        gradient.addColorStop(1, 'rgba(0, 217, 255, 0.4)');
                        return gradient;
                    },
                    borderColor: '#0A84FF',
                    borderWidth: 2,
                    borderRadius: 10,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#00D9FF',
                        borderColor: 'rgba(10, 132, 255, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' kWh';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.6)',
                            font: {
                                size: 12,
                                weight: '500'
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
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 13,
                                weight: '600'
                            }
                        }
                    }
                }
            }
        });
    }
};
document.head.appendChild(chartScript);
console.log('Reportes page loaded successfully');
showNotification('Reportes cargados correctamente', 'success');

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

