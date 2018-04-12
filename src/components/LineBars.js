import React, { Component } from "react";
import "./LineBars.css";
import ChartHeader from "./mini/ChartHeader.js";
import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryLine,
	VictoryLegend,
	VictoryLabel,
	VictoryStack,
	VictoryAxis,
	VictoryContainer
	//VictoryTooltip
} from "victory";

class LineBars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data,
			activeKey: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false,
			domainPadding: { y: 0, x: 20 },
			svgrefs: []
		};
	}

	differential(dataA, dataB) {
		let neto = dataA.map((d, idx) => {
			let it = { x: d.x, y: d.y + dataB[idx].y };
			return it;
		});

		return neto;
	}

	makeLegend() {
		return [
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
		];
	}

	componentDidMount() {
		this.setState({ svgrefs: [this.containerRef] });
	}

	render() {
		return (
			<div className="chart-widget">
				<VictoryChart
					theme={this.props.theme}
					domainPadding={this.state.domainPadding}
					containerComponent={
						<VictoryContainer
							containerRef={containerRef =>
								(this.containerRef = containerRef)
							}
						/>
					}
				>
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
					<VictoryLegend
						title={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						width={this.props.width}
						x={this.props.width - 140}
						titleOrientation="left"
						gutter={0}
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="vertical"
						itemsPerRow={2}
						height={60}
						style={{
							labels: { fontSize: 8 }
						}}
						titleComponent={
							<VictoryLabel
								dx={-160}
								style={[
									{
										fontSize: 16,
										fontWeight: "bold"
									},
									{
										fontSize: 12,
										fontWeight: "normal"
									}
								]}
							/>
						}
					/>
				</VictoryChart>
				<DownloadButton
					type="linebars"
					svgs={this.state.svgrefs}
					title={this.state.title}
					subtitle={this.state.subtitle}
					percent={this.state.currentPercent}
				/>
			</div>
		);
	}
}

export default LineBars;
