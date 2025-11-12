# SmartWatt - Sistema de Gestión de Energía Inteligente

## 📋 Descripción del Proyecto

SmartWatt es una solución digital innovadora para la gestión inteligente del consumo energético en hogares y edificios. La plataforma permite a los usuarios monitorear, controlar y optimizar el uso de energía de sus dispositivos mediante automatización de rutinas, análisis de consumo y recomendaciones personalizadas basadas en inteligencia artificial.

## 👥 Autores

- **Leonardo Matias Sanchez Benavente** - Desarrollador Principal
- **Equipo SmartWatt** - Diseño y Desarrollo

## 🎯 Objetivos del Proyecto

### Objetivo General
Desarrollar una plataforma web intuitiva que permita a los usuarios gestionar eficientemente su consumo energético, reduciendo costos y promoviendo prácticas sostenibles.

### Objetivos Específicos
- ✅ Monitorear en tiempo real el consumo energético de dispositivos
- ✅ Automatizar el encendido/apagado de dispositivos mediante rutinas programadas
- ✅ Generar reportes detallados de consumo con visualizaciones interactivas
- ✅ Implementar sistema de prorrateo para compartir gastos de energía
- ✅ Proporcionar metas de ahorro energético personalizadas
- ✅ Ofrecer notificaciones y recomendaciones inteligentes

## ✨ Características Principales

### 🏠 Dashboard Principal
- Vista general del consumo energético
- Indicadores de consumo en tiempo real
- Tarjetas de estadísticas (consumo diario, semanal, mensual)
- Gráficos interactivos de tendencias

### ⏰ Gestión de Rutinas
- Creación de rutinas personalizadas para dispositivos
- Programación de horarios de encendido/apagado
- Activación/desactivación automática
- Panel visual de todas las rutinas activas

### 📊 Reportes y Análisis
- Gráficos de consumo por dispositivo
- Comparativas temporales (día/semana/mes)
- Análisis de picos de consumo
- Exportación de datos

### 💰 Prorrateo de Gastos
- Distribución equitativa de costos energéticos
- Gestión de participantes
- Cálculo automático de cuotas
- Historial de pagos

### 🎯 Metas de Ahorro
- Establecimiento de objetivos de reducción
- Seguimiento de progreso
- Recomendaciones personalizadas
- Gamificación del ahorro energético

### 🔔 Sistema de Notificaciones
- Alertas de consumo elevado
- Recomendaciones de optimización
- Recordatorios de rutinas
- Notificaciones en tiempo real

### 💬 Asistente IA
- Chat inteligente para consultas
- Recomendaciones personalizadas
- Análisis de patrones de consumo
- Soporte 24/7

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsivo con variables CSS y animaciones
- **JavaScript (Vanilla)** - Lógica de aplicación sin frameworks
- **Chart.js** - Visualización de datos (gráficos)

### Arquitectura
- **SPA (Single Page Application)** - Navegación fluida sin recargas
- **Diseño Modular** - Componentes reutilizables
- **Estado Global** - Gestión centralizada con `app-state.js`
- **Patrón MVC** - Separación de responsabilidades

### Herramientas de Desarrollo
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto
- **VS Code / WebStorm** - Editor de código

## 📁 Estructura del Proyecto

```
ihc-project/
├── public/                          # Carpeta principal del proyecto
│   ├── index.html                   # Landing page
│   ├── login.html                   # Página de inicio de sesión
│   ├── registro.html                # Página de registro
│   ├── home.html                    # Dashboard principal
│   ├── rutinas.html                 # Gestión de rutinas
│   ├── reportes.html                # Reportes y análisis
│   ├── prorrateo.html               # Distribución de gastos
│   ├── metas.html                   # Metas de ahorro
│   ├── notificaciones.html          # Centro de notificaciones
│   │
│   └── assets/                      # Recursos del proyecto
│       ├── styles/                  # Hojas de estilo CSS
│       │   ├── styles.css           # Estilos globales
│       │   ├── home.css             # Estilos del dashboard
│       │   ├── rutinas.css          # Estilos de rutinas
│       │   ├── reportes.css         # Estilos de reportes
│       │   ├── prorrateo.css        # Estilos de prorrateo
│       │   ├── metas.css            # Estilos de metas
│       │   └── notificaciones.css   # Estilos de notificaciones
│       │
│       ├── scripts/                 # Archivos JavaScript
│       │   ├── script.js            # Script landing page
│       │   ├── login.js             # Lógica de login
│       │   ├── registro.js          # Lógica de registro
│       │   ├── app-state.js         # Estado global de la app
│       │   ├── home.js              # Lógica del dashboard
│       │   ├── rutinas.js           # Lógica de rutinas
│       │   ├── reportes.js          # Lógica de reportes
│       │   ├── prorrateo.js         # Lógica de prorrateo
│       │   ├── metas.js             # Lógica de metas
│       │   ├── notificaciones.js    # Lógica de notificaciones
│       │   ├── chat-ia.js           # Asistente IA
│       │   └── header-notifications.js # Notificaciones header
│       │
│       └── images/                  # Imágenes y recursos gráficos
│           └── (favicon, logos, etc.)
│
├── .gitignore                       # Archivos ignorados por Git
└── README.md                        # Documentación del proyecto
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor local (opcional: Live Server, Python HTTP Server, etc.)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Matiassb06/ihc-project.git
   cd ihc-project
   ```

