# Lab07 - Autenticación JWT con Node y React

Este repositorio contiene un backend en Node/Express con JWT y Sequelize + MySQL, y un frontend en React/Vite.

## Despliegue local con Docker

1. Asegúrate de tener Docker instalado.
2. En la raíz del proyecto ejecuta:
   ```bash
   docker-compose up --build
   ```
3. Accede al frontend en `http://localhost:4173`.
4. El backend estará en `http://localhost:3000`.

## Variables de entorno en Docker

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_DIALECT`
- `AUTH_SECRET`
- `JWT_EXPIRATION`
- `VITE_API_URL`

## Despliegue GitHub / remoto

Si ya tienes el repositorio remoto configurado, puedes subir tus cambios con:

```bash
git add .
git commit -m "Configurar despliegue con Docker y variables de entorno"
git push origin master
```

## Uso local sin Docker

### Backend
```bash
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Nota
El API del frontend usa `VITE_API_URL` si está configurado, o `http://localhost:3000` por defecto.
