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
			colorscale: this.props.theme.pie.colorScale,
			svgrefs: []
		};
	}

	getData() {
		return [
			{ x: this.props.title, y: this.props.percent },
			{ x: "", y: 100 - this.props.percent }
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
			if (Number(this.state.activeKey) === key) {
				return this.state.activeColor;
			} else {
				return this.state.colorscale[key];
			}
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
				<VictoryGroup>
					<VictoryPie
						width={600}
						height={200}
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
						innerRadius={45}
						data={this.getData(this.state.data)}
						labels={d => ""}
						containerComponent={
							<VictoryContainer
								containerRef={pieref => (this.pieref = pieref)}
							/>
						}
					/>

					<VictoryLabel
						className="percent"
						theme={this.props.theme}
						animate={{ duration: 500 }}
						text={percentPortal()}
						textAnchor="middle"
						verticalAnchor="middle"
						x={300}
						y={10}
						style={{
							fontSize: 42,
							fill: this.state.activeColor,
							fontFamily: "Asap",
							fontWeight: "bold"
						}}
					/>
				</VictoryGroup>

				<DownloadButton
					type="pie"
					svgs={this.state.svgrefs}
					title={this.state.title}
					subtitle={this.state.subtitle}
				/>
			</div>
		);
	}
}

export default KPI_Semicirculo;
