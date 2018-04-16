import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import cadem_theme from "../../themes/cadem_theme.js";
import Inicio from "../../routes/Inicio.js";
import ChartPage from "../../components/ChartPage.js";

import Lines from "../../components/Lines.js";
import Pie from "../../components/Pie.js";
import GroupedBars from "../../components/GroupedBars.js";
import SingleBars from "../../components/SingleBars.js";
import LineBars from "../../components/LineBars.js";
import Scatter from "../../components/Scatter.js";
import ScatterMini from "../../components/ScatterMini.js";
import Stacked from "../../components/Stacked.js";

import KPI_semicirculo from "../../components/kpi/KPI_semicirculo.js";
import KPI_barra from "../../components/kpi/KPI_barra.js";
import KPI_progreso from "../../components/kpi/KPI_progreso.js";
import KPI_linea from "../../components/kpi/KPI_linea.js";

import Dashboard from "../../layouts/Dashboard.js";
import { Grid } from "semantic-ui-react";
//Data
import linebars_data from "../../data/linebars.json";
import pie_data from "../../data/pie.json";
import lines_data from "../../data/lineas_corto.json";
import groupbar_data from "../../data/barras.json";
import singlebar_data from "../../data/barras_single.json";
import scatter_data from "../../data/scatter.json";
import scattermini_data from "../../data/scattermini.json";
import stacked_data from "../../data/stacked.json";
import kpi_lineas_data from "../../data/kpi_lineas.json";
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
							<GroupedBars
								columns={6}
								data={groupbar_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.bar.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<SingleBars
								columns={6}
								data={singlebar_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.bar.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<Pie
								columns={6}
								data={pie_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.pie.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<Stacked
								columns={6}
								width={600}
								height={300}
								data={stacked_data}
								theme={cadem_theme}
								colorscale={cadem_theme.stack.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<Scatter
								columns={6}
								data={scatter_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.scatter.colorScale}
							/>
						</Grid.Column>

						<Grid.Column width={6}>
							<LineBars
								columns={6}
								data={linebars_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.line.colorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<Lines
								columns={6}
								height={300}
								width={600}
								data={lines_data}
								theme={cadem_theme}
								colorscale={cadem_theme.linebar.colorScale}
								activeColor={cadem_theme.interactions.hover}
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
							<KPI_semicirculo
								percent={45}
								title="Efectividad"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="verde"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KPI_semicirculo
								percent={89}
								title="Desempeño"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="amarillo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KPI_semicirculo
								percent={12}
								title="Rendimiento"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="rojo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KPI_barra
								percent={66.2}
								title="Rendimiento"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="verde"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KPI_barra
								percent={26.2}
								title="Rendimiento"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="rojo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KPI_barra
								percent={38.2}
								title="Rendimiento"
								subtitle="Abr 2018"
								theme={cadem_theme}
								semaforo="amarillo"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<KPI_progreso
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
							<KPI_progreso
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
							<KPI_progreso
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
							<KPI_linea
								title="Local A"
								subtitle="Mensual Mar 2018"
								caption="Acumulado 2018"
								goal="76%"
								theme={cadem_theme}
								semaforo="verde"
								data={kpi_lineas_data}
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
				path="/alt-paleta"
				render={props => (
					<Dashboard>
						<Grid.Column width={8}>
							<GroupedBars
								data={groupbar_data}
								height={326}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.bar.altColorScale}
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<SingleBars
								data={singlebar_data}
								height={200}
								width={300}
								theme={cadem_theme}
								colorscale={cadem_theme.bar.altColorScale}
							/>
							<Pie
								data={pie_data}
								height={300}
								width={300}
								theme={cadem_theme}
								colorscale={cadem_theme.bar.altColorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<Stacked
								width={600}
								height={300}
								data={stacked_data}
								theme={cadem_theme}
								colorscale={cadem_theme.stack.altColorScale}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<Scatter
								data={scatter_data}
								width={600}
								height={300}
								theme={cadem_theme}
								colorscale={cadem_theme.scatter.altColorScale}
							/>
						</Grid.Column>
						<Grid.Column width={8}>
							<LineBars
								data={linebars_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={cadem_theme.linebar.altColorScale}
								activeColor={cadem_theme.interactions.hover_alt}
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<Lines
								data={lines_data}
								height={300}
								width={300}
								theme={cadem_theme}
								colorscale={cadem_theme.line.altColorScale}
								activeColor={cadem_theme.interactions.hover_alt}
							/>
						</Grid.Column>
					</Dashboard>
				)}
			/>

			{/*Rutas adicionales para debugging*/}

			<Route
				render={props => (
					<ChartPage
						chart={
							<Pie
								{...props}
								data={pie_data}
								height={400}
								width={600}
								theme={cadem_theme}
							/>
						}
					/>
				)}
				path="/pie"
			/>
			<Route
				render={props => (
					<ChartPage
						chart={
							<Lines
								data={lines_data}
								{...props}
								width={300}
								height={300}
								theme={cadem_theme}
								colorscale={cadem_theme.line.altColorScale}
								activeColor={cadem_theme.interactions.hover_alt}
							/>
						}
					/>
				)}
				path="/lines"
			/>

			<Route
				render={props => (
					<ChartPage
						chart={
							<GroupedBars
								{...props}
								data={groupbar_data}
								height={240}
								theme={cadem_theme}
							/>
						}
					/>
				)}
				path="/grouped-bars"
			/>

			<Route
				render={props => (
					<ChartPage
						size="mini"
						chart={
							<SingleBars
								{...props}
								data={singlebar_data}
								height={300}
								width={300}
								theme={cadem_theme}
							/>
						}
					/>
				)}
				path="/single-bars"
			/>

			<Route
				render={props => (
					<ChartPage
						chart={
							<LineBars
								{...props}
								data={linebars_data}
								height={300}
								width={300}
								theme={cadem_theme}
							/>
						}
					/>
				)}
				path="/line-bars"
			/>

			<Route
				render={props => (
					<ChartPage
						chart={
							<Scatter
								{...props}
								data={scatter_data}
								height={300}
								width={600}
								theme={cadem_theme}
							/>
						}
					/>
				)}
				path="/scatter"
			/>

			<Route
				render={props => (
					<ChartPage
						size="mini"
						chart={
							<ScatterMini
								{...props}
								data={scattermini_data}
								height={300}
								width={300}
								theme={cadem_theme}
							/>
						}
					/>
				)}
				path="/scatter-mini"
			/>

			<Route
				render={props => (
					<ChartPage
						chart={
							<Stacked
								{...props}
								data={stacked_data}
								height={300}
								width={600}
								theme={cadem_theme}
								colorscale={["#595753", "#cccccc"]}
							/>
						}
					/>
				)}
				path="/stacked"
			/>

			{/*<Route
			render={props => (
				<ChartPage
					size="mini"
					chart={
						<StackedMini
							{...props}
							data={stackedmini_data}
							height={300}
							width={300}
							theme={cadem_theme}
						/>
					}
				/>
			)}
			path="/stacked-mini"
		/>*/}
		</Switch>
	</Router>
);

export default Main;
