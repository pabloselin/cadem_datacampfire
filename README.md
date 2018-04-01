# REACT + Victory JS Chart Dashboard

Aplicación para creación de gráficos con REACT y Victory JS

Requerimientos:

nodejs > 8

Para empezar, clonar este repositorio:

    git clone https://github.com/pabloselin/cadem_datacampfire

Luego ingresar al directorio

      npm install
      npm run start

La aplicación estará disponible en http://localhost:3000

También se puede generar una versión compilada para subir en cualquier servidor estático

    npm run build

El contenido a subir quedará en la carpeta /build

---

Estructura de la aplicación:

Los datos se encuentran en formato json en la carpeta /data con el nombre del gráfico (esto es algo que debería coordinarse mejor posteriormente)

El tema común para los gráficos y distintas variables de configuración se encuentran en el archivo themes/cadem_theme.js

Cada gráfico cuenta con un archivo .css independiente que permite modificar ciertas cosas del layout.

##TODO

*   Implementar más gráficos
*   Mejorar la imagen de descarga de los gráficos / añadir csv de descarga de datos
*   Separar carga de datos según especificaciones del cliente
