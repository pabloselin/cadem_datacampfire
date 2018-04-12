import React, { Component } from "react";

import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryLabel,
	VictoryAxis,
	VictoryContainer
} from "victory";

class SingleBars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data,
			activeKey: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false,
			clickedKeys: [],
			svgrefs: []
		};
	}

	componentDidMount() {
		console.log(this.containerRef);
		this.setState({
			svgrefs: [this.containerRef]
		});
	}

	render() {
		return (
			<div className="chart-widget">
				<VictoryLabel
					text={[this.state.title.toUpperCase(), this.state.subtitle]}
					style={[
						{
							fontFamily: "Asap",
							fontSize: 16,
							fontWeight: "bold",
							display: "block"
						},
						{
							fontFamily: "Asap",
							fontSize: 12,
							fontWeight: "normal"
						}
					]}
				/>
				<VictoryChart
					theme={this.props.theme}
					height={this.props.height}
					width={this.props.width}
					domainPadding={{ y: 0, x: 40 }}
					containerComponent={
						<VictoryContainer
							containerRef={ref => {
								this.containerRef = ref;
							}}
						/>
					}
				>
					<VictoryAxis
						theme={this.props.theme}
						tickLabelComponent={
							<VictoryLabel
								style={{
									fontWeight: a =>
										a === this.state.activeKey
											? "bold"
											: "normal",
									fill: a =>
										a === this.state.activeKey
											? this.state.activeColor
											: "#555"
								}}
							/>
						}
					/>
					<VictoryAxis theme={this.props.theme} dependentAxis />
					<VictoryBar
						name={"singlebar"}
						domain={{ y: [0, 100] }}
						key={"bar"}
						theme={this.props.theme}
						title={this.state.title}
						data={this.state.data.data}
						style={{
							labels: { fontSize: 10, textAlign: "left" },
							data: {
								width: 18,
								fill: d =>
									this.props.theme.bar.colorScale[d.eventKey]
							}
						}}
						alignment="middle"
						barRatio={0.2}
						labelComponent={
							<VictoryLabel
								style={{
									fill: "transparent"
								}}
								text={d => `${d.y}%`}
							/>
						}
						events={[
							{
								childName: "all",
								target: "data",
								eventHandlers: {
									onMouseOver: (evt, obj, idx) => {
										if (this.state.clicked !== true) {
											this.setState({
												activeKey: Number(idx) + 1
											});

											return [
												{
													target: "data",
													mutation: props => ({
														style: Object.assign(
															{},
															props.style,
															{
																fill: this.state
																	.activeColor
															}
														)
													})
												},
												{
													target: "labels",
													mutation: props => ({
														style: Object.assign(
															{},
															props.style,
															{
																display:
																	"block",
																fill: this.state
																	.activeColor
															}
														)
													})
												}
											];
										}
									},
									onClick: (evt, obj, idx) => {
										if (this.state.clicked !== true) {
											this.setState({
												activeKey: Number(idx) + 1,
												clicked: true
											});
											return [
												{
													target: "data",
													mutation: props => ({
														style: Object.assign(
															{},
															props.style,
															{
																fill: this.state
																	.activeColor
															}
														)
													})
												},
												{
													target: "labels",
													mutation: props => ({
														style: Object.assign(
															{},
															props.style,
															{
																display:
																	"block",
																fill: this.state
																	.activeColor
															}
														)
													})
												}
											];
										} else {
											if (
												this.state.activeKey ===
												Number(idx) + 1
											) {
												this.setState({
													activeKey: null,
													clicked: false
												});
												return [
													{
														target: "data",
														mutation: props => null
													},
													{
														target: "labels",
														mutation: props => null
													}
												];
											} else {
												this.setState({
													activeKey: Number(idx) + 1,
													clicked: true
												});
												return [
													{
														target: "data",
														mutation: props => ({
															style: Object.assign(
																{},
																props.style,
																{
																	fill: this
																		.state
																		.activeColor
																}
															)
														})
													},
													{
														target: "labels",
														mutation: props => ({
															style: Object.assign(
																{},
																props.style,
																{
																	display:
																		"block",
																	fill: this
																		.state
																		.activeColor
																}
															)
														})
													}
												];
											}
										}
									},
									onMouseOut: () => {
										if (this.state.clicked !== true) {
											this.setState({ activeKey: null });
											return [
												{
													target: "data",
													mutation: props => null
												},
												{
													target: "labels",
													mutation: props => null
												}
											];
										}
									}
								}
							}
						]}
					/>
				</VictoryChart>
				<DownloadButton
					type="singlebars"
					svgs={this.state.svgrefs}
					title={this.state.title}
					subtitle={this.state.subtitle}
					percent={this.state.currentPercent}
				/>
			</div>
		);
	}
}

export default SingleBars;
