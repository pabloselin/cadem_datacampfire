# REACT + Victory JS Chart Dashboard

Aplicación para creación de gráficos con REACT y Victory JS

Requerimientos:

nodejs > 8

Creada con create-react-app

Dependencias adicionales:

*   React-router
*   Semantic-UI
*   VictoryJS

-   json2csv

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
    /parts
    Archivo del componente Main.js donde se ubican las rutas y la composición del Dashboard

Los datos se encuentran en formato json en la carpeta /data con el nombre del gráfico

El tema común para los gráficos y distintas variables de configuración se encuentran en el archivo themes/cadem_theme.js

## Modo de uso

Cada Ruta en /parts/Main.js puede recibir un componente Dashboard distinto con distintos datos y organización.

Ejemplo usado en la ruta principal:

    <Route
                exact
                path="/"
                render={props => (
                    <Dashboard>
                        <Grid.Column width={8}>
                            <GroupedBars
                                data={groupbar_data}
                                height={326}
                                width={600}
                                theme={cadem_theme}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <SingleBars
                                data={singlebar_data}
                                height={200}
                                width={300}
                                theme={cadem_theme}
                            />
                            <Pie
                                data={pie_data}
                                height={300}
                                width={300}
                                theme={cadem_theme}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Stacked
                                width={600}
                                height={300}
                                data={stacked_data}
                                theme={cadem_theme}
                                colorscale={["#595753", "#cccccc"]}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Scatter
                                data={scatter_data}
                                height={300}
                                width={600}
                                theme={cadem_theme}
                            />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <LineBars
                                data={linebars_data}
                                height={260}
                                width={600}
                                theme={cadem_theme}
                            />
                        </Grid.Column>
                    </Dashboard>
                )}
            />

Las variables height y width de los componentes de gráfico son para mantener la proporción del SVG y no son píxeles reales.

## Componentes de Gráficos

Los componentes de Gráficos reciben valores de datos en un objeto json, además de otros props adicionales dependiendo del tipo de gráfico.

## Componentes KPI

Los componentes KPI son componentes más simples que reciben un solo valor a partir del que se genera la información. Reciben un prop "semaforo" para cambiar la paleta según el criterio del dato. (Se podría por ejemplo añadir una función de umbral para automáticamente devolver el color del semáforo dependiendo de la naturaleza de los datos)

Ejemplo:

            <KPI_semicirculo
                    percent={45}
                    title="Efectividad"
                    subtitle="Abr 2018"
                    theme={cadem_theme}
                    semaforo="verde"
            />

## Descarga de CSV

El componente /components/mini/DownloadButton.js permite generar un archivo csv para descarga utilizando la librería json2csv (https://www.npmjs.com/package/json2csv). Es necesario definir una estructura de columnas con los datos disponibles en el gráfico para generar un archivo csv coherente. La estructura se define con los props fields (array) que relaciona nombre de columna y valor y unwind (array) que desglosa el archivo Json multidimensional.

Se puede revisar la documentación de json2csv para otro tipo de funciones (modificar valores, cambiar caracteres de separación etc.)

Ejemplo para un gráfico de barras agrupadas:

    <DownloadButton
                    data={this.props.data}
                    type="groupedbars"
                    fields={[
                        { label: "Compañía", value: "data.x" },
                        { label: "Tipo", value: "title" },
                        { label: "Porcentaje", value: "data.y" }
                    ]}
                    unwind={["data"]}
                />

## Descarga de PNG

El componente /components/mini/DownloadButton.js también tiene una funcionalidad para generar archivos en formato .png pero su desarrollo está incompleto. Utiliza la librería canvg para convertir el SVG de VictoryCharts a un elemento Canvas y de ahí procesar el contenido para generar una dataurl que se puede abrir o descargar.

## Notas

*   El posicionamiento de la leyenda en algunos gráficos tiene que revisarse manualmente dependiendo de la extensión de los datos

*   La anchura real de cada gráfico la calcula el sistema de grillas de Semantic UI según se indica en el ancho de cada componente (<Grid.Column width={4}> para una sección de 4 columnas de ancho)
