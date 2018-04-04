import React, { Component } from "react";
import "./LineBars.css";
import jsondata from "../data/linebars.json";
import ChartHeader from "./mini/ChartHeader.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryLine,
	VictoryLegend,
	VictoryLabel,
	VictoryStack,
	VictoryAxis
} from "victory";

class LineBars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: jsondata.chart_title,
			data: jsondata,
			activeKey: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false,
			domainPadding: { y: 0, x: 20 }
		};
	}

	differential(dataA, dataB) {
		let neto = [];
		dataA.map((d, idx) => {
			let it = { x: d.x, y: d.y - dataB[idx].y };
			neto.push(it);
		});
		console.log(neto);
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
				<VictoryChart>
					<VictoryStack
						theme={this.props.theme}
						height={this.props.height}
						width={this.props.width}
						domainPadding={this.state.domainPadding}
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
								}
							}}
							alignment="middle"
							barRatio={0.2}
						/>
						<VictoryBar
							key={"bar"}
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
						style={{ data: { stroke: "#555", strokeWidth: 1 } }}
						data={this.differential(
							this.state.data.data[0].data,
							this.state.data.data[1].data
						)}
						domain={{ y: [0, 250], x: [0, 12] }}
					/>
					<VictoryAxis
						key="horizontalAxis"
						height={this.props.height}
						width={this.props.width}
						style={{ tickLabels: { fontSize: 6 } }}
						tickLabelComponent={
							<VictoryLabel textAnchor="middle" dy={20} />
						}
						tickValues={this.state.data.data[0].data.map(
							point => point.x
						)}
						domainPadding={this.state.domainPadding}
					/>
					<VictoryAxis
						key="verticalAxis"
						dependentAxis
						height={this.props.height}
						width={this.props.width}
						style={{ tickLabels: { fontSize: 6 } }}
						tickLabelComponent={
							<VictoryLabel textAnchor="middle" />
						}
					/>
				</VictoryChart>
			</div>
		);
	}
}

export default LineBars;
