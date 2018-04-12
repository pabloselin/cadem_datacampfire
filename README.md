# REACT + Victory JS Chart Dashboard

Aplicación para creación de gráficos con REACT y Victory JS

Requerimientos:

nodejs > 8

Creada con create-react-app

Dependencias adicionales:

*   React-router
*   Semantic-UI
*   VictoryJS

-   Canvg (se carga externamente por falta de compatibilidad con REACT)

Para empezar, clonar este repositorio:

    git clone https://github.com/pabloselin/cadem_datacampfire

Luego ingresar al directorio

      yarn install
      yarn start

(Se puede utilizar npm también, pero yarn es más rápido y se está estandarizando últimamente)

La aplicación estará disponible en http://localhost:3000

También se puede generar una versión compilada para subir en cualquier servidor estático

    yarn build

El contenido a subir quedará en la carpeta /build

---

Estructura de la aplicación:

    /assets
    imágenes y recursos estáticos
    /data
    datos de la aplicación
    /components
    Componentes con gráficos
    /layouts
    Componentes para distribución de elementos

Los datos se encuentran en formato json en la carpeta /data con el nombre del gráfico

El tema común para los gráficos y distintas variables de configuración se encuentran en el archivo themes/cadem_theme.js

## Notas

*   El posicionamiento de la leyenda en algunos gráficos tiene que revisarse manualmente dependiendo de la extensión de los datos
*   En el componente /layouts/Dashboard.js se pueden insertar gráficos con el grid de Semantic UI - Cada gráfico requiere de props width y height que son para establecer una relación de proporción (ej: para un gráfico cuadrado se puede usar width={300} height={300} para uno apaisado width={600} height={300} y así...).
*   La anchura real de cada gráfico la calcula el sistema de grillas de Semantic UI según se indica en el ancho de cada componente (<Grid.Column width={4}> para una sección de 4 columnas de ancho)
