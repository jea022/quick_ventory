# QuickVentory 📦

Sistema de gestión de inventario moderno y fácil de usar, construido con React y Firebase.

![QuickVentory](https://img.shields.io/badge/React-19.0.0-blue) ![Firebase](https://img.shields.io/badge/Firebase-11.2.0-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 🌐 Demo

**[Ver aplicación en vivo](https://jea022.github.io/quick_ventory)**

## ✨ Características

- 🔐 **Autenticación segura** - Login y registro con Firebase Auth
- 📦 **Gestión de espacios** - Organiza tu inventario en espacios personalizados
- 📋 **Control de items** - Añade, edita y elimina items con cantidades
- 🔍 **Búsqueda rápida** - Encuentra cualquier item en segundos
- 📊 **Informes** - Genera informes y compara con revisiones anteriores
- 🌙 **Diseño moderno** - Interfaz oscura con glassmorphism
- 📱 **Responsive** - Funciona en móvil, tablet y desktop

## 🛠️ Tecnologías

- **Frontend**: React 19, React Router DOM 7
- **Estilos**: Tailwind CSS, SCSS
- **Backend**: Firebase (Auth + Firestore)
- **Despliegue**: GitHub Pages

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/jea022/quick_ventory.git
cd quick_ventory
```

2. Instala las dependencias:
```bash
npm install --legacy-peer-deps
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run deploy` | Despliega en GitHub Pages |
| `npm test` | Ejecuta los tests |

## 🔥 Configuración de Firebase

El proyecto usa Firebase para autenticación y base de datos. Para usar tu propia instancia:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication (Email/Password)
3. Crea una base de datos en Firestore
4. Copia tu configuración en `src/firebase.js`
5. Configura las reglas de Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /espacios/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /items/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /informes/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📁 Estructura del proyecto

```
src/
├── components/          # Componentes React
│   ├── Navbar.js       # Barra de navegación
│   ├── Layout.js       # Layout principal
│   ├── Inicio.js       # Dashboard
│   ├── Espacios.js     # Lista de espacios
│   ├── VerEspacio.js   # Detalle de espacio
│   ├── Informe.js      # Generador de informes
│   ├── Login.js        # Página de login
│   └── ...
├── context/            # Contextos de React
│   └── AuthContext.js  # Contexto de autenticación
├── services/           # Servicios de Firebase
│   ├── firestore.js    # Operaciones de Firestore
│   └── informes.js     # Servicio de informes
└── utils/              # Utilidades
    └── seedData.js     # Datos de prueba
```

## 👤 Autor

**jea022**

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
