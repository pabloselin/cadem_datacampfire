import React from "react";
import { Grid, Sidebar, Menu, Container } from "semantic-ui-react";

import cadem_theme from "../themes/cadem_theme.js";
import "./Dashboard.css";

import logo from "../assets/Data-Campfire-Logo.png";
import { Link } from "react-router-dom";

//Charts
import Pie from "../components/Pie.js";
import GroupedBars from "../components/GroupedBars.js";
import SingleBars from "../components/SingleBars.js";
import Lines from "../components/Lines.js";
import Stacked from "../components/Stacked.js";
import LineBars from "../components/LineBars.js";
import Scatter from "../components/Scatter.js";
//Kpis
import KPI_semicirculo from "../components/kpi/KPI_semicirculo.js";
//Data
import stacked_data from "../data/stacked.json";
import linebars_data from "../data/linebars.json";
import pie_data from "../data/pie.json";
import lines_data from "../data/lineas_corto.json";
import groupbar_data from "../data/barras.json";
import singlebar_data from "../data/barras_single.json";
import scatter_data from "../data/scatter.json";
import scattermini_data from "../data/scattermini.json";

const Dashboard = () => (
	<Container fluid>
		<Grid className="dashboard" columns={14}>
			<Grid.Row className="dashboard-header">
				<Grid.Column width={2} />
				<Grid.Column width={12} />
			</Grid.Row>
			<Grid.Row>
				<Grid.Column width={4}>
					<KPI_semicirculo
						percent={26}
						title="Efectividad"
						subtitle="Período Feb 18"
						theme={cadem_theme}
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					<Stacked
						width={600}
						height={300}
						data={stacked_data}
						theme={cadem_theme}
					/>
				</Grid.Column>
				<Grid.Column width={4}>
					<Pie
						data={pie_data}
						width={400}
						height={320}
						theme={cadem_theme}
					/>
					<Lines
						height={300}
						width={300}
						data={lines_data}
						theme={cadem_theme}
					/>
				</Grid.Column>
				<Grid.Column width={12}>
					<GroupedBars
						data={groupbar_data}
						theme={cadem_theme}
						width={600}
						height={200}
					/>
				</Grid.Column>
				<Grid.Column width={8}>
					<LineBars
						width={300}
						height={300}
						data={linebars_data}
						theme={cadem_theme}
					/>
				</Grid.Column>
				<Grid.Column width={4}>
					<SingleBars data={singlebar_data} theme={cadem_theme} />
					<Scatter
						width={300}
						height={300}
						data={scatter_data}
						theme={cadem_theme}
					/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Container>
);

export default Dashboard;
