const AppState = {
    usuario: {
        nombre: 'Leonardo Sánchez',
        email: 'leonardo@smartwatt.com',
        rol: 'Usuario Premium',
        foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    },

    dispositivos: [
        {
            id: 1,
            nombre: 'Computadora',
            tipo: 'electronico',
            consumoWatts: 300,
            activo: true,
            habitacion: 'Oficina',
            horarioEncendido: '08:00',
            horarioApagado: '18:00',
            icono: 'monitor'
        },
        {
            id: 2,
            nombre: 'Cargador',
            tipo: 'electronico',
            consumoWatts: 20,
            activo: false,
            habitacion: 'Dormitorio',
            horarioEncendido: '22:00',
            horarioApagado: '06:00',
            icono: 'battery-charging'
        },
        {
            id: 3,
            nombre: 'Refrigerador',
            tipo: 'electrodomestico',
            consumoWatts: 150,
            activo: true,
            habitacion: 'Cocina',
            horarioEncendido: '00:00',
            horarioApagado: '23:59',
            icono: 'archive'
        },
        {
            id: 4,
            nombre: 'Televisor',
            tipo: 'entretenimiento',
            consumoWatts: 120,
            activo: false,
            habitacion: 'Sala',
            horarioEncendido: '19:00',
            horarioApagado: '23:00',
            icono: 'tv'
        },
        {
            id: 5,
            nombre: 'Aire Acondicionado',
            tipo: 'climatizacion',
            consumoWatts: 1500,
            activo: true,
            habitacion: 'Dormitorio',
            horarioEncendido: '22:00',
            horarioApagado: '06:00',
            icono: 'wind'
        }
    ],

    consumo: {
        actual: 0,
        hoy: [],
        semana: [
            { dia: 'Lun', consumo: 12.5 },
            { dia: 'Mar', consumo: 14.2 },
            { dia: 'Mie', consumo: 13.8 },
            { dia: 'Jue', consumo: 15.1 },
            { dia: 'Vie', consumo: 14.5 },
            { dia: 'Sab', consumo: 16.3 },
            { dia: 'Dom', consumo: 15.7 }
        ],
        mes: 425.5,
        promedioDiario: 14.2
    },

    metas: {
        tipo: 'consumo',
        mesSeleccionado: new Date().getMonth() + 1,
        limiteConsumo: 450,
        limiteCosto: 200,
        consumoActual: 425.5,
        costoActual: 178.5,
        tarifaPorKwh: 0.42
    },

    notificaciones: [
        {
            id: 1,
            tipo: 'alerta',
            titulo: 'Consumo energético aumentado',
            descripcion: 'El consumo de energía ha aumentado un 35% en las últimas 24 horas.',
            tiempo: Date.now() - 5 * 60000,
            leida: false,
            prioridad: 'alta'
        },
        {
            id: 2,
            tipo: 'alerta',
            titulo: 'Aire acondicionado consume mucho',
            descripcion: 'El aire acondicionado está consumiendo más energía de lo habitual.',
            tiempo: Date.now() - 2 * 3600000,
            leida: false,
            prioridad: 'media'
        },
        {
            id: 3,
            tipo: 'recomendacion',
            titulo: 'Apaga dispositivos en stand-by',
            descripcion: 'Podrías ahorrar hasta S/. 45 al mes desconectando dispositivos.',
            tiempo: Date.now() - 1 * 3600000,
            leida: false,
            prioridad: 'media'
        },
        {
            id: 4,
            tipo: 'recomendacion',
            titulo: 'Usa iluminación LED',
            descripcion: 'Reducirás el consumo de iluminación en un 75% con bombillas LED.',
            tiempo: Date.now() - 3 * 3600000,
            leida: false,
            prioridad: 'baja'
        }
    ],

    prorrateo: [
        {
            id: 1,
            nombre: 'Mes Actual - Noviembre',
            fechaCreacion: new Date(),
            costoTotal: 178.5,
            miembros: [
                { nombre: 'Leonardo', porcentaje: 40, monto: 71.4 },
                { nombre: 'María', porcentaje: 30, monto: 53.55 },
                { nombre: 'Carlos', porcentaje: 30, monto: 53.55 }
            ],
            habitaciones: [
                { nombre: 'Cocina', consumo: 45.2, porcentaje: 25 },
                { nombre: 'Dormitorio', consumo: 62.4, porcentaje: 35 },
                { nombre: 'Sala', consumo: 35.6, porcentaje: 20 },
                { nombre: 'Oficina', consumo: 35.3, porcentaje: 20 }
            ]
        }
    ],

    calcularConsumoActual() {
        const dispositivosActivos = this.dispositivos.filter(d => d.activo);
        const consumoTotal = dispositivosActivos.reduce((sum, d) => sum + d.consumoWatts, 0);
        this.consumo.actual = (consumoTotal / 1000).toFixed(2);
        return this.consumo.actual;
    },

    toggleDispositivo(id) {
        const dispositivo = this.dispositivos.find(d => d.id === id);
        if (dispositivo) {
            dispositivo.activo = !dispositivo.activo;
            this.calcularConsumoActual();
            this.guardarEstado();
            
            if (dispositivo.activo) {
                this.agregarNotificacion({
                    tipo: 'info',
                    titulo: `${dispositivo.nombre} encendido`,
                    descripcion: `El dispositivo consume ${dispositivo.consumoWatts}W`,
                    prioridad: 'baja'
                });
            }
            
            return dispositivo;
        }
        return null;
    },

    actualizarHorarioDispositivo(id, encendido, apagado) {
        const dispositivo = this.dispositivos.find(d => d.id === id);
        if (dispositivo) {
            dispositivo.horarioEncendido = encendido;
            dispositivo.horarioApagado = apagado;
            this.guardarEstado();
            return dispositivo;
        }
        return null;
    },

    agregarNotificacion(notif) {
        const nuevaNotif = {
            id: Date.now(),
            tiempo: new Date(),
            leida: false,
            ...notif
        };
        this.notificaciones.unshift(nuevaNotif);
        if (this.notificaciones.length > 20) {
            this.notificaciones = this.notificaciones.slice(0, 20);
        }
        this.guardarEstado();
        return nuevaNotif;
    },

    marcarNotificacionLeida(id) {
        const notif = this.notificaciones.find(n => n.id === id);
        if (notif) {
            notif.leida = true;
            this.guardarEstado();
        }
    },

    marcarTodasLeidas() {
        this.notificaciones.forEach(n => n.leida = true);
        this.guardarEstado();
    },

    eliminarNotificacion(id) {
        this.notificaciones = this.notificaciones.filter(n => n.id !== id);
        this.guardarEstado();
    },

    getNotificacionesNoLeidas() {
        return this.notificaciones.filter(n => !n.leida);
    },

    getCountNotificacionesNoLeidas() {
        return this.notificaciones.filter(n => !n.leida).length;
    },

    actualizarMeta(tipo, valor, mes) {
        if (tipo === 'consumo') {
            this.metas.limiteConsumo = valor;
        } else {
            this.metas.limiteCosto = valor;
        }
        this.metas.tipo = tipo;
        this.metas.mesSeleccionado = mes;
        this.guardarEstado();
    },

    calcularAlcanceMeta() {
        if (this.metas.tipo === 'consumo') {
            return Math.min((this.metas.consumoActual / this.metas.limiteConsumo) * 100, 100);
        } else {
            return Math.min((this.metas.costoActual / this.metas.limiteCosto) * 100, 100);
        }
    },

    actualizarProrrateo(id, miembros, habitaciones) {
        const prorrateo = this.prorrateo.find(p => p.id === id);
        if (prorrateo) {
            prorrateo.miembros = miembros;
            prorrateo.habitaciones = habitaciones;
            this.guardarEstado();
        }
    },

    simularConsumo() {
        const ahora = new Date();
        const hora = ahora.getHours();
        
        this.dispositivos.forEach(dispositivo => {
            const [horaEnc, minEnc] = dispositivo.horarioEncendido.split(':').map(Number);
            const [horaAp, minAp] = dispositivo.horarioApagado.split(':').map(Number);
            
            const minutosActuales = hora * 60 + ahora.getMinutes();
            const minutosEncendido = horaEnc * 60 + minEnc;
            const minutosApagado = horaAp * 60 + minAp;
            
            if (minutosEncendido <= minutosActuales && minutosActuales < minutosApagado) {
                dispositivo.activo = true;
            } else {
                dispositivo.activo = false;
            }
        });
        
        this.calcularConsumoActual();
        this.actualizarConsumoSemana();
        this.guardarEstado();
    },

    actualizarConsumoSemana() {
        const consumoActual = parseFloat(this.consumo.actual);
        const ultimoDia = this.consumo.semana[this.consumo.semana.length - 1];
        ultimoDia.consumo = (ultimoDia.consumo + consumoActual / 24).toFixed(1);
        
        this.consumo.mes = this.consumo.semana.reduce((sum, dia) => sum + parseFloat(dia.consumo), 0) * 4.3;
        this.metas.consumoActual = this.consumo.mes;
        this.metas.costoActual = this.consumo.mes * this.metas.tarifaPorKwh;
    },

    verificarAlertas() {
        const alcance = this.calcularAlcanceMeta();
        
        if (alcance > 90 && !this.notificaciones.some(n => n.titulo.includes('Meta casi alcanzada'))) {
            this.agregarNotificacion({
                tipo: 'alerta',
                titulo: 'Meta casi alcanzada',
                descripcion: `Has consumido el ${alcance.toFixed(1)}% de tu meta mensual. Considera reducir el uso de dispositivos.`,
                prioridad: 'alta'
            });
        }
        
        const dispositivosAltoConsumo = this.dispositivos.filter(d => d.activo && d.consumoWatts > 500);
        if (dispositivosAltoConsumo.length > 0) {
            dispositivosAltoConsumo.forEach(d => {
                if (!this.notificaciones.some(n => n.descripcion.includes(d.nombre))) {
                    this.agregarNotificacion({
                        tipo: 'alerta',
                        titulo: 'Dispositivo de alto consumo activo',
                        descripcion: `${d.nombre} está consumiendo ${d.consumoWatts}W. Considera apagarlo cuando no lo uses.`,
                        prioridad: 'media'
                    });
                }
            });
        }
    },

    guardarEstado() {
        try {
            const estado = {
                dispositivos: this.dispositivos,
                consumo: this.consumo,
                metas: this.metas,
                notificaciones: this.notificaciones,
                prorrateo: this.prorrateo,
                ultimaActualizacion: new Date().toISOString()
            };
            localStorage.setItem('smartwatt_state', JSON.stringify(estado));
        } catch (error) {
            console.error('Error guardando estado:', error);
        }
    },

    cargarEstado() {
        try {
            const estado = localStorage.getItem('smartwatt_state');
            if (estado) {
                const data = JSON.parse(estado);
                this.dispositivos = data.dispositivos || this.dispositivos;
                this.consumo = data.consumo || this.consumo;
                this.metas = data.metas || this.metas;
                this.notificaciones = data.notificaciones?.map(n => ({
                    ...n,
                    tiempo: new Date(n.tiempo)
                })) || this.notificaciones;
                this.prorrateo = data.prorrateo?.map(p => ({
                    ...p,
                    fechaCreacion: new Date(p.fechaCreacion)
                })) || this.prorrateo;
                
                this.calcularConsumoActual();
            }
        } catch (error) {
            console.error('Error cargando estado:', error);
        }
    },

    reiniciarEstado() {
        localStorage.removeItem('smartwatt_state');
        location.reload();
    },

    inicializar() {
        this.cargarEstado();
        this.simularConsumo();
        this.verificarAlertas();
        
        setInterval(() => {
            this.simularConsumo();
            this.verificarAlertas();
        }, 60000);
    }
};

if (typeof window !== 'undefined') {
    window.AppState = AppState;
    
    document.addEventListener('DOMContentLoaded', () => {
        AppState.inicializar();
    });
}
