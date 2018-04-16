import React from "react";
import {
	VictoryLine,
	VictoryLabel,
	VictoryVoronoiContainer,
	VictoryTooltip
} from "victory";
import LineFlyOut from "../mini/LineFlyOut.js";
import { Grid, Table } from "semantic-ui-react";
import flecha_verde from "../../assets/flecha_verde.svg";
import flecha_rojo from "../../assets/flecha_rojo.svg";
import flecha_amarillo from "../../assets/flecha_amarillo.svg";
import "./KPI_linea.css";

class KPI_linea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colorscale: this.props.theme.interactions.paleta.escala_semaforo
		};
	}

	cualFlecha() {
		if (this.props.semaforo === "rojo") {
			return flecha_rojo;
		} else if (this.props.semaforo === "verde") {
			return flecha_verde;
		} else if (this.props.semaforo === "amarillo") {
			return flecha_amarillo;
		}
	}

	render() {
		return (
			<div className="chart-widget">
				<VictoryLabel
					text={[
						this.props.title.toUpperCase(),
						` ${this.props.subtitle}`
					]}
					style={[
						{
							fontFamily: "Asap",
							fontSize: 15,
							fontWeight: "bold",
							display: "block"
						},
						{
							fontFamily: "Asap",
							fontSize: 13,
							fontWeight: "normal",
							display: "block"
						}
					]}
				/>
				<Grid columns={3}>
					<Grid.Column>
						<VictoryLine
							height={200}
							width={600}
							style={{
								data: {
									stroke: this.state.colorscale[
										this.props.semaforo
									][1],
									strokeWidth: 4
								}
							}}
							containerComponent={
								<VictoryVoronoiContainer
									labels={d => `${d.y}%`}
									activateData={true}
									labelComponent={
										<VictoryTooltip
											theme={this.props.theme}
											activateData={true}
											labelComponent={
												<VictoryLabel
													dy={-10}
													style={{
														fill: this.state
															.colorscale[
															this.props.semaforo
														][1],
														fontWeight: "bold",
														fontSize: 24
													}}
												/>
											}
											flyoutComponent={
												<LineFlyOut
													graphHeight={200}
													color={
														this.state.colorscale[
															this.props.semaforo
														][1]
													}
												/>
											}
											orientation="top"
										/>
									}
								/>
							}
							data={this.props.data.data}
						/>
					</Grid.Column>
					<Grid.Column>
						<Table
							verticalAlign="middle"
							singleline
							className={`${this.props.semaforo} kpi_table`}
						>
							<Table.Header
								style={{
									backgroundColor: this.state.colorscale[
										this.props.semaforo
									][1]
								}}
							>
								<Table.Row>
									<Table.HeaderCell>Neto</Table.HeaderCell>
									<Table.HeaderCell>Cump.</Table.HeaderCell>
									<Table.HeaderCell>Comp.</Table.HeaderCell>
									<Table.HeaderCell className="nobg" />
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell>10</Table.Cell>
									<Table.Cell
										style={{
											color: this.state.colorscale[
												this.props.semaforo
											][1]
										}}
										className="destacada"
									>
										20
									</Table.Cell>
									<Table.Cell>30</Table.Cell>
									<Table.Cell textAlign="center">
										<img src={this.cualFlecha()} />
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</Grid.Column>
					<Grid.Column>
						<Table
							singleline
							className={`${
								this.props.semaforo
							} kpi_table with_caption`}
						>
							<Table.Header className="kpi_caption_table">
								<Table.Row>
									<Table.HeaderCell>
										{this.props.caption}
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Header
								style={{
									backgroundColor: this.state.colorscale[
										this.props.semaforo
									][1]
								}}
							>
								<Table.Row>
									<Table.HeaderCell>Neto</Table.HeaderCell>
									<Table.HeaderCell>Cump.</Table.HeaderCell>
									<Table.HeaderCell>Meta</Table.HeaderCell>
									<Table.HeaderCell>Comp.</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell>10</Table.Cell>
									<Table.Cell
										style={{
											color: this.state.colorscale[
												this.props.semaforo
											][1]
										}}
										className="destacada"
									>
										20
									</Table.Cell>
									<Table.Cell>{this.props.goal}</Table.Cell>
									<Table.Cell>30</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default KPI_linea;
