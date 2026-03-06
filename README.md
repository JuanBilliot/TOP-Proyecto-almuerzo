# Maida - Menú del Día

Una aplicación elegante de menú del día con diseño pastel y moderna interfaz de usuario.

## Características

- 🎨 **Diseño estético con colores pastel**
- 📱 **Totalmente responsive**
- ✨ **Animaciones suaves y transiciones**
- 🍽️ **5 menús diferentes con descripciones**
- ☑️ **Checkboxes personalizados**
- 👤 **Header personalizado con nombre del usuario**

## Tecnologías Utilizadas

- **React 18** - Framework frontend
- **Vite** - Herramienta de build
- **TailwindCSS** - Framework de estilos
- **Lucide React** - Iconos modernos

## Instalación

1. Navega a la carpeta del proyecto:
```bash
cd Maida
```

2. Instala las dependencias:
```bash
npm install
```

## Ejecutar la Aplicación

### Modo Desarrollo
```bash
npm run dev
```
La aplicación se abrirá en `http://localhost:5173`

### Modo Producción
```bash
npm run build
npm run preview
```

## Personalización

### Cambiar el nombre del usuario
Edita la línea en `src/App.jsx`:
```javascript
const userName = "Giselle Morbello"; // Cambia aquí el nombre
```

### Modificar menús
Edita el array `menuItems` en `src/App.jsx` para agregar, eliminar o modificar los menús disponibles.

### Colores personalizados
Los colores pastel están definidos en `tailwind.config.js` bajo la sección `colors.pastel`.

## Estructura del Proyecto

```
Maida/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html           # HTML principal
├── package.json         # Dependencias
├── tailwind.config.js   # Configuración de Tailwind
├── postcss.config.js    # Configuración de PostCSS
├── vite.config.js       # Configuración de Vite
└── README.md           # Este archivo
```

## Capturas de Pantalla

La aplicación presenta:
- Header elegante con nombre de usuario
- 5 tarjetas de menú con diseño pastel
- Checkboxes estéticos para selección
- Botón de envío con animaciones
- Elementos decorativos sutiles

## Licencia

MIT License
