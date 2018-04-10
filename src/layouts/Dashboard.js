import React from "react";
import { Grid, Sidebar, Menu, Container } from "semantic-ui-react";
import cadem_theme from "../themes/cadem_theme.js";
import "./Dashboard.css";
import Pie from "../components/Pie.js";
import GroupedBars from "../components/GroupedBars.js";
import SingleBars from "../components/SingleBars.js";
import logo from "../assets/Data-Campfire-Logo.png";
import { Link } from "react-router-dom";
//Data
import linebars_data from "../data/linebars.json";
import pie_data from "../data/pie.json";
import lines_data from "../data/lineas.json";
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
				<Grid.Column width={2}>
					<Menu text vertical>
						<Menu.Item>Inicio</Menu.Item>
					</Menu>
				</Grid.Column>
				<Grid.Column width={4}>
					<Pie
						data={pie_data}
						width={400}
						height={320}
						theme={cadem_theme}
					/>
				</Grid.Column>
				<Grid.Column width={4}>
					<GroupedBars data={groupbar_data} theme={cadem_theme} />
				</Grid.Column>
				<Grid.Column width={4}>
					<SingleBars data={singlebar_data} theme={cadem_theme} />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</Container>
);

export default Dashboard;
