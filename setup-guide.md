# 📋 SETUP PASO A PASO - MENU SEMANAL

## 🎯 OBJETIVO
Automatizar la carga del menú semanal desde WhatsApp a la app con 1 solo paso manual.

---

## 📁 PASO 1: CREAR REPOSITORIO GITHUB

### 1.1 Ir a GitHub.com
- Iniciar sesión
- Click en "+" (arriba derecha)
- "New repository"

### 1.2 Configurar repositorio
- **Repository name**: `menu-semanal`
- **Description**: `Menú semanal para la app`
- **Public** ✅ (importante: debe ser público)
- **Add README**: ✅
- **Add .gitignore**: No por ahora

### 1.3 Crear archivo
- Click en "Add file"
- Nombre: `menu-semanal.txt`
- Pegar el texto del menú de WhatsApp

---

## 📄 CONTENIDO INICIAL (menu-semanal.txt)

```
Menú semanal

Menú 1: Diario
Lunes: pollo al la portuguesa con arroz
Martes: espaguetis con  estofado de pulpetines
Miércoles: lasaña
Jueves: milanesa a la napolitana
Viernes: Sandwich de bondiola con papas

Menú 2: Sano
Lunes: Buñuelitos de acelga
Martes: Costillitas de cerdo con pure de calabaza
Miércoles: Crep de verdura con salsa mixta
Jueves: Milanesitas de verduras con ensalada
Viernes: Churrasquito de pollo a la plancha con verduras

Menú 3: Ensalada
Lunes: Lechuga, zanahoria, tomate cherry, cubos de queso, brote de soja
Martes: Rucula, verduras grilladas, jamón, tomate cherry
Miercoles: Radicheta, cubos de naranja, cubos de queso, jamón
Jueves: Penne rigattis, tomate cherry, albahaca, cubos de jamón
Viernes: Ensalada capresse 

Menú 4: Vegetariano
Lunes: Zapallito relleno con ensalada
Martes: Pasta con vegetales
Miercoles: Albondigas de lenteja con ensalada
Jueves: Risotto de verduras
Viernes: Hamburguesa de vegetales a la napolitana

Menú 5: Opcional
Pollo todos los días
```

---

## 🔄 PASO 2: OBTENER URL DEL ARCHIVO

### 2.1 Una vez creado el archivo:
- Ir al archivo `menu-semanal.txt`
- Click en "Raw"
- Copiar la URL (ej: `https://raw.githubusercontent.com/TU_USERNAME/menu-semanal/main/menu-semanal.txt`)

### 2.2 Esta URL la necesitaremos para la app

---

## ⚙️ PASO 3: CONFIGURAR LA APP

### 3.1 Actualizar githubService.js con tus datos:
```javascript
export class GitHubService {
  constructor() {
    this.REPO_OWNER = 'TU_USERNAME';  // ← Tu usuario de GitHub
    this.REPO_NAME = 'menu-semanal';
    this.FILE_PATH = 'menu-semanal.txt';
    this.RAW_URL = 'https://raw.githubusercontent.com/TU_USERNAME/menu-semanal/main/menu-semanal.txt';
  }
}
```

---

## 🧪 PASO 4: PROBAR

### 4.1 En la terminal:
```bash
npm run dev
```

### 4.2 La app debería:
- Cargar el menú desde GitHub automáticamente
- Procesar el texto
- Mostrar el menú actualizado

---

## 📝 PASO 5: FLUJO DE TRABAJO SEMANAL

### Cada semana:
1. **Recibir menú por WhatsApp**
2. **Copiar texto**
3. **Editar archivo en GitHub** (2 clicks)
4. **¡Listo!** La app se actualiza sola

### Tiempo total: **2-3 minutos** (vs 30-45 minutos manual)

---

## 🆘 HELP

### Si algo no funciona:
1. **Archivo no encontrado**: Revisar URL del archivo Raw
2. **Error 404**: Verificar que el repositorio sea público
3. **Formato incorrecto**: Seguir template exacto

### Contacto soporte:
- 📱 WhatsApp para ayuda rápida
- 📧 Email para problemas técnicos
