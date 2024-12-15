Proyecto E-commerce

Descripción

Este proyecto es una plataforma de e-commerce para la venta de accesorios para celulares. 
Los usuarios pueden registrarse, iniciar sesión, navegar por los productos, agregar productos 
al carrito y realizar compras. El proyecto utiliza Node.js, Express y PostgreSQL en el backend, y HTML, 
CSS y JavaScript en el frontend.

Características

Registro e inicio de sesión de usuarios
Navegación de productos
Agregar productos al carrito de compras
Realizar compras
Reducción automática de la cantidad de productos en la base de datos tras una compra
Mensajes de alerta cuando un usuario no existe o la cantidad de producto es insuficiente

Requisitos
Node.js (v14 o superior)
PostgreSQL

Instalación

Clona el repositorio:
git clone https://github.com/tu_usuario/e-commerce.git
cd e-commerce

Instala las dependencias:
npm install

Configura las variables de entorno:
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
DATABASE_URL=tu_database_url

Configura la base de datos:
Conecta a tu base de datos PostgreSQL y ejecuta el contenido del archivo schema.sql para 
crear las tablas necesarias:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL
);

Inicia el servidor:
npm start

Accede a la aplicación en tu navegador:
http://localhost:3000
Despliegue en Vercel

Instala Vercel CLI (si no lo tienes ya instalado):
npm install -g vercel

Inicia sesión en Vercel:
vercel login

Despliega el proyecto:
vercel

Configura las variables de entorno en Vercel:
Ve a tu panel de control en Vercel.
Selecciona tu proyecto.
Ve a la sección de "Environment Variables".
Añade DATABASE_URL con la URL de tu base de datos PostgreSQL.

Uso
Navegación de productos: Los usuarios pueden ver los productos disponibles en la página principal.
Agregar al carrito: Los usuarios pueden agregar productos al carrito.
Realizar compra: Los usuarios pueden hacer clic en el botón "Buy" para realizar la compra y reducir 
la cantidad de productos en la base de datos.