2. **Abrir el proyecto**
   - Opción 1: Abrir `public/index.html` directamente en el navegador
   - Opción 2: Usar Live Server (recomendado)
     ```bash
     # Si tienes Live Server instalado
     live-server public/
     ```
   - Opción 3: Usar Python HTTP Server
     ```bash
     cd public
     python -m http.server 8000
     # Abrir http://localhost:8000 en el navegador
     ```

3. **Navegar por la aplicación**
   - Landing Page: `index.html`
   - Login: `login.html` (usuario: admin / contraseña: admin)
   - Dashboard: `home.html`

## 🎨 Diseño y UX

### Paleta de Colores
- **Primary Background**: `#0d1420` (Azul oscuro profundo)
- **Secondary Background**: `rgba(15, 23, 42, 0.95)` (Azul grisáceo)
- **Accent Blue**: `#0A84FF` (Azul brillante)
- **Accent Cyan**: `#00D9FF` (Cyan eléctrico)
- **Accent Green**: `#2ecc71` (Verde éxito)
- **Accent Red**: `rgba(255, 107, 107, 0.9)` (Rojo alerta)

### Características de Diseño
- ✨ **Glassmorphism** - Efectos de vidrio esmerilado
- 🌈 **Gradientes** - Transiciones de color suaves
- 💫 **Animaciones** - Transiciones fluidas y micro-interacciones
- 📱 **Responsive** - Adaptable a todos los dispositivos
- 🎯 **Accesibilidad** - Alto contraste y navegación por teclado

## 📊 Funcionalidades Implementadas

- [x] Landing page atractiva con información del producto
- [x] Sistema de autenticación (login/registro)
- [x] Dashboard interactivo con métricas en tiempo real
- [x] CRUD completo de rutinas automatizadas
- [x] Visualización de reportes con gráficos
- [x] Sistema de prorrateo de gastos
- [x] Gestión de metas de ahorro
- [x] Centro de notificaciones
- [x] Chat con asistente IA
- [x] Navegación entre páginas fluida
- [x] Diseño responsive
- [x] Animaciones y transiciones

## 🔄 GitFlow - Flujo de Trabajo

Este proyecto sigue el modelo GitFlow:

### Ramas Principales
- **main** - Código en producción
- **develop** - Rama de desarrollo principal

### Ramas de Soporte
- **feature/** - Nuevas funcionalidades (ej: `feature/login-system`)
- **bugfix/** - Corrección de bugs
- **hotfix/** - Correcciones urgentes en producción
- **release/** - Preparación de nuevas versiones

### Comandos Útiles
```bash
# Crear rama develop
git checkout -b develop

# Crear feature desde develop
git checkout develop
git checkout -b feature/nombre-feature

# Finalizar feature (merge a develop)
git checkout develop
git merge feature/nombre-feature
git branch -d feature/nombre-feature

# Crear release
git checkout develop
git checkout -b release/v1.0.0

# Finalizar release (merge a main y develop)
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
git checkout develop
git merge release/v1.0.0
```

## 📝 Próximas Mejoras

- [ ] Integración con API backend real
- [ ] Autenticación con tokens JWT
- [ ] Base de datos para persistencia
- [ ] Integración con dispositivos IoT reales
- [ ] Panel de administración
- [ ] Exportación de reportes a PDF
- [ ] Notificaciones push
- [ ] Modo oscuro/claro
- [ ] Soporte multiidioma
- [ ] PWA (Progressive Web App)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de un curso académico de Interacción Humano-Computadora (IHC).

## 📧 Contacto

**Leonardo Matias Sanchez Benavente** - [@Matiassb06](https://github.com/Matiassb06)

**Link del Proyecto**: [https://github.com/Matiassb06/ihc-project](https://github.com/Matiassb06/ihc-project)

---

⚡ **SmartWatt** - Transformando hogares en espacios inteligentes y sostenibles
