# Backend 2 - Plataforma de Eventos

Backend desarrollado como proyecto para la materia **Backend 2 – Diseño y Arquitectura Backend** de Coderhouse.

---

# Descripción

API REST desarrollada con **Node.js**, **Express** y **MongoDB Atlas**, organizada mediante una arquitectura por capas.

El proyecto implementa autenticación con **Passport.js**, **JWT** y **cookies HttpOnly**, además de un sistema de autorización basado en roles (`user`, `organizer` y `admin`).

La autorización se realiza mediante middlewares reutilizables que diferencian correctamente usuarios no autenticados (**401 Unauthorized**) de usuarios autenticados sin permisos (**403 Forbidden**).

La aplicación quedó preparada para incorporar nuevas estrategias de autenticación (Google, GitHub u otros providers) sin modificar la configuración principal.

---

# Repositorio

GitHub:

https://github.com/Kevingamarra/backend2-eventos

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Passport.js
- Passport Local
- Passport JWT
- Sistema de autorización por roles
- Bcrypt
- JSON Web Token (JWT)
- Cookie Parser
- Dotenv
- CORS

---

# Instalación

## Clonar el repositorio

```bash
git clone https://github.com/Kevingamarra/backend2-eventos.git
```

## Ingresar al proyecto

```bash
cd backend2-eventos
```

## Instalar dependencias

```bash
npm install
```

## Configurar variables de entorno

Crear un archivo `.env` tomando como referencia el archivo `.env.example`.

## Ejecutar el proyecto

```bash
npm start
```

## Modo desarrollo

```bash
npm run dev
```

---

# Variables de entorno

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

# Estructura del proyecto

```text
backend2-eventos/
│
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── passport.config.js
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

# Arquitectura

El proyecto está organizado siguiendo una arquitectura por capas para separar responsabilidades y facilitar el mantenimiento del código.

- **Routes:** definen los endpoints de la API.
- **Controllers:** reciben las peticiones HTTP y generan las respuestas.
- **Repositories:** actúan como intermediarios entre la lógica de negocio y la persistencia.
- **DAO:** realizan el acceso a la base de datos mediante Mongoose.
- **Models:** definen los esquemas de MongoDB.
- **Config:** contiene la configuración de la base de datos y Passport.
- **Middlewares:** centralizan validaciones y autenticación.
- **Utils:** funciones auxiliares utilizadas por el proyecto.

---

# Autenticación

La autenticación está completamente centralizada mediante **Passport.js**.

Se implementaron tres estrategias:

### Register

La estrategia **register** verifica que el correo electrónico no exista previamente, encripta la contraseña utilizando **bcrypt** y crea el usuario con el rol `user`.

### Login

La estrategia **login** valida las credenciales del usuario mediante Passport.

Una vez autenticado correctamente, el controlador genera un **JWT** y lo almacena dentro de una cookie **HttpOnly** llamada `currentUser`.

### Current

La estrategia **current** utiliza **Passport JWT** para validar automáticamente el token almacenado en la cookie.

Si el token es válido, el usuario autenticado queda disponible en `req.user`.

Esta arquitectura permite incorporar fácilmente nuevas estrategias de autenticación (Google, GitHub u otros providers) sin modificar la configuración principal de la aplicación.

---

# Endpoints

## Health

### GET /api/health

Verifica que el servidor se encuentre funcionando correctamente.

---

## Events

### GET /api/events

Obtiene el listado de eventos.

Filtros disponibles:

- status
- category
- location
- dateFrom
- dateTo

Parámetros opcionales:

- page
- limit
- sort

---

### GET /api/events/:id

Obtiene un evento por su identificador.

---

### POST /api/events

Crea un nuevo evento.

Acceso:

- organizer
- admin

El organizador se obtiene automáticamente desde el usuario autenticado.

---

### PUT /api/events/:id

Actualiza un evento existente.

Acceso:

- organizer propietario
- admin

---

### PATCH /api/events/:id/status

Actualiza el estado de un evento.

Estados permitidos:

- draft
- published
- cancelled
- finished

Acceso:

- organizer propietario
- admin

---

## Products

- GET /api/products
- GET /api/products/:pid
- POST /api/products
- DELETE /api/products/:pid

---

## Carts

- GET /api/carts
- GET /api/carts/:cid
- POST /api/carts
- POST /api/carts/:cid/products/:pid
- PUT /api/carts/:cid
- PUT /api/carts/:cid/products/:pid
- DELETE /api/carts/:cid/products/:pid
- DELETE /api/carts/:cid

---

## Sessions

- POST /api/sessions/register
- POST /api/sessions/login
- GET /api/sessions/current
- POST /api/sessions/logout

---

## Users

- GET /api/users

---

# Ejemplos de uso

## Registro de usuario

### POST /api/sessions/register

Body:

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
  "payload": {
    "_id": "...",
    "first_name": "Kevin",
    "last_name": "Gamarra",
    "email": "kevin@mail.com",
    "role": "user"
  }
}
```

