import React from "react";
import { Grid, Sidebar, Menu } from "semantic-ui-react";
import cadem_theme from "../themes/cadem_theme.js";
import Pie from "../components/Pie.js";
import GroupedBars from "../components/GroupedBars.js";
import logo from "../assets/Data-Campfire-Logo.png";
//Data
import linebars_data from "../data/linebars.json";
import pie_data from "../data/pie.json";
import lines_data from "../data/lineas.json";
import groupbar_data from "../data/barras.json";
import singlebar_data from "../data/barras_single.json";
import scatter_data from "../data/scatter.json";
import scattermini_data from "../data/scattermini.json";

const Dashboard = () => (
	<Grid center aligned columns={14}>
		<Grid.Row className="dashboard-header">
			<Grid.Column width={2}>
				<img src={logo} alt="" />
			</Grid.Column>
		</Grid.Row>
		<Grid.Row>
			<Grid.Column width={2}>
				<Sidebar
					className="vertical inverted"
					style={{ backgroundColor: "#000" }}
					visible={true}
				>
					<img src={logo} alt="" />
					<Menu.Item name="inicio">Inicio</Menu.Item>
				</Sidebar>
			</Grid.Column>
			<Grid.Column width={6}>
				<Pie data={pie_data} theme={cadem_theme} />
			</Grid.Column>
			<Grid.Column width={6}>
				<GroupedBars data={groupbar_data} theme={cadem_theme} />
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default Dashboard;
