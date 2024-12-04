Descripción
Este proyecto configura un servidor local utilizando Node.js y PostgreSQL. Incluye instrucciones para la instalación, configuración y ejecución del servidor.

Requisitos
Node.js (versión 14 o superior)
PostgreSQL (versión 12 o superior)
npm (versión 6 o superior)
Git
Instalación
1. Clonar el repositorio
Primero, clona este repositorio en tu máquina local:

bash
Copiar código
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
2. Instalar dependencias
Instala las dependencias necesarias utilizando npm:

bash
Copiar código
npm install
3. Configurar la base de datos PostgreSQL
3.1. Crear la base de datos
Accede a tu terminal de PostgreSQL y crea una nueva base de datos:

sql
Copiar código
CREATE DATABASE nombre_de_tu_base_de_datos;
3.2. Configurar el usuario y los permisos
Crea un usuario y otórgale permisos sobre la base de datos:

sql
Copiar código
CREATE USER tu_usuario WITH PASSWORD 'tu_contraseña';
GRANT ALL PRIVILEGES ON DATABASE nombre_de_tu_base_de_datos TO tu_usuario;
3.3. Ejecutar las migraciones (si tienes)
Si tu proyecto incluye migraciones para crear tablas y esquemas, ejecuta las migraciones ahora:

bash
Copiar código
npm run migrate
4. Configurar las variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

plaintext
Copiar código
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
DB_PORT=5432
PORT=3000
Asegúrate de reemplazar tu_usuario, tu_contraseña, y nombre_de_tu_base_de_datos con los valores adecuados.

5. Iniciar el servidor
Finalmente, inicia el servidor ejecutando:

bash
Copiar código
npm start
El servidor debería estar corriendo en http://localhost:3000.

Scripts
npm start: Inicia el servidor en modo de producción.
npm run dev: Inicia el servidor en modo de desarrollo con nodemon.
npm run migrate: Ejecuta las migraciones de la base de datos (si aplica).