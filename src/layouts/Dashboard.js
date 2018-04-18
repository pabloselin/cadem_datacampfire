import React from "react";
import { Grid, Container } from "semantic-ui-react";
import logo from "../assets/logo.png";
import "./Dashboard.css";

import TopMenu from "./TopMenu.js";
import SideMenu from "./SideMenu.js";

const Dashboard = props => (
	<Container textAlign="left" className="container">
		<Grid verticalAlign="middle" centered>
			<Grid columns={14} id="detras">
				<div className="div-logo">
					<img alt="Cadem" id="logo" src={logo} />
				</div>

				<TopMenu id="quieto" />

				<Grid.Column width={2} id="darks">
					<SideMenu />
				</Grid.Column>
				<Grid.Column width={12}>
					<Grid className="pusher" id="charts-section">
						{props.children}
					</Grid>
				</Grid.Column>
			</Grid>
		</Grid>
	</Container>
);

export default Dashboard;
