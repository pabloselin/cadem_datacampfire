import React, { Component } from "react";
import DownloadButton from "../mini/DownloadButton.js";
import LineFlyOut from "../mini/LineFlyOut.js";
import Title from "../mini/Title.js";
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

class LineBarsFour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data,
			activeCat: undefined,
			activeKey: null,
			activeBar: null,
			activeIndex: null,
			clicked: false,
			clickedBar: null,
			isLegendClicked: false,
			activeLegend: undefined,
			domainPadding: { y: 0, x: 40 },
			svgrefs: [],
			clickedKeys: [],
			barNames: [
				this.props.data.data[0].title,
				this.props.data.data[1].title,
				"Neto"
			],
			barWidth: 19,
			axisLabelSize: 10,
			activeBarFontSize: 10,
			semaforo: this.props.theme.semaforo
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
				symbol: { fill: this.props.colorscale[0] },
				value: 1
			},
			{
				name: this.state.data.data[1].title,
				symbol: { fill: this.props.colorscale[1] },
				value: -1
			},
			{
				name: this.state.data.line_title,
				symbol: { fill: "#555", type: "rect" }
			}
		];
	}

	getLabelState(cat, index, active) {
		if (this.state.activeCat === cat) {
			return this.props.activeColor;
		} else {
			return "transparent";
		}
	}

	componentDidMount() {
		this.setState({ svgrefs: [this.containerRef] });
	}

	componentDidUpdate(prevProps, prevState) {}

	render() {
		const semaforoActiveStyle = yval => {
			let fill;
			if (yval > 0) {
				fill = this.state.semaforo.verde[1];
			} else {
				fill = this.state.semaforo.rojo[1];
			}
			return [
				{
					target: "data",
					mutation: props => ({
						style: Object.assign({}, props.style, {
							fill: fill,
							width: this.state.barWidth
						})
					})
				},
				{
					target: "labels",
					mutation: props => ({
						style: Object.assign({}, props.style, {
							display: "block",
							fill: fill,
							fontSize: this.state.activeBarFontSize,
							fontWeight: 700
						})
					})
				}
			];
		};
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
						fontWeight: 700
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

		let legendLabelStyle, legendDataStyle;

		if (this.props.semaforo === true) {
			legendLabelStyle = {
				fontSize: 11,
				fontFamily: "Asap",
				fontWeight: a => {
					if (this.state.activeCat === a.name) {
						return 700;
					} else {
						return "normal";
					}
				},
				fill: a => {
					if (this.state.activeCat === a.name) {
						if (a.name === this.props.positiveValue) {
							return this.state.semaforo.verde[1];
						} else if (a.name === this.props.negativeValue) {
							return this.state.semaforo.rojo[1];
						}
					} else {
						return "#555";
					}
				}
			};
			legendDataStyle = {
				fill: a => {
					if (this.state.activeCat === a.name) {
						if (a.name === this.props.positiveValue) {
							return this.state.semaforo.verde[1];
						} else if (a.name === this.props.negativeValue) {
							return this.state.semaforo.rojo[1];
						}
					} else {
						return a.symbol.fill;
					}
				}
			};
		} else {
			legendDataStyle = {
				fill: a => {
					if (this.state.activeCat === a.name) {
						return this.props.activeColor;
					} else {
						return a.symbol.fill;
					}
				}
			};
			legendLabelStyle = {
				fontSize: 11,
				fontFamily: "Asap",
				fontWeight: a => {
					if (this.state.activeCat === a.name) {
						return 700;
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
		}

		const axisLabelStyle = {
			fontFamily: "Asap",
			fontSize: this.state.axisLabelSize,
			fontWeight: a => {
				if (Number(this.state.activeCat) === a - 1) {
					return "700";
				} else {
					return "normal";
				}
			},
			fill: a => {
				if (Number(this.state.activeCat) === a - 1) {
					return this.props.activeColor;
				} else {
					return "#555";
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

		const activeSemaforoLegend = (refName, value, index) => {
			let fill;
			if (index === 0 || value === 0) {
				fill = this.props.theme.semaforo.verde[0];
			} else if (index === 1 || value === -1) {
				fill = this.props.theme.semaforo.rojo[0];
			}
			let mutation = refName =>
				refName === "Neto"
					? { stroke: "#555", strokeWidth: 3 }
					: {
							fill: fill,
							width: this.state.barWidth,
							fontFamily: "Asap"
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
							fill: fill
						})
					})
				},
				{
					target: "labels",
					childName: this.state.barNames,
					eventKey: "all",
					mutation: props => ({
						style: Object.assign({}, props.style, {
							fill: "transparent"
						})
					})
				}
			];
		};

		const semaforoLegendLabelStyle = yval => {
			return {
				fontSize: 12,
				fontFamily: "Asap",
				fontWeight: a => {
					if (this.state.activeCat === a.name) {
						return 700;
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
		};

		const events = [
			{
				childName: "Neto",
				target: "data",
				eventHandlers: {
					onMouseOver: (evt, obj, idx) => {
						return [
							{
								target: "data",
								mutation: props => ({
									style: Object.assign({}, props.style, {
										stroke: this.props.activeColor,
										strokeWidth: 3
									})
								})
							}
						];
					},
					onMouseOut: () => {
						return [
							{ target: "data", mutation: props => null },
							{ target: "labels", mutation: props => null }
						];
					}
				}
			},
			{
				childName: [this.state.barNames[0], this.state.barNames[1]],
				target: "data",
				eventHandlers: {
					onMouseOver: (evt, obj, idx) => {
						if (this.state.clicked !== true) {
							this.setState({
								activeKey: Number(idx),
								activeCat: idx
							});

							if (this.props.semaforo === true) {
								return semaforoActiveStyle(obj.datum.y);
							} else {
								return activeStyle;
							}
						}
					},
					onClick: (evt, obj, idx) => {
						let clicked = `${obj.datum.x}-${idx}`;
						if (this.state.clickedBar !== true) {
							this.setState({
								clickedBar: true,
								activeClickedBar: clicked,
								activeCat: idx
							});

							if (this.props.semaforo === true) {
								return semaforoActiveStyle(obj.datum.y);
							} else {
								return activeStyle;
							}
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
						if (this.state.isLegendClicked !== true) {
							if (obj.datum.x !== undefined) {
								let clickedthing = `${obj.datum.x}-${idx}`;
								if (
									this.state.activeClickedBar !== clickedthing
								) {
									this.setState({
										activeKey: null,
										activeBar: null,
										activeCat: undefined
									});
									return normalStyle;
								}
							}
						} else {
							let semfill;
							if (
								this.state.activeLegend ===
									this.props.positiveValue &&
								obj.datum.y > 0
							) {
								semfill = this.state.semaforo.verde[0];
							} else if (
								this.state.activeLegend ===
									this.props.negativeValue &&
								obj.datum.y < 0
							) {
								semfill = this.state.semaforo.rojo[0];
							} else {
								semfill =
									obj.datum.y > 0
										? this.props.colorscale[0]
										: this.props.colorscale[1];
							}

							return [
								{
									target: "data",
									mutation: props => ({
										style: Object.assign({}, props.style, {
											fill: semfill,
											width: this.state.barWidth
										})
									})
								},
								{
									target: "labels",
									mutation: props => ({
										style: Object.assign({}, props.style, {
											fill: "transparent"
										})
									})
								}
							];
							console.log(obj.datum.y);
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
									isLegendClicked: true,
									activeLegend: refName
								});
								if (this.props.semaforo !== true) {
									return activeLegend(refName);
								} else {
									return activeSemaforoLegend(
										refName,
										obj.datum.value,
										obj.index
									);
								}
							} else {
								//Está cliqueada una leyenda
								if (this.state.activeCat === refName) {
									this.setState({
										activeCat: undefined,
										isLegendClicked: false,
										activeLegend: undefined
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
									this.setState({
										activeCat: refName,
										activeLegend: refName
									});
									if (this.props.semaforo === true) {
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
											...activeSemaforoLegend(
												obj.datum.name,
												obj.datum.value,
												obj.index
											)
										];
									} else {
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
						}
					},
					onMouseOver: (evt, obj, key) => {
						if (this.state.isLegendClicked !== true) {
							if (obj.datum !== undefined) {
								this.setState({
									activeCat: obj.datum.name
								});
							}
							if (this.props.semaforo !== true) {
								return activeLegend(obj.datum.name);
							} else {
								return activeSemaforoLegend(
									obj.datum.name,
									obj.datum.value,
									obj.index
								);
							}
						}
					},
					onMouseOut: (evt, obj, key) => {
						if (this.state.isLegendClicked !== true) {
							this.setState({ activeCat: undefined });
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
						titleOrientation="top"
						gutter={10}
						rowGutter={0}
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="horizontal"
						itemsPerRow={3}
						responsive={false}
						height={100}
						labelComponent={
							<VictoryLabel style={legendLabelStyle} />
						}
						dataComponent={
							<Point size={4} style={legendDataStyle} />
						}
						titleComponent={
							<Title
								title={this.state.title}
								subtitle={this.state.subtitle}
								fontSizeTop={14}
								fontSizeBottom={12}
								dy1={15}
								dy2={18}
							/>
						}
					/>
					<VictoryChart
						width={this.props.width}
						height={230}
						theme={this.props.theme}
						domainPadding={this.state.domainPadding}
						padding={{ top: 20, right: 30, bottom: 40, left: 30 }}
					>
						<VictoryAxis
							key="horizontalAxis"
							height={this.props.height}
							width={this.props.width}
							tickLabelComponent={
								<VictoryLabel
									style={axisLabelStyle}
									textAnchor="start"
									dy={15}
									dx={-45}
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
												: "transparent",
										fontWeight: 700,
										fontFamily: "Asap",
										fontSize: this.state.activeBarFontSize
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
											fontWeight: "700",
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
										fontWeight: 700,
										fontFamily: "Asap",
										fontSize: this.state.activeBarFontSize,
										fill: "transparent"
									}
								}}
								alignment="middle"
								barRatio={0.2}
								labels={d => `${d.y}`}
							/>
						</VictoryStack>
						<VictoryLine
							name="Neto"
							key="neto"
							style={{
								data: {
									stroke: this.props.theme.linebar.lineColor,
									strokeWidth: 2
								},
								labels: {
									fontWeight: 700,
									fontFamily: "Asap",
									fontSize: this.state.activeBarFontSize,
									fill: "transparent"
								}
							}}
							data={this.differential(
								this.state.data.data[0].data,
								this.state.data.data[1].data
							)}
							domain={{ y: [0, 250] }}
							standalone={false}
							//labels={d => `${d.y}%`}
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

export default LineBarsFour;
