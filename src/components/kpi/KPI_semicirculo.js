import React, { Component } from "react";
import DownloadButton from "../mini/DownloadButton.js";
import {
	VictoryPie,
	VictoryLegend,
	VictorySharedEvents,
	VictoryLabel,
	VictoryContainer,
	VictoryGroup
} from "victory";

class KPI_Semicirculo extends Component {
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
			svgrefs: []
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

	render() {
		const percentPortal = () => {
			if (this.state.currentPercent !== 0) {
				return this.state.currentPercent + "%";
			}
		};

		const piecolor = key => {
			if (key === 1) {
				return this.state.colorscale[this.props.semaforo][key];
			} else {
				return "#ccc";
			}

			// if (Number(this.state.activeKey) === key || key === 0) {
			// 	this.state.colorscale[this.props.semaforo][0];
			// } else {
			// 	return this.state.colorscale[key];
			// }
		};

		const clicked = key => {
			if (
				this.state.clicked === true &&
				Number(this.state.activeKey) === Number(key)
			) {
				return false;
			} else {
				return true;
			}
		};
		return (
			<div className="Pie chart-widget">
				<VictoryLabel
					dy={10}
					dx={10}
					text={[this.state.title.toUpperCase(), this.state.subtitle]}
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
				<VictoryGroup padding={0} height={100} width={300}>
					<svg viewBox="-100 0 600 240">
						<VictoryPie
							padding={0}
							theme={this.props.theme}
							name="pie"
							style={{
								data: {
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
								fill: this.state.colorscale[
									this.props.semaforo
								][1],
								fontFamily: "Asap",
								fontWeight: "bold"
							}}
						/>
					</svg>
				</VictoryGroup>
			</div>
		);
	}
}

export default KPI_Semicirculo;
