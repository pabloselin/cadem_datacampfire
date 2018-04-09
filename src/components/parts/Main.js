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

const Main = () => (
	<Switch>
		<Route
			exact
			path="/"
			render={props => <Inicio {...props} theme={cadem_theme} />}
		/>
		<Route
			render={props => (
				<ChartPage
					chart={
						<Pie
							{...props}
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
						<Lines {...props} height={300} theme={cadem_theme} />
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
