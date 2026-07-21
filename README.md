# Backend 2 - Plataforma de Eventos

## Descripción

API REST desarrollada con Node.js, Express y MongoDB siguiendo una arquitectura por capas como base para una plataforma de gestión de eventos.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Dotenv

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` tomando como referencia `.env.example`.

## Ejecución

```bash
npm start
```

## Estructura

```
src/
├── config/
├── controllers/
├── dao/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js
```

## Endpoints

- GET /api/health
- GET /api/products
- GET /api/carts
- GET /api/events
- GET /api/sessions