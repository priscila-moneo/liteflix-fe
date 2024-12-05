
# Liteflix Frontend

Liteflix-fe es una aplicación web desarrollada con Next.js, React y Tailwind CSS. El objetivo principal del proyecto es proporcionar una plataforma sencilla para gestionar películas, con funcionalidades como agregar y visualizar películas en una interfaz amigable.

Puede verse en el siguiente link: http://[https://liteflix-fe.vercel.app/](https://liteflix-fe.vercel.app/)

## Índice

- [Características](#características)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Despliegue y CI/CD](#despliegue-y-cicd)
- [Backend](#backend)

## Características

- **Interfaz de usuario responsiva**: La interfaz está diseñada para ser accesible tanto en dispositivos de escritorio como móviles.
- **Lista de películas**: Los usuarios pueden ver una lista de películas con la opción de agregar nuevas entradas.
- **Cargar imágenes de portada**: Los usuarios pueden cargar imágenes de portada de películas con una interfaz de usuario simple.
- **Búsqueda**: Implementación de búsqueda para filtrar películas por título.
- **Edición y eliminación de películas**: Los usuarios pueden modificar o eliminar películas que hayan sido añadidas previamente.
- **Optimización de rendimiento**: El proyecto utiliza React Query para gestionar la carga y sincronización de datos de forma eficiente.
- **Despliegue en Vercel**: La aplicación está desplegada en Vercel, lo que garantiza un rendimiento óptimo y tiempos de carga rápidos.
- **Cloudinary como almacenamiento de imágenes**: Se utiliza Cloudinary como bucket de imágenes para la carga y gestión de imágenes de las películas.

## Tecnologías utilizadas

- **Next.js**: Framework de React para aplicaciones web rápidas y optimizadas.
- **React**: Librería para construir interfaces de usuario interactivas.
- **React Query**: Librería para la gestión de datos asincrónicos y caché, optimizando las peticiones a la API.
- **Tailwind CSS**: Framework de utilidades para la creación de interfaces modernas y responsivas.
- **Zustand**: Librería de gestión de estado para React, para un manejo sencillo del estado de la aplicación.
- **Framer Motion**: Librería para animaciones fluidas y transiciones en la interfaz.
- **Axios**: Cliente HTTP para realizar peticiones a la API.
- **Sass**: Preprocesador CSS para un estilo más organizado.
- **Autoprefixer**: Herramienta para añadir prefijos automáticos a las reglas CSS.
- **Cloudinary**: Servicio de almacenamiento de imágenes para gestionar las portadas de las películas.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/priscila-moneo/liteflix-fe.git

2. Accede al directorio del proyecto:

   ```bash
   cd liteflix-fe

3. Instala las dependencias:

   ```bash
   npm install

4. Crea un archivo `.env.local` en el directorio raíz con las siguientes variables de entorno:

   ```bash
   NEXT_PUBLIC_API_URL=https://liteflix-be.vercel.app
   NEXT_PUBLIC_FRONTEND_URL=https://liteflix-fe.vercel.app
   NEXT_PUBLIC_API_KEY=6f26fd536dd6192ec8a57e94141f8b20

5. Ejecuta el servidor de desarrollo:
   
   ```bash
   npm run dev

Esto iniciará la aplicación en http://localhost:3000.


## Despliegue y CI/CD

Este frontend está desplegado en **Vercel** para facilitar su acceso en producción. Puedes acceder a la aplicación en la siguiente URL:

Además, la integración continua está configurada para ejecutarse automáticamente cada vez que se realiza un **merge** en la rama `main` en GitHub.


## Backend
El backend de esta aplición está disponible en un repositorio separado. Puedes acceder al código del backend [aquí](https://github.com/priscila-moneo/liteflix-be).
