import React, { Component } from "react";
import {
	VictoryPie,
	VictoryLabel,
	VictoryContainer,
	VictoryGroup,
	VictorySharedEvents
} from "victory";

class KpiSemiCirculo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.percent,
			title: this.props.title,
			subtitle: this.props.subtitle,
			currentPercent: this.props.percent,
			activeColor: this.props.theme.interactions.active,
			clicked: false,
			activeKey: undefined,
			colorscale: this.props.theme.interactions.paleta.escala_semaforo,
			svgrefs: [],
			status: null
		};
	}

	getData() {
		return [
			{ x: "", y: 100 - this.props.percent },
			{ x: this.props.title, y: this.props.percent }
		];
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.pieref, this.legendref, this.percent]
		});
	}

	getStatusFill() {
		if (this.state.status === "hovered") {
			return this.state.colorscale[this.props.semaforo][1];
		} else {
			return this.state.colorscale[this.props.semaforo][0];
		}
	}

	render() {
		const percentPortal = () => {
			if (this.state.currentPercent !== 0) {
				return this.state.currentPercent + "%";
			}
		};

		const piecolor = key => {
			if (key === 1) {
				return this.state.colorscale[this.props.semaforo][0];
			} else {
				return "#ccc";
			}

			// if (Number(this.state.activeKey) === key || key === 0) {
			// 	this.state.colorscale[this.props.semaforo][0];
			// } else {
			// 	return this.state.colorscale[key];
			// }
		};

		return (
			<div className="chart-widget">
				<VictoryLabel
					dy={10}
					dx={10}
					text={[
						this.state.title.toUpperCase(),
						` ${this.state.subtitle}`
					]}
					style={[
						{
							fontFamily: "Asap",
							fontSize: 15,
							fontWeight: "bold"
						},
						{
							fontFamily: "Asap",
							fontSize: 13,
							fontWeight: "normal"
						}
					]}
				/>
				<VictoryGroup padding={0} height={100} width={300}>
					<svg viewBox="-100 -20 600 240">
						<VictorySharedEvents
							events={[
								{
									childName: "all",
									target: "data",
									eventHandlers: {
										onMouseOver: (evt, obj, key) => {
											this.setState({
												status: "hovered"
											});

											return [
												{
													target: "data",
													eventKey: 1,
													mutation: props => ({
														style: Object.assign(
															{},
															props.style,
															{
																fill: this.state
																	.colorscale[
																	this.props
																		.semaforo
																][1]
															}
														)
													})
												}
											];
										},
										onMouseOut: () => {
											this.setState({ status: null });
											return [
												{
													target: "data",
													mutation: props => null
												},
												{
													target: "data",
													eventKey: 1,
													mutation: props => ({
														style: Object.assign(
															{},
															props.style,
															{
																fill: this.state
																	.colorscale[
																	this.props
																		.semaforo
																][0]
															}
														)
													})
												},
												{
													target: "labels",
													mutation: props => null
												}
											];
										}
									}
								}
							]}
						>
							<VictoryPie
								padding={12}
								theme={this.props.theme}
								name="pie"
								style={{
									data: {
										cursor: "pointer",
										fill: d => piecolor(d.eventKey)
									}
								}}
								startAngle={90}
								endAngle={-90}
								padAngle={0}
								innerRadius={105}
								data={this.getData(this.state.data)}
								labels={d => ""}
								standalone={false}
								containerComponent={
									<VictoryContainer
										containerRef={pieref =>
											(this.pieref = pieref)
										}
									/>
								}
							/>

							<VictoryLabel
								name="percent"
								padding={0}
								className="percent"
								theme={this.props.theme}
								animate={{ duration: 500 }}
								text={percentPortal()}
								textAnchor="middle"
								verticalAnchor="middle"
								x={200}
								y={170}
								style={{
									fontSize: 56,
									fill: this.getStatusFill(),
									fontFamily: "Asap",
									fontWeight: "bold",
									cursor: "arrow"
								}}
							/>
						</VictorySharedEvents>
					</svg>
				</VictoryGroup>
			</div>
		);
	}
}

export default KpiSemiCirculo;
