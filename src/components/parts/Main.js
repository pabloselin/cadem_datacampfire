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
import Dashboard from "../../layouts/Dashboard.js";
//Data
import linebars_data from "../../data/linebars.json";
import pie_data from "../../data/pie.json";
import lines_data from "../../data/lineas.json";
import groupbar_data from "../../data/barras.json";
import singlebar_data from "../../data/barras_single.json";
import scatter_data from "../../data/scatter.json";
import scattermini_data from "../../data/scattermini.json";

const Main = () => (
	<Switch>
		<Route
			exact
			path="/"
			render={props => <Inicio {...props} theme={cadem_theme} />}
		/>
		<Route path="/dashboard" component={Dashboard} />
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
							width={600}
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
	</Switch>
);

export default Main;
