# Culqi Test Backend - Ernesto Gutierrez Cuba

## Descripción

Este proyecto esta desarrollado con Node.js, TypeScript, Serverless Framework, MongoDB y MySQL.

## Requisitos

- Node.js 18.x o superior
- MySQL 5.7 o superior
- MongoDB 4.4 o superior
- Serverless Framework instalado (`npm install -g serverless`)

## Instalación

1. Clona este repositorio: `git clone https://github.com/ernestogut/culqi-test-back.git`
2. Ingresa al directorio del proyecto: `cd culqi-test-back`
3. Instala las dependencias: `npm install`

## Configuración

1. Agrega las siguientes variables de entorno en el archivo .env en la raiz del proyecto, utilizando el .env.example como guía:

**NOTA:** Asegurate de tener permiso para acceder a las conexiones a la base de datos (MySQL o MongoDB).

**NOTA 2:** La base de datos en MySQL en este caso "culqi_users" tiene que estar creada previamente.

```bash
# URI de conexión a MongoDB
MONGODB_URI=mongodb://localhost:27017/culqi_test
# Datos de conexión a MySQL
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=culqi_users
DB_USERNAME=root
DB_PASSWORD=root
# Datos del usuario por defecto en la prueba (con estas credenciales podras iniciar sesion en la aplicacion)
SHOP_USERNAME=ernestogut
SHOP_PASSWORD=123456
```

2. Ejecuta migraciones para crear el usuario por defecto en MySQL: `npm run migration`

## Postman

Abre Postman, dale click al MenuBar/File/Import y arrastra el archivo: `culqi-test.postman_collection.json` a la ventana que aparece en la pantalla de la aplicación.

## Despliegue

Para desplegar la aplicación en un entorno local, ejecuta el comando:

```
sls offline start
```

Para desplegar la aplicación en AWS, ejecuta el comando: (debes tener configurado el AWS CLI)

1. Descargar AWS CLI (https://aws.amazon.com/cli/)
2. Abrir una terminal y ejecutar el comando: `aws configure`
3. Ingresar las credenciales de AWS (Access Key ID, Secret Access Key, Default region name)

```
sls deploy
```

## Uso

### Ruta POST (Users)

- **Endpoint:** `/login`
- **Descripción:** Inicia sesion en la aplicacion.
- **Método:** POST
- **Cuerpo de la solicitud:**
  ```json
  {
    "username": "ernestogut",
    "password": "123456"
  }
  ```
- **Respuesta exitosa:** Código de estado 200 OK y cuerpo JSON con el mensaje y los datos del usuario logeado.

### Ruta POST (Cards)

- **Endpoint:** `/tokenize-card`
- **Descripción:** Registra una tarjeta de credito y genera un token para su posterior uso en los servicios de Culqi.
- **Método:** POST
- **Encabezados:**
  - Authorization: PK del comercio
- **Cuerpo de la solicitud:**
  ```json
  {
    "card_number": 370353664302622,
    "cvv": 4532,
    "expiration_month": "2",
    "expiration_year": "2028",
    "email": "ernesto@gmail.com"
  }
  ```
- **Respuesta exitosa:** Código de estado 200 OK y cuerpo JSON con el token generado.

### Ruta GET (Cards)

- **Endpoint:** `/find-card`
- **Descripción:** Obtiene los datos de la tarjeta relacionada al token generado.
- **Método:** GET
- **Encabezados:**
  - Authorization: Token generado
  - AuthorizationPK: PK del comercio
- **Respuesta exitosa:** Código de estado 200 OK y cuerpo JSON con los datos de la tarjeta.

## Pruebas unitarias

Para ejecutar las pruebas unitarias, utiliza el comando:

```
npm test
```

## Documentación

Una vez desplegado podemos acceder a la documentacion de Swagger en la siguiente ruta:

```
Ambiente Local: http://localhost:3000/swagger
Producción: https://<api-id>.execute-api.us-east-1.amazonaws.com/swagger
```
