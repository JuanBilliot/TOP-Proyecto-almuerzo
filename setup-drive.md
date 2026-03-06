# 📋 SETUP GOOGLE DRIVE - MENU SEMANAL

## 🎯 VENTAJAS DE GOOGLE DRIVE
- ✅ Todos en la empresa ya tienen acceso
- ✅ No necesita cuentas técnicas
- ✅ Edición simple como un documento de texto
- ✅ Control de permisos por carpetas
- ✅ Backup automático de Google

---

## 📁 PASO 1: CREAR ESTRUCTURA EN DRIVE

### 1.1 Crear carpeta principal
- Ir a Google Drive
- Click en **"Nuevo"** → **"Carpeta"**
- Nombre: `Menu Semanal App`

### 1.2 Compartir carpeta
- Click derecho en la carpeta
- **"Compartir"**
- Añadir a las personas que cargan el menú
- Permisos: **"Editor"**

### 1.3 Crear archivo
- Dentro de la carpeta, click en **"Nuevo"** → **"Documentos de Google"**
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

## 🔐 PASO 2: HACER PÚBLICO EL ARCHIVO

### 2.1 Obtener enlace para compartir
- Click derecho en `menu-semanal.txt`
- **"Compartir"**
- **"Copiar enlace"**

### 2.2 Convertir a enlace público
- El enlace se ve así: `https://docs.google.com/document/d/DOC_ID/edit`
- Cambiar a: `https://docs.google.com/document/d/DOC_ID/export?format=txt`

### 2.3 Probar el enlace
- Pegar en el navegador
- Debe mostrar el texto plano del menú

---

## ⚙️ PASO 3: CONFIGURAR LA APP

### 3.1 Actualizar driveService.js
```javascript
export class DriveService {
  constructor() {
    this.DOC_URL = "https://docs.google.com/document/d/DOC_ID/export?format=txt";
  }
}
```

### 3.2 Reemplazar DOC_ID con el ID real

---

## 🔄 PASO 4: FLUJO DE TRABAJO SEMANAL

### Cada semana:
1. **Recibir menú por WhatsApp**
2. **Abrir Google Drive**
3. **Editar menu-semanal.txt** (Ctrl+C, Ctrl+V)
4. **Guardar** (Ctrl+S)
5. **¡Listo!** La app se actualiza sola

### Tiempo total: **30 segundos**

---

## 🎯 OPCIÓN ALTERNATIVA: GOOGLE SHEETS

Si prefieren Sheets en lugar de Docs:

### Estructura en Google Sheets:
| Menú | Lunes | Martes | Miércoles | Jueves | Viernes |
|------|-------|--------|-----------|--------|---------|
| Menú 1: Diario | Pollo a la portuguesa | Espaguetis | Lasaña | Milanesa | Sandwich |
| Menú 2: Sano | Buñuelitos | Costillitas | Crep | Milanesitas | Churrasquito |
| ... | ... | ... | ... | ... | ... |

### URL para Sheets:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/export?format=csv&gid=0
```

---

## 🆘 HELP

### Si no funciona:
1. **Error 403**: Verificar que el enlace sea público
2. **Error 404**: Revisar el DOC_ID
3. **No carga texto**: Probar el enlace en navegador primero

### Ventajas vs GitHub:
- ✅ **Usuarios no técnicos** pueden editar
- ✅ **Permisos granulares** por usuario
- ✅ **Interfaz familiar** de Google
- ✅ **Backup automático** de Google
- ✅ **Control de versiones** integrado

---

## 🚀 IMPLEMENTACIÓN INMEDIATA

1. **Crear carpeta en Drive** (2 minutos)
2. **Subir archivo inicial** (1 minuto)
3. **Compartir con usuarios** (1 minuto)
4. **Configurar app** (2 minutos)

**Total: 6 minutos** vs **30+ minutos** manualmente