---

## Inicio de sesión

### POST /api/sessions/login

Body:

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

Además, el servidor genera un JWT y lo almacena en una cookie **HttpOnly** llamada `currentUser`.

---

## Usuario autenticado

### GET /api/sessions/current

Respuesta:

```json
{
  "status": "success",
  "payload": {
    "id": "...",
    "email": "kevin@mail.com",
    "role": "user"
  }
}
```

---

## Cierre de sesión

### POST /api/sessions/logout

Respuesta:

```json
{
  "status": "success",
  "message": "Sesión cerrada"
}
```

---

# Roles

El sistema implementa tres roles de usuario:

- **user**: puede consultar eventos publicados.
- **organizer**: puede crear eventos y modificar únicamente los eventos que creó.
- **admin**: tiene acceso administrativo y puede gestionar cualquier recurso.

El registro público siempre crea usuarios con el rol **user**. Los roles **organizer** y **admin** se asignan posteriormente por un administrador.

---

# Matriz de permisos

| Acción | user | organizer | admin |
|--------|:----:|:---------:|:-----:|
| Consultar eventos | Sí | Sí | Sí |
| Crear eventos | No | Sí | Sí |
| Modificar eventos propios | No | Sí | Sí |
| Modificar cualquier evento | No | No | Sí |
| Ver todos los usuarios | No | No | Sí |

---

# Rutas protegidas

- **GET /api/sessions/current** → Requiere autenticación.
- **POST /api/events** → Solo **organizer** o **admin**.
- **PUT /api/events/:id** → Solo el **organizer** propietario del evento o un **admin**.
- **GET /api/users** → Solo **admin**.

---

# Autenticación y autorización

La API diferencia correctamente los errores de autenticación y autorización.

**401 Unauthorized**

Se devuelve cuando el usuario no posee una sesión válida o el JWT es inexistente o inválido.

**403 Forbidden**

Se devuelve cuando el usuario está autenticado correctamente, pero no posee permisos para ejecutar la acción solicitada.

---

# Funcionalidades implementadas

- Arquitectura organizada por capas.
- Persistencia con MongoDB Atlas y Mongoose.
- CRUD de productos.
- Gestión de carritos.
- Gestión completa de eventos.
- Filtros por estado, categoría, ubicación y rango de fechas.
- Paginación y ordenamiento del listado de eventos.
- Estados de eventos: draft, published, cancelled y finished.
- Validaciones de negocio en la capa services.
- Asociación de cada evento con su organizador mediante ObjectId.
- Autenticación mediante Passport.js.
- Estrategias Passport Local (`register` y `login`).
- Estrategia Passport JWT (`current`).
- Sistema de autorización basado en roles (`user`, `organizer` y `admin`).
- Middlewares reutilizables de autenticación y autorización.
- Protección de rutas mediante JWT almacenado en cookies HttpOnly.
- Validación de propiedad de recursos para organizadores.
- Ruta administrativa protegida para administradores.
- Contraseñas encriptadas con bcrypt.
- Variables de entorno mediante dotenv.
- Proyecto preparado para incorporar nuevas estrategias de autenticación (Google, GitHub u otros providers).

---

# Autor

**Kevin Gamarra**

Proyecto desarrollado como entrega para la materia **Backend 2 – Diseño y Arquitectura Backend** de Coderhouse.

