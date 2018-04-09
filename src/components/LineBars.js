import React, { Component } from "react";
import "./LineBars.css";
import ChartHeader from "./mini/ChartHeader.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryLine,
	VictoryLegend,
	VictoryLabel,
	VictoryStack,
	VictoryAxis
	//VictoryTooltip
} from "victory";

class LineBars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			data: this.props.data,
			activeKey: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false,
			domainPadding: { y: 0, x: 20 }
		};
	}

	differential(dataA, dataB) {
		let neto = dataA.map((d, idx) => {
			let it = { x: d.x, y: d.y + dataB[idx].y };
			return it;
		});

		return neto;
	}

	render() {
		return (
			<div>
				<ChartHeader
					title={this.state.title}
					subtitle={this.state.data.chart_subtitle}
					className="ChartHeader"
				/>
				<VictoryLegend
					height={15}
					orientation="horizontal"
					theme={this.props.theme}
					data={[
						{
							name: this.state.data.data[0].data_a,
							symbol: { fill: this.state.activeColor }
						},
						{
							name: this.state.data.data[1].data_b,
							symbol: { fill: "#555" }
						},
						{
							name: this.state.data.line_title,
							symbol: { fill: "#555", type: "minus" }
						}
					]}
				/>
				<VictoryChart domainPadding={this.state.domainPadding}>
					<VictoryAxis
						key="horizontalAxis"
						height={this.props.height}
						width={this.props.width}
						style={{
							tickLabels: { fontSize: 6 }
						}}
						tickLabelComponent={
							<VictoryLabel textAnchor="middle" dy={20} />
						}
						tickValues={this.state.data.data[0].data.map(
							point => point.x
						)}
					/>
					<VictoryAxis
						key="verticalAxis"
						dependentAxis
						height={this.props.height}
						width={this.props.width}
						style={{
							tickLabels: { fontSize: 6 },
							grid: { stroke: "#ccc", strokeWidth: 0.4 }
						}}
						tickLabelComponent={
							<VictoryLabel textAnchor="middle" />
						}
					/>
					<VictoryStack
						theme={this.props.theme}
						height={this.props.height}
						width={this.props.width}
						domain={{ y: [-50, 250] }}
						style={{
							labels: { fontSize: 6, textAlign: "center" }
						}}
					>
						<VictoryBar
							key={"bar"}
							theme={this.props.theme}
							title={this.state.title}
							data={this.state.data.data[0].data}
							style={{
								data: {
									width: 10,
									fill: this.state.activeColor
								},
								labels: {
									fill: this.state.activeColor
								}
							}}
							alignment="middle"
							barRatio={0.2}
							labels={d => `${d.y}`}
						/>
						<VictoryBar
							key={"bar-down"}
							theme={this.props.theme}
							title={this.state.title}
							data={this.state.data.data[1].data}
							style={{
								data: {
									width: 10,
									fill: "#555"
								}
							}}
							alignment="middle"
							barRatio={0.2}
						/>
					</VictoryStack>
					<VictoryLine
						key="neto"
						style={{
							data: {
								stroke: "#555",
								strokeWidth: 1
							}
						}}
						data={this.differential(
							this.state.data.data[0].data,
							this.state.data.data[1].data
						)}
						domain={{ y: [0, 250] }}
						standalone={true}
					/>
				</VictoryChart>
			</div>
		);
	}
}

export default LineBars;
