import React, { Component } from "react";

import DownloadButton from "../mini/DownloadButton.js";
import Title from "../mini/Title.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryLabel,
	VictoryAxis,
	VictoryContainer
} from "victory";

class SingleBarsTwelve extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data,
			activeKey: null,
			activeMonth: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false,
			clickedKeys: [],
			svgrefs: [],
			domainPadding: { y: 0, x: 40 },
			barWidth: 8,
			axisLabelSize: 6
		};
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.containerRef]
		});
	}

	removeKey(array, element) {
		return array.filter(e => e !== element);
	}

	updateClickeds(array, element) {
		//Debe ser un listado de valores únicos
		array.push(element);
		return array.filter((v, i, a) => a.indexOf(v) === i);
	}

	checkLength(array) {
		if (array.length === 0) {
			return false;
		} else {
			return true;
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.clickedKeys !== prevState.clickedKeys) {
			this.setState({
				clicked: this.checkLength(this.state.clickedKeys)
			});
		}
	}

	render() {
		const activeStyle = [
			{
				target: "data",
				mutation: props => ({
					style: Object.assign({}, props.style, {
						fill: this.state.activeColor
					})
				})
			},
			{
				target: "labels",
				mutation: props => ({
					style: Object.assign({}, props.style, {
						display: "block",
						fill: this.state.activeColor
					})
				})
			}
		];
		const normalStyle = [
			{
				target: "data",
				mutation: props => null
			},
			{
				target: "labels",
				mutation: props => null
			}
		];

		const labelStyle = {
			fontFamily: "Asap",
			fontSize: this.state.axisLabelSize,
			fontWeight: a => {
				if (
					this.state.clickedKeys.indexOf(a) !== -1 ||
					this.state.activeKey === a
				) {
					return "700";
				} else {
					return "normal";
				}
			},
			fill: a => {
				if (
					this.state.clickedKeys.indexOf(a) !== -1 ||
					this.state.activeKey === a
				) {
					return this.state.activeColor;
				} else {
					return "#555";
				}
			}
		};
		return (
			<div className="chart-widget">
				<svg height={40}>
					<Title
						title={this.state.title}
						subtitle={this.state.subtitle}
						fontSizeTop={15}
						fontSizeBottom={13}
						dy1={15}
						dy2={20}
					/>
				</svg>
				<VictoryChart
					width={this.props.width}
					height={this.props.height}
					theme={this.props.theme}
					domainPadding={this.state.domainPadding}
					padding={{ top: 20, left: 20, right: 20, bottom: 40 }}
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
								style={labelStyle}
								angle={-45}
								dy={1}
								dx={-10}
							/>
						}
					/>
					<VictoryAxis
						theme={this.props.theme}
						dependentAxis
						style={{
							tickLabels: { fontSize: this.state.axisLabelSize }
						}}
					/>
					<VictoryBar
						name={"singlebar"}
						domain={{ y: [0, 100] }}
						key={"bar"}
						theme={this.props.theme}
						title={this.state.title}
						data={this.state.data.data}
						style={{
							labels: {
								fontSize: 6,
								textAlign: "left",
								fontWeight: "700"
							},
							data: {
								width: this.state.barWidth,
								fill: this.props.colorscale[3]
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
												activeKey: Number(idx) + 1,
												activeMonth: Number(idx) + 1
											});

											return activeStyle;
										}
									},
									onClick: (evt, obj, idx) => {
										let refKey = Number(idx) + 1;
										if (this.state.clicked !== true) {
											this.setState({
												clicked: true,
												clickedKeys: this.updateClickeds(
													this.state.clickedKeys,
													refKey
												)
											});
											return activeStyle;
										} else {
											//Desactivo una barra ya activada
											if (
												this.state.clickedKeys.indexOf(
													refKey
												) !== -1
											) {
												this.setState({
													clickedKeys: this.removeKey(
														this.state.clickedKeys,
														refKey
													)
												});
												return normalStyle;
											} else {
												this.setState({
													clickedKeys: this.updateClickeds(
														this.state.clickedKeys,
														refKey
													)
												});
												return activeStyle;
											}
										}
									},
									onMouseOut: () => {
										if (this.state.clicked !== true) {
											this.setState({ activeKey: null });
											return normalStyle;
										}
									}
								}
							}
						]}
					/>
				</VictoryChart>
				<DownloadButton
					type="singlebars"
					data={this.props.data}
					fields={[
						{ label: "Mes", value: "x" },
						{ label: "Porcentaje", value: "y" }
					]}
					unwind={["data"]}
				/>
			</div>
		);
	}
}

export default SingleBarsTwelve;
