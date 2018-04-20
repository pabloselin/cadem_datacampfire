import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import cadem_theme from "../../themes/cadem_theme.js";

import GroupedBarsTwelve from "../../components/twelve/GroupedBarsTwelve.js";
import GroupedBarsSix from "../../components/six/GroupedBarsSix.js";
import GroupedBarsFour from "../../components/four/GroupedBarsFour.js";

import SingleBarsTwelve from "../../components/twelve/SingleBarsTwelve.js";
import SingleBarsSix from "../../components/six/SingleBarsSix.js";
import SingleBarsFour from "../../components/four/SingleBarsFour.js";

import PieFour from "../../components/four/PieFour.js";
import PieSix from "../../components/six/PieSix.js";

import StackedTwelve from "../../components/twelve/StackedTwelve.js";
import StackedFour from "../../components/four/StackedFour.js";
import StackedSix from "../../components/six/StackedSix.js";

import ScatterTwelve from "../../components/twelve/ScatterTwelve.js";
import ScatterFour from "../../components/four/ScatterFour.js";
import ScatterSix from "../../components/six/ScatterSix.js";

import LineBarsTwelve from "../../components/twelve/LineBarsTwelve.js";
import LineBarsFour from "../../components/four/LineBarsFour.js";
import LineBarsSix from "../../components/six/LineBarsSix.js";

import LinesTwelve from "../../components/twelve/LinesTwelve.js";
import LinesFour from "../../components/four/LinesFour.js";
import LinesSix from "../../components/six/LinesSix.js";

import KpiSemiCirculo from "../../components/kpi/KpiSemiCirculo.js";
import KpiBarra from "../../components/kpi/KpiBarra.js";
import KpiProgreso from "../../components/kpi/KpiProgreso.js";
import KpiLinea from "../../components/kpi/KpiLinea.js";

import Dashboard from "../../layouts/Dashboard.js";
import { Grid } from "semantic-ui-react";

//Data

import linebars_data from "../../data/linebars.json";
import pie_data from "../../data/pie.json";
import lines_data from "../../data/lineas_corto.json";
import lineas_dos from "../../data/lineas_dos.json";
import lineas from "../../data/lineas.json";

import groupbar_data from "../../data/barras.json";
import barras_cuatro from "../../data/barras_cuatro.json";
import stacked_cuatro from "../../data/stacked_cuatro.json";
import scatter_cuatro from "../../data/scatter_cuatro.json";
import linebars_cuatro from "../../data/linebars_cuatro.json";

import linebars_alerta from "../../data/linebars_alerta.json";

import barras_doce from "../../data/barras_doce.json";
import barras_single_doce from "../../data/barras_single_doce.json";

import singlebar_data from "../../data/barras_single.json";
import scatter_data from "../../data/scatter.json";
import stacked_data from "../../data/stacked.json";
import KpiLineas_data from "../../data/kpi_lineas.json";
//import stackedmini_data from "../../data/stackedmini.json";

