# Backend 2 - Plataforma de Eventos

Backend desarrollado como proyecto para la materia **Backend 2 – Diseño y Arquitectura Backend** de Coderhouse.

## Descripción

API REST desarrollada con Node.js, Express y MongoDB Atlas, organizada mediante una arquitectura por capas. El proyecto incluye autenticación con JWT, cookies HttpOnly, encriptación de contraseñas con bcrypt y persistencia de datos utilizando MongoDB.

---

## Repositorio

GitHub:

https://github.com/Kevingamarra/backend2-eventos

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Bcrypt
- JSON Web Token (JWT)
- Cookie Parser
- Dotenv
- CORS

---

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/Kevingamarra/backend2-eventos.git
```

### Ingresar al proyecto

```bash
cd backend2-eventos
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

Crear un archivo `.env` tomando como referencia el archivo `.env.example`.

### Ejecutar el proyecto

```bash
npm start
```

### Modo desarrollo

```bash
npm run dev
```

---

## Variables de entorno

El proyecto utiliza las siguientes variables:

- **PORT**: puerto donde se ejecuta el servidor.
- **NODE_ENV**: entorno de ejecución.
- **MONGO_URL**: cadena de conexión a MongoDB Atlas.
- **JWT_SECRET**: clave utilizada para firmar los tokens JWT.
- **JWT_EXPIRES_IN**: tiempo de expiración del token.

Ejemplo del archivo `.env.example`:

```env
PORT=4000
NODE_ENV=development
MONGO_URL=
JWT_SECRET=
JWT_EXPIRES_IN=1h
```

---

## Estructura del proyecto

```
backend2-eventos/
│
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── dao/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── .env.example
├── package.json
└── README.md
```

---

## Endpoints

### Health

**GET /api/health**

Verifica que el servidor esté funcionando correctamente.

---

### Events

**GET /api/events**

Obtiene el listado de eventos.

---

### Products

**GET /api/products**

Devuelve todos los productos registrados.

**GET /api/products/:pid**

Obtiene un producto mediante su ID.

**POST /api/products**

Crea un nuevo producto.

**DELETE /api/products/:pid**

Elimina un producto por su ID.

---

### Carts

**GET /api/carts**

Obtiene todos los carritos.

**GET /api/carts/:cid**

Obtiene un carrito mediante su ID.

**POST /api/carts**

Crea un carrito vacío.

**POST /api/carts/:cid/products/:pid**

Agrega un producto a un carrito.

**PUT /api/carts/:cid**

Actualiza el contenido completo de un carrito.

**PUT /api/carts/:cid/products/:pid**

Actualiza la cantidad de un producto dentro del carrito.

**DELETE /api/carts/:cid/products/:pid**

Elimina un producto del carrito.

**DELETE /api/carts/:cid**

Vacía el carrito.

---

### Sessions

**POST /api/sessions/register**

Registra un nuevo usuario almacenando la contraseña encriptada con bcrypt.

**POST /api/sessions/login**

Inicia sesión, genera un JWT y lo almacena en una cookie HttpOnly.

**GET /api/sessions/current**

Obtiene la información del usuario autenticado validando el token.

**POST /api/sessions/logout**

Cierra la sesión eliminando la cookie de autenticación.

---

## Ejemplos de uso

### Registro de usuario

**POST /api/sessions/register**

```json
{
  "first_name": "Kevin",
  "last_name": "Gamarra",
  "email": "kevin@mail.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "status": "success",
  "message": "Usuario registrado correctamente"
}
```

---

### Inicio de sesión

**POST /api/sessions/login**

```json
{
  "email": "kevin@mail.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "status": "success",
  "message": "Login correcto"
}
```

---

### Usuario autenticado

**GET /api/sessions/current**

```json
{
  "status": "success",
  "payload": {
    "_id": "...",
    "first_name": "Kevin",
    "last_name": "Gamarra",
    "email": "kevin@mail.com"
  }
}
```

---

### Cerrar sesión

**POST /api/sessions/logout**

Respuesta:

```json
{
  "status": "success",
  "message": "Logout correcto"
}
```

---

## Funcionalidades implementadas

- Arquitectura organizada por capas.
- Conexión a MongoDB Atlas mediante Mongoose.
- Registro de usuarios con contraseñas encriptadas utilizando bcrypt.
- Autenticación mediante JWT y cookies HttpOnly.
- Middleware para proteger rutas privadas.
- CRUD de productos.
- Gestión de carritos.
- Configuración mediante variables de entorno.

---

## Autor

Kevin Gamarra

Proyecto desarrollado como entrega para la materia **Backend 2 – Diseño y Arquitectura Backend** de Coderhouse.

