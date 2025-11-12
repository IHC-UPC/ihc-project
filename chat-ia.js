const ChatIA = {
    mensajes: [],
    
    respuestasIA: {
        saludos: [
            "¡Hola! Soy tu asistente virtual de SmartWatt. ¿En qué puedo ayudarte hoy?",
            "¡Hola! Estoy aquí para ayudarte a optimizar tu consumo energético. ¿Qué necesitas?",
            "¡Bienvenido! Soy tu asistente de eficiencia energética. ¿Cómo puedo asistirte?"
        ],
        consumo: [
            `Actualmente estás consumiendo ${window.AppState?.consumo.actual || '0'} kWh. ${window.AppState?.dispositivos.filter(d => d.activo).length || 0} dispositivos están activos.`,
            `Tu consumo actual es de ${window.AppState?.consumo.actual || '0'} kWh. El promedio diario este mes es ${window.AppState?.consumo.promedioDiario || '0'} kWh.`,
            `Tienes ${window.AppState?.dispositivos.filter(d => d.activo).length || 0} dispositivos activos consumiendo ${window.AppState?.consumo.actual || '0'} kWh en total.`
        ],
        dispositivos: [
            `Tienes ${window.AppState?.dispositivos.length || 0} dispositivos registrados. ${window.AppState?.dispositivos.filter(d => d.activo).length || 0} están activos actualmente.`,
            `Estos son tus dispositivos activos: ${window.AppState?.dispositivos.filter(d => d.activo).map(d => d.nombre).join(', ') || 'ninguno'}.`,
            `Los dispositivos que consumen más energía son: ${window.AppState?.dispositivos.sort((a, b) => b.consumoWatts - a.consumoWatts).slice(0, 3).map(d => `${d.nombre} (${d.consumoWatts}W)`).join(', ')}.`
        ],
        ahorro: [
            "Para ahorrar energía, te recomiendo: 1) Apagar dispositivos en stand-by, 2) Usar LED en lugar de bombillas tradicionales, 3) Regular la temperatura del aire acondicionado.",
            "Algunos consejos de ahorro: Desconecta cargadores cuando no los uses, optimiza la temperatura del refrigerador (3-4°C), y aprovecha la luz natural.",
            "Puedes ahorrar hasta S/. 45 al mes apagando dispositivos en stand-by y usando electrodomésticos eficientes."
        ],
        metas: [
            `Tu meta actual es de ${window.AppState?.metas.tipo === 'consumo' ? window.AppState?.metas.limiteConsumo + ' kWh' : 'S/. ' + window.AppState?.metas.limiteCosto}. Llevas ${window.AppState?.calcularAlcanceMeta().toFixed(1)}% del límite.`,
            `Has consumido ${window.AppState?.metas.consumoActual.toFixed(1)} kWh de tu meta de ${window.AppState?.metas.limiteConsumo} kWh. ¡Vas ${window.AppState?.calcularAlcanceMeta() < 90 ? 'bien' : 'cerca del límite'}!`,
            `Tu consumo actual representa el ${window.AppState?.calcularAlcanceMeta().toFixed(1)}% de tu meta mensual. ${window.AppState?.calcularAlcanceMeta() > 90 ? 'Te recomiendo reducir el uso de dispositivos.' : 'Sigues dentro de tu objetivo.'}`
        ],
        ayuda: [
            "Puedo ayudarte con: información de consumo, estado de dispositivos, consejos de ahorro, metas energéticas, y análisis de tu uso. ¿Qué te interesa?",
            "Estoy aquí para: monitorear tu consumo, darte recomendaciones personalizadas, gestionar dispositivos, y ayudarte a alcanzar tus metas de ahorro.",
            "Pregúntame sobre: tu consumo actual, dispositivos activos, cómo ahorrar energía, el progreso de tus metas, o cualquier duda sobre eficiencia energética."
        ],
        clima: [
            "El aire acondicionado es uno de los mayores consumidores. Te recomiendo: 1) Usar modo ECO, 2) Mantener 24-26°C, 3) Apagarlo cuando no estés en casa.",
            "Para el aire acondicionado: cierra puertas y ventanas, limpia los filtros mensualmente, y úsalo solo cuando sea necesario. Puedes ahorrar hasta 30% de energía.",
            "El aire acondicionado consume mucha energía. Considera usar ventiladores cuando sea posible, y programa apagados automáticos durante la noche."
        ],
        default: [
            "Interesante pregunta. Puedes consultar tus reportes para más detalles, o pregúntame sobre consumo, dispositivos, o consejos de ahorro.",
            "No estoy seguro de entender completamente. ¿Podrías reformular tu pregunta? Puedo ayudarte con consumo, dispositivos, metas y ahorro energético.",
            "Hmm, no tengo información específica sobre eso. ¿Quieres saber sobre tu consumo actual, dispositivos activos, o consejos de ahorro?"
        ]
    },

    palabrasClave: {
        saludos: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'hi', 'saludos'],
        consumo: ['consumo', 'gasto', 'energía', 'cuánto', 'kwh', 'electricidad', 'luz'],
        dispositivos: ['dispositivos', 'aparatos', 'equipos', 'qué tengo', 'activos', 'encendidos'],
        ahorro: ['ahorrar', 'ahorro', 'reducir', 'bajar', 'economizar', 'consejos', 'tips'],
        metas: ['meta', 'objetivo', 'límite', 'progreso', 'alcance'],
        ayuda: ['ayuda', 'qué puedes hacer', 'funciones', 'comandos', 'opciones'],
        clima: ['aire', 'acondicionado', 'clima', 'temperatura', 'frío', 'calor', 'climatización']
    },

    analizarMensaje(mensaje) {
        const textoLower = mensaje.toLowerCase();
        
        for (const [categoria, palabras] of Object.entries(this.palabrasClave)) {
            if (palabras.some(palabra => textoLower.includes(palabra))) {
                return categoria;
            }
        }
        
        return 'default';
    },

    obtenerRespuesta(mensaje) {
        const categoria = this.analizarMensaje(mensaje);
        const respuestas = this.respuestasIA[categoria] || this.respuestasIA.default;
        const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
        
        return respuesta;
    },

    agregarMensaje(texto, esUsuario = true) {
        const mensaje = {
            id: Date.now(),
            texto: texto,
            esUsuario: esUsuario,
            timestamp: new Date()
        };
        
        this.mensajes.push(mensaje);
        this.guardarMensajes();
        
        if (esUsuario) {
            setTimeout(() => {
                const respuesta = this.obtenerRespuesta(texto);
                this.agregarMensaje(respuesta, false);
                this.renderizarMensajes();
            }, 800);
        }
        
        return mensaje;
    },

    obtenerMensajes() {
        return this.mensajes;
    },

    limpiarChat() {
        this.mensajes = [];
        this.guardarMensajes();
    },

    guardarMensajes() {
        try {
            localStorage.setItem('smartwatt_chat', JSON.stringify(this.mensajes));
        } catch (error) {
            console.error('Error guardando mensajes:', error);
        }
    },

    cargarMensajes() {
        try {
            const mensajes = localStorage.getItem('smartwatt_chat');
            if (mensajes) {
                this.mensajes = JSON.parse(mensajes).map(m => ({
                    ...m,
                    timestamp: new Date(m.timestamp)
                }));
            }
        } catch (error) {
            console.error('Error cargando mensajes:', error);
        }
    },

    renderizarMensajes() {
        const chatContent = document.getElementById('chatContent');
        if (!chatContent) return;
        
        chatContent.innerHTML = '';
        
        if (this.mensajes.length === 0) {
            chatContent.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: rgba(255, 255, 255, 0.5);">
                    <p>👋 ¡Hola! Soy tu asistente virtual.</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem;">Pregúntame sobre tu consumo, dispositivos o consejos de ahorro.</p>
                </div>
            `;
            return;
        }
        
        this.mensajes.forEach(mensaje => {
            const mensajeDiv = document.createElement('div');
            mensajeDiv.className = `chat-message ${mensaje.esUsuario ? 'user' : 'ia'}`;
            
            const hora = mensaje.timestamp.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            mensajeDiv.innerHTML = `
                <div class="message-content">
                    ${!mensaje.esUsuario ? '<div class="ia-avatar">🤖</div>' : ''}
                    <div class="message-bubble">
                        <p>${mensaje.texto}</p>
                        <span class="message-time">${hora}</span>
                    </div>
                </div>
            `;
            
            chatContent.appendChild(mensajeDiv);
        });
        
        chatContent.scrollTop = chatContent.scrollHeight;
    },

    inicializar() {
        this.cargarMensajes();
        
        if (this.mensajes.length === 0) {
            setTimeout(() => {
                this.agregarMensaje(this.respuestasIA.saludos[0], false);
                this.renderizarMensajes();
            }, 500);
        }
    }
};

if (typeof window !== 'undefined') {
    window.ChatIA = ChatIA;
}
