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
			activeColor: this.props.activeColor,
			clicked: false,
			clickedBar: null,
			isLegendClicked: false,
			domainPadding: { y: 0, x: 20 },
			svgrefs: [],
			clickedKeys: [],
			barNames: [
				this.props.data.data[0].title,
				this.props.data.data[1].title,
				"Neto"
			]
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

	getCurFill(cat, curfill, active) {
		if (this.state.activeCat === cat || active === true) {
			return this.state.activeColor;
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
			fontSize: 10,
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

		const activeLegend = refName => {
			let mutation = refName =>
				refName === "Neto"
					? { stroke: this.state.activeColor }
					: {
							fill: this.state.activeColor,
							width: 12
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
							fill: this.state.activeColor
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
						let activeCat = obj.data[0].cat;
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
													width: 12
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
													fontSize: 8,
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
								let refName = obj.datum.name;
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
					<VictoryChart
						width={this.props.width}
						height={this.props.height}
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
								tickLabels: { fontSize: 8 }
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
								tickLabels: { fontSize: 8 },
								grid: { stroke: "#ccc", strokeWidth: 0.4 }
							}}
							tickLabelComponent={
								<VictoryLabel textAnchor="middle" />
							}
						/>
						<VictoryLine
							name="Neto"
							key="neto"
							style={{
								data: {
									stroke: this.props.colorscale[2],
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
								labels: {
									fontSize: 8,
									textAlign: "center",
									fontWeight: "bold"
								}
							}}
						>
							<VictoryBar
								key="bar"
								name={this.state.barNames[0]}
								theme={this.props.theme}
								title={this.state.title}
								data={this.state.data.data[0].data}
								style={{
									data: {
										width: 12,
										fill: (d, active) =>
											this.getCurFill(
												this.state.barNames[0],
												this.props.colorscale[0],
												active
											),
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
								name={this.state.data.data[1].title}
								theme={this.props.theme}
								title={this.state.title}
								data={this.state.data.data[1].data}
								style={{
									data: {
										width: 12,
										fill: this.props.colorscale[1]
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
							x={120}
							titleOrientation="left"
							gutter={-20}
							rowGutter={-5}
							theme={this.props.theme}
							name="legend"
							data={this.makeLegend(this.state.data)}
							orientation="horizontal"
							itemsPerRow={3}
							height={60}
							labelComponent={
								<VictoryLabel style={legendLabelStyle} />
							}
							dataComponent={
								<Point size={6} style={legendDataStyle} />
							}
							titleComponent={
								<VictoryLabel
									dx={-100}
									style={[
										{
											fontSize: 14,
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
