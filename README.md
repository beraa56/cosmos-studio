# COSMOS Studio

**Your creative assistant to design photography sessions with intention.**  
Creative System by Bernardita Aguirre

---

## Cómo publicar en internet (paso a paso)

### Paso 1 — Crear cuenta en GitHub
1. Ve a https://github.com y crea una cuenta gratuita
2. Haz clic en **"New repository"** (botón verde)
3. Nombre: `cosmos-studio`
4. Selecciona **Public**
5. Haz clic en **"Create repository"**

---

### Paso 2 — Subir estos archivos a GitHub
1. En tu nuevo repositorio, haz clic en **"uploading an existing file"**
2. Arrastra TODOS estos archivos y carpetas:
   - `package.json`
   - `vite.config.js`
   - `index.html`
   - `.env.example`
   - La carpeta `src/` completa (con `main.jsx` y `App.jsx` adentro)
3. Haz clic en **"Commit changes"**

---

### Paso 3 — Obtener tu API Key de Anthropic
1. Ve a https://console.anthropic.com
2. Crea una cuenta gratuita (incluye créditos de inicio)
3. Ve a **API Keys** → **Create Key**
4. Copia la clave (empieza con `sk-ant-...`)

---

### Paso 4 — Publicar en Vercel
1. Ve a https://vercel.com
2. Haz clic en **"Sign up"** → elige **"Continue with GitHub"**
3. Haz clic en **"Add New Project"**
4. Selecciona tu repositorio `cosmos-studio`
5. Antes de hacer Deploy, busca la sección **"Environment Variables"**:
   - **Name:** `VITE_ANTHROPIC_API_KEY`
   - **Value:** pega tu API key aquí
6. Haz clic en **"Deploy"**

¡Listo! En 2-3 minutos tendrás tu app en una URL pública.

---

## Estructura de archivos

```
cosmos-studio/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── src/
    ├── main.jsx
    └── App.jsx
```

---

## Créditos

COSMOS Studio — Creative System by Bernardita Aguirre  
Method C.R.E.A.R
