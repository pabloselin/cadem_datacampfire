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
//import stackedmini_data from "../../data/stackedmini.json";

const Main = () => (
	<Router>
		<Switch>
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
			<Route
				path="/kpis"
				render={props => (
					<Dashboard>
						<Grid.Column width={3}>
							<KPI_semicirculo
								percent={40}
								title="Efectividad"
								subtitle="Abr 2018"
								theme={cadem_theme}
							/>
						</Grid.Column>
						<Grid.Column width={3}>
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
