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
	VictorySharedEvents,
	Point
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
			activeBar: null,
			activeIndex: null,
			clicked: false,
			clickedBar: null,
			isLegendClicked: false,
			domainPadding: { y: 0, x: 40 },
			svgrefs: [],
			clickedKeys: [],
			barNames: [
				this.props.data.data[0].title,
				this.props.data.data[1].title,
				"Neto"
			],
			barWidth: 24,
			axisLabelSize: 11,
			activeBarFontSize: 12
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
		if (array.length === 0) {
			return false;
		} else {
			return true;
		}
	}

	getCurFill(cat, curfill, active) {
		if (this.state.activeCat === cat || active === true) {
			return this.props.activeColor;
		} else {
			return curfill;
		}
	}

	makeLegend() {
		return [
			{
				name: this.state.data.data[0].title,
				symbol: { fill: this.props.colorscale[0] }
			},
			{
				name: this.state.data.data[1].title,
				symbol: { fill: this.props.colorscale[1] }
			},
			{
				name: this.state.data.line_title,
				symbol: { fill: "#555", type: "minus" }
			}
		];
	}

	getLabelState(cat, index, active) {
		if (this.state.activeCat === cat) {
			return this.state.activeColor;
		} else {
			return "transparent";
		}
	}

	componentDidMount() {
		this.setState({ svgrefs: [this.containerRef] });
	}

	componentDidUpdate(prevProps, prevState) {}

	render() {
		const activeStyle = [
			{
				target: "data",
				mutation: props => ({
					style: Object.assign({}, props.style, {
						fill: this.props.activeColor,
						width: this.state.barWidth
					})
				})
			},
			{
				target: "labels",
				mutation: props => ({
					style: Object.assign({}, props.style, {
						display: "block",
						fill: this.props.activeColor,
						fontSize: this.state.activeBarFontSize,
						fontWeight: "bold"
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

		const legendLabelStyle = {
			fontSize: 14,
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
					return this.props.activeColor;
				} else {
					return "#555";
				}
			}
		};

		const legendDataStyle = {
			fill: a => {
				if (this.state.activeCat === a.name) {
					return this.props.activeColor;
				} else {
					return a.symbol.fill;
				}
			}
		};

		const activeLegend = refName => {
			let mutation = refName =>
				refName === "Neto"
					? { stroke: this.props.activeColor }
					: {
							fill: this.props.activeColor,
							width: this.state.barWidth
					  };
			return [
				{
					target: "data",
					childName: refName,
					eventKey: "all",
					mutation: props => ({
						style: Object.assign({}, props.style, mutation(refName))
					})
				},
				{
					target: "labels",
					childName: refName,
					eventKey: "all",
					mutation: props => ({
						style: Object.assign({}, props.style, {
							fill: this.props.activeColor
						})
					})
				}
			];
		};

		const events = [
			{
				childName: [this.state.barNames[0], this.state.barNames[1]],
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
						let clicked = `${obj.datum.x}-${idx}`;
						if (this.state.clickedBar !== true) {
							this.setState({
								clickedBar: true,
								activeClickedBar: clicked
							});
							return activeStyle;
						} else {
							if (this.state.activeClickedBar === clicked) {
								this.setState({
									clickedBar: false,
									activeClickedBar: null
								});
								return normalStyle;
							} else {
								this.setState({
									clickedBar: true,
									activeClickedBar: clicked
								});
								return [
									{
										target: "data",
										eventKey: "all",
										childName: "all",
										mutation: props => null
									},
									{
										target: "labels",
										eventKey: "all",
										childName: "all",
										mutation: props => null
									},
									{
										target: "data",
										mutation: props => ({
											style: Object.assign(
												{},
												props.style,
												{
													fill: this.state
														.activeColor,
													width: this.state.barWidth
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
													display: "block",
													fill: this.state
														.activeColor,
													fontSize: this.state
														.activeBarFontSize,
													fontWeight: "bold"
												}
											)
										})
									}
								];
							}
						}
					},
					onMouseOut: (evt, obj, idx) => {
						if (obj.datum.x !== undefined) {
							let clickedthing = `${obj.datum.x}-${idx}`;
							if (this.state.activeClickedBar !== clickedthing) {
								this.setState({
									activeKey: null,
									activeBar: null
								});
								return normalStyle;
							}
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

							if (this.state.isLegendClicked !== true) {
								this.setState({
									activeCat: refName,
									isLegendClicked: true
								});
								return activeLegend(refName);
							} else {
								//Está cliqueada una leyenda
								if (this.state.activeCat === refName) {
									this.setState({
										activeCat: null,
										isLegendClicked: false
									});
									return [
										{
											target: "data",
											childName: refName,
											eventKey: "all",
											mutation: props => null
										},
										{
											target: "labels",
											childName: refName,
											eventKey: "all",
											mutation: props => null
										}
									];
								} else {
									this.setState({ activeCat: refName });
									return [
										{
											target: "data",
											childName: this.state.barNames,
											eventKey: "all",
											mutation: props => null
										},
										{
											target: "labels",
											childName: this.state.barNames,
											eventKey: "all",
											mutation: props => null
										},
										...activeLegend(refName)
									];
								}
							}
						}
					},
					onMouseOver: (evt, obj, key) => {
						if (this.state.isLegendClicked !== true) {
							if (obj.datum !== undefined) {
								this.setState({
									activeCat: obj.datum.name
								});
							}
							return activeLegend(obj.datum.name);
						}
					},
					onMouseOut: (evt, obj, key) => {
						if (this.state.isLegendClicked !== true) {
							this.setState({ activeCat: null });
							return [
								{
									target: "data",
									mutation: props => null
								},
								{
									target: "labels",
									mutation: props => null
								},
								{
									target: "data",
									childName: this.state.barNames,
									eventKey: "all",
									mutation: props => null
								},
								{
									target: "labels",
									childName: this.state.barNames,
									eventKey: "all",
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
					<VictoryLegend
						title={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						width={this.props.width}
						x={120}
						titleOrientation="left"
						gutter={20}
						rowGutter={5}
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="vertical"
						itemsPerRow={2}
						responsive={false}
						height={60}
						labelComponent={
							<VictoryLabel style={legendLabelStyle} />
						}
						dataComponent={
							<Point size={6} style={legendDataStyle} />
						}
						titleComponent={
							<VictoryLabel
								dx={-120}
								style={[
									{
										fontSize: 18,
										fontWeight: "bold"
									},
									{
										fontSize: 15,
										fontWeight: "normal"
									}
								]}
							/>
						}
					/>
					<VictoryChart
						width={this.props.width}
						height={320}
						theme={this.props.theme}
						domainPadding={this.state.domainPadding}
						padding={{ top: 20, right: 30, bottom: 40, left: 30 }}
					>
						<VictoryAxis
							key="horizontalAxis"
							height={this.props.height}
							width={this.props.width}
							style={{
								tickLabels: {
									fontSize: this.state.axisLabelSize
								}
							}}
							tickLabelComponent={
								<VictoryLabel
									textAnchor="start"
									dy={30}
									dx={-65}
									angle={-45}
								/>
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
								tickLabels: {
									fontSize: this.state.axisLabelSize
								},
								grid: { stroke: "#ccc", strokeWidth: 0.4 }
							}}
							tickLabelComponent={
								<VictoryLabel dx={-6} textAnchor="middle" />
							}
						/>
						<VictoryLine
							name="Neto"
							key="neto"
							style={{
								data: {
									stroke: this.props.theme.linebar.lineColor,
									strokeWidth: 2
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
						>
							<VictoryBar
								key="bar"
								name={this.state.barNames[0]}
								theme={this.props.theme}
								title={this.state.title}
								data={this.state.data.data[0].data}
								style={{
									data: {
										width: this.state.barWidth,
										fill: (d, active) =>
											this.getCurFill(
												this.state.barNames[0],
												this.props.colorscale[0],
												active
											)
									},
									labels: {
										fill: (d, active) =>
											active === true
												? this.props.activeColor
												: "transparent"
									}
								}}
								labelComponent={
									<VictoryLabel
										style={{
											text: {
												fontSize: this.state
													.activeBarFontSize
											},
											fill: (d, active) =>
												this.getLabelState(
													this.state.barNames[0],
													this.props.colorscale[0],
													active
												),
											fontWeight: "bold",
											fontSize: this.state
												.activeBarFontSize
										}}
										text={d => `${d.y}`}
									/>
								}
								alignment="middle"
								barRatio={0.2}
								labels={d => `${d.y}`}
							/>
							<VictoryBar
								key="bar-down"
								name={this.state.data.data[1].title}
								theme={this.props.theme}
								title={this.state.title}
								data={this.state.data.data[1].data}
								style={{
									data: {
										width: this.state.barWidth,
										fill: this.props.colorscale[1]
									},
									labels: {
										fill: (d, active) =>
											active === true
												? this.props.activeColor
												: "transparent"
									}
								}}
								alignment="middle"
								barRatio={0.2}
								labels={d => `${d.y}`}
							/>
						</VictoryStack>
					</VictoryChart>
				</VictorySharedEvents>
				<DownloadButton
					type="linebars"
					data={this.props.data}
					fields={[
						{ label: "Mes", value: "data.x" },
						{ label: "Tipo", value: "title" },
						{ label: "Cantidad", value: "data.y" }
					]}
					unwind={["data"]}
				/>
			</div>
		);
	}
}

export default LineBars;
