import React, { Component } from "react";
import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryLine,
	VictoryLegend,
	VictoryLabel,
	VictoryStack,
	VictoryAxis,
	VictoryContainer,
	VictorySharedEvents,
	Point
	//VictoryTooltip
} from "victory";

class LineBars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data,
			activeCat: null,
			activeKey: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false,
			domainPadding: { y: 0, x: 20 },
			svgrefs: [],
			clickedKeys: [],
			barFill: ["#8c8981", "#cccccc"]
		};
	}

	differential(dataA, dataB) {
		let neto = dataA.map((d, idx) => {
			let it = { x: d.x, y: d.y + dataB[idx].y };
			return it;
		});

		return neto;
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
		if (array.length == 0) {
			return false;
		} else {
			return true;
		}
	}

	makeLegend() {
		return [
			{
				name: this.state.data.data[0].data_a,
				symbol: { fill: this.state.barFill[0] }
			},
			{
				name: this.state.data.data[1].data_b,
				symbol: { fill: this.state.barFill[1] }
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
						fill: this.state.activeColor,
						width: 12
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
			fontWeight: a => {
				if (
					this.state.clickedKeys.indexOf(a) !== -1 ||
					this.state.activeKey === a
				) {
					return "bold";
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

		const legendLabelStyle = {
			fontSize: 8,
			fontFamily: "Asap",
			fontWeight: a => {
				if (this.state.activeCat === a.name) {
					return "bold";
				} else {
					return "normal";
				}
			},
			fill: a => {
				if (this.state.activeCat === a.name) {
					return this.state.activeColor;
				} else {
					return "#555";
				}
			}
		};

		const legendDataStyle = {
			fill: a => {
				if (this.state.activeCat === a.name) {
					return this.state.activeColor;
				} else {
					return a.symbol.fill;
				}
			}
		};

		const events = [
			{
				childName: ["bar", "bar-down"],
				target: "data",
				eventHandlers: {
					onMouseOver: (evt, obj, idx) => {
						if (this.state.clicked !== true) {
							this.setState({
								activeKey: Number(idx)
							});

							return activeStyle;
						}
					},
					onClick: (evt, obj, idx) => {
						let refKey = Number(idx);
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
							if (this.state.clickedKeys.indexOf(refKey) !== -1) {
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
			},
			{
				childName: "legend",
				target: "data",
				eventHandlers: {
					onClick: (evt, obj, key) => {
						if (obj.datum !== undefined) {
							let refName = obj.datum.name;
							if (this.state.clicked !== true) {
								this.setState({
									activeCat: refName,
									clicked: true
								});
							} else {
								//Está cliqueada una leyenda
								if (this.state.activeCat === refName) {
									this.setState({
										activeCat: null,
										clicked: false
									});
								} else {
									this.setState({ activeCat: refName });
								}
							}
						}
					},
					onMouseOver: (evt, obj, key) => {
						if (this.state.clicked !== true) {
							if (obj.datum !== undefined) {
								this.setState({
									activeCat: obj.datum.name
								});
							}
						}
					},
					onMouseOut: (evt, obj, key) => {
						if (this.state.clicked !== true) {
							this.setState({ activeCat: null });
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
		];
		return (
			<div className="chart-widget">
				<VictorySharedEvents events={events}>
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
								<VictoryLabel textAnchor="middle" dy={35} />
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
								key="bar"
								name="bar"
								theme={this.props.theme}
								title={this.state.title}
								data={this.state.data.data[0].data}
								style={{
									data: {
										width: 12,
										fill: this.state.barFill[0],
										opacity: 0.8
									},
									labels: {
										fill: (d, active) =>
											active === true
												? this.state.activeColor
												: "transparent"
									}
								}}
								alignment="middle"
								barRatio={0.2}
								labels={d => `${d.y}`}
							/>
							<VictoryBar
								key="bar-down"
								name="bar-down"
								theme={this.props.theme}
								title={this.state.title}
								data={this.state.data.data[1].data}
								style={{
									data: {
										width: 12,
										fill: this.state.barFill[1]
									},
									labels: {
										fill: (d, active) =>
											active === true
												? this.state.activeColor
												: "transparent"
									}
								}}
								alignment="middle"
								barRatio={0.2}
								labels={d => `${d.y}`}
							/>
						</VictoryStack>

						<VictoryLegend
							title={[
								this.state.title.toUpperCase(),
								this.state.subtitle
							]}
							width={this.props.width}
							x={this.props.width - 180}
							titleOrientation="left"
							gutter={-20}
							rowGutter={-5}
							theme={this.props.theme}
							name="legend"
							data={this.makeLegend(this.state.data)}
							orientation="vertical"
							itemsPerRow={2}
							height={60}
							labelComponent={
								<VictoryLabel style={legendLabelStyle} />
							}
							dataComponent={<Point style={legendDataStyle} />}
							titleComponent={
								<VictoryLabel
									dx={-100}
									style={[
										{
											fontSize: 10,
											fontWeight: "bold"
										},
										{
											fontSize: 6,
											fontWeight: "normal"
										}
									]}
								/>
							}
						/>
					</VictoryChart>
				</VictorySharedEvents>
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
