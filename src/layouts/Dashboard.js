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
	<Container textAlign="left" className="container">
		<Grid verticalAlign="middle" centered>
			<Grid columns={14} id="detras">
				<div className="div-logo">
					<img
						id="logo"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/2000px-Walmart_logo.svg.png"
					/>
				</div>

				<Menu tabular column id="quieto">
					<Menu.Item className="active item">Vista Global</Menu.Item>
					<Menu.Item className="item">Lider</Menu.Item>
					<Menu.Item className="item">Express</Menu.Item>
					<Menu.Item className="item">Ekono</Menu.Item>
					<Menu.Item className="item">Central Ma..</Menu.Item>
					<Menu.Item className="item">SBA</Menu.Item>
					<Menu.Item className="item">Líder SSFF</Menu.Item>
					<Menu.Item className="item">Express SSFF</Menu.Item>
					<Menu.Item className="item">SBA SSFF</Menu.Item>
					<Menu.Item className="item">Lider.cl</Menu.Item>
					<Menu.Item className="item">SSFF</Menu.Item>
					<Menu.Item className="item">Lider.cl Hist.</Menu.Item>
				</Menu>

				<Grid.Column width={2} id="darks">
					<Menu visible inverted left vertical>
						<Menu.Item className="item">
							Vista global resumen
						</Menu.Item>
						<Menu.Item className="item">
							Vista general formato
						</Menu.Item>
						<Menu.Item className="item">
							Vista general mercado
						</Menu.Item>
						<Menu.Item className="item">
							Vista general local
						</Menu.Item>
						<Menu.Item className="item">Ranking locales</Menu.Item>
						<Menu.Item className="item">
							Respuestas locales
						</Menu.Item>
						<Menu.Item className="item">Verbatims</Menu.Item>
					</Menu>
				</Grid.Column>
				<Grid.Column width={12}>
					<Grid className="pusher" columns={12}>
						<Grid.Column width={1}>
							<div className="grafico-dos-col" />
						</Grid.Column>
						<Grid.Column width={2}>
							<div className="grafico-dos-col" />
						</Grid.Column>
						<Grid.Column width={3}>
							<div className="grafico-dos-col" />
						</Grid.Column>
						<Grid.Column width={6}>
							<div className="grafico-dos-col" />
						</Grid.Column>
						<Grid.Column width={12}>
							<div className="grafico-dos-col" />
						</Grid.Column>
					</Grid>
				</Grid.Column>
			</Grid>
		</Grid>
	</Container>
);

export default Dashboard;