const Main = () => (
	<Router>
		<Switch>
			<Route
				exact
				path="/"
				render={props => (
					<Dashboard>
						<Grid.Column width={6}>
							<GroupedBarsSix
								columns={6}
								data={groupbar_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.groupbar.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<SingleBarsSix
								columns={6}
								data={singlebar_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.bar.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<PieSix
								columns={6}
								data={pie_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.pie.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<StackedSix
								columns={6}
								width={600}
								height={300}
								data={stacked_data}
								theme={cadem_theme}
								colorscale={cadem_theme.stack.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<ScatterSix
								columns={6}
								data={scatter_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.scatter.colorScale}
								altActiveColor={cadem_theme.scatter.activeColor}
							/>
						</Grid.Column>

						<Grid.Column width={6}>
							<LineBarsSix
								columns={6}
								data={linebars_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.linebar.colorScale}
								activeColor={cadem_theme.interactions.hover}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<LinesSix
								columns={6}
								height={300}
								width={600}
								data={lineas_dos}
								debug={true}
								theme={cadem_theme}
								colorscale={cadem_theme.line.colorScale}
								activeColor={cadem_theme.interactions.hover}
							/>
						</Grid.Column>
					</Dashboard>
				)}
			/>
			<Route
				exact
				path="/4-cols"
				render={props => (
					<Dashboard>
						<Grid.Column width={4}>
							<GroupedBarsFour
								columns={4}
								data={barras_cuatro}
								height={200}
								width={300}
								theme={cadem_theme}
								colorscale={["#B3AEA4", "#3F3F3F"]}
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<SingleBarsFour
								columns={4}
								data={singlebar_data}
								height={270}
								width={300}
								theme={cadem_theme}
								colorscale={cadem_theme.bar.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<PieFour
								columns={4}
								data={pie_data}
								height={300}
								width={300}
								theme={cadem_theme}
								colorscale={cadem_theme.pie.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<StackedFour
								columns={4}
								width={300}
								height={240}
								data={stacked_cuatro}
								theme={cadem_theme}
								colorscale={cadem_theme.stack.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<ScatterFour
								columns={4}
								data={scatter_cuatro}
								height={220}
								width={240}
								theme={cadem_theme}
								colorscale={cadem_theme.scatter.colorScale}
								altActiveColor={cadem_theme.scatter.activeColor}
							/>
						</Grid.Column>

						<Grid.Column width={4}>
							<LineBarsFour
								columns={4}
								data={linebars_cuatro}
								height={160}
								width={300}
								theme={cadem_theme}
								colorscale={cadem_theme.linebar.colorScale}
								activeColor={cadem_theme.interactions.hover}
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<LinesFour
								columns={4}
								height={260}
								width={300}
								data={lines_data}
								theme={cadem_theme}
								colorscale={cadem_theme.line.colorScale}
								activeColor={cadem_theme.interactions.hover}
							/>
						</Grid.Column>
					</Dashboard>
				)}
			/>
			<Route
				exact
				path="/12-cols"
				render={props => (
					<Dashboard>
						<Grid.Column width={12}>
							<GroupedBarsTwelve
								columns={12}
								data={barras_doce}
								height={200}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.groupbar.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={12}>
							<SingleBarsTwelve
								columns={12}
								data={barras_single_doce}
								height={180}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.bar.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={12}>
							<StackedTwelve
								columns={12}
								width={600}
								height={200}
								data={stacked_data}
								theme={cadem_theme}
								colorscale={cadem_theme.stack.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={12}>
							<ScatterTwelve
								columns={12}
								data={scatter_data}
								height={200}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.scatter.colorScale}
								altActiveColor={cadem_theme.scatter.activeColor}
							/>
						</Grid.Column>

						<Grid.Column width={12}>
							<LineBarsTwelve
								columns={12}
								data={linebars_data}
								height={140}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.linebar.colorScale}
								activeColor={cadem_theme.interactions.hover}
							/>
						</Grid.Column>
						<Grid.Column width={12}>
							<LinesTwelve
								columns={12}
								height={200}
								width={600}
								data={lineas}
								theme={cadem_theme}
								colorscale={cadem_theme.line.colorScale}
								activeColor={cadem_theme.interactions.hover}
								debug={true}
							/>
						</Grid.Column>
					</Dashboard>
				)}
			/>
			<Route
				path="/kpis"
				render={props => (
					<Dashboard>
						<Grid.Column width={4}>
							<KpiSemiCirculo
								percent={45}
								title="Efectividad"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="verde"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KpiSemiCirculo
								percent={89}
								title="Desempeño"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="amarillo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KpiSemiCirculo
								percent={12}
								title="Rendimiento"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="rojo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KpiBarra
								percent={66.2}
								title="Rendimiento"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="verde"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KpiBarra
								percent={26.2}
								title="Rendimiento"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="rojo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KpiBarra
								percent={38.2}
								title="Rendimiento"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="amarillo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KpiProgreso
								percent={6.2}
								title="Local A"
								subtitle="Ene - Mar 2018"
								caption="+2.4pts vs. año anterior"
								goal="Meta 16%"
								theme={cadem_theme}
								semaforo="rojo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KpiProgreso
								percent={40.2}
								title="Local A"
								subtitle="Ene - Mar 2018"
								caption="+8.4pts vs. año anterior"
								goal="Meta 76%"
								theme={cadem_theme}
								semaforo="amarillo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KpiProgreso
								percent={66.2}
								title="Local A"
								subtitle="Ene - Mar 2018"
								caption="+8.4pts vs. año anterior"
								goal="Meta 76%"
								theme={cadem_theme}
								semaforo="verde"
							/>
						</Grid.Column>
						<Grid.Column width={12}>
							<KpiLinea
								title="Local A"
								subtitle="Mensual Mar 2018"
								caption="Acumulado 2018"
								goal="76%"
								theme={cadem_theme}
								semaforo="verde"
								data={KpiLineas_data}
								resumen={
									([73.12, 111.32, 71.11],
									[73.43, 100.1, 20.12])
								}
							/>
						</Grid.Column>
					</Dashboard>
				)}
			/>

			<Route
				exact
				path="/semaforo"
				render={props => (
					<Dashboard>
						<Grid.Column width={4}>
							<LineBarsFour
								columns={4}
								data={linebars_cuatro}
								height={160}
								width={300}
								theme={cadem_theme}
								activeColor="#000"
								colorscale={cadem_theme.linebar.colorScale}
								semaforo={true}
								positiveValue="Sí"
								negativeValue="No"
							/>
						</Grid.Column>
						<Grid.Column width={4} />
						<Grid.Column width={4} />

						<Grid.Column width={12}>
							<LineBarsTwelve
								columns={12}
								data={linebars_data}
								height={140}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.linebar.colorScale}
								semaforo={true}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<LineBarsSix
								columns={6}
								data={linebars_data}
								height={140}
								width={600}
								theme={cadem_theme}
								activeColor="#000"
								colorscale={cadem_theme.linebar.colorScale}
								semaforo={true}
								positiveValue="Nivel de Satisfacción"
								negativeValue="Nivel de Insatisfacción"
							/>
						</Grid.Column>
						<Grid.Column width={6} />
					</Dashboard>
				)}
			/>
		</Switch>
	</Router>
);

export default Main;
