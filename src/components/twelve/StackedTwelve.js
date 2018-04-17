import React, { Component } from "react";
import DownloadButton from "../mini/DownloadButton.js";
import Title from "../mini/Title.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryStack,
	VictoryLabel,
	VictoryAxis,
	VictoryContainer,
	VictoryLegend,
	VictorySharedEvents,
	Point
} from "victory";

class StackedTwelve extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data,
			activeKey: null,
			activeCat: null,
			activeMonth: null,
			activeColor: this.props.theme.interactions.hover,
			isLegendClicked: false,
			clickedBar: false,
			activeClickedBar: null,
			clicked: false,
			labelOffset: 1.4,
			svgrefs: [],
			barNames: [
				this.props.data.data[0].title,
				this.props.data.data[1].title
			],
			axisLabelSize: 6,
			barWidth: 12,
			activeBarFontSize: 6
		};
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.containerRef]
		});
	}

	getCurFill(cat, index, active) {
		if (this.state.activeCat === cat) {
			return this.state.activeColor;
		} else {
			return this.props.colorscale[index];
		}
	}

	getCurFillAlt(cat, index, active) {
		if (this.state.activeCat === cat) {
			return this.state.activeColor;
		} else {
			return "transparent";
		}
	}

	makeLegend() {
		return this.state.data.data.map((item, idx) => {
			return {
				name: item.title,
				symbol: {
					fill: this.props.colorscale[idx]
				}
			};
		});
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
						fill: this.state.activeColor,
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
			fontSize: 7,
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
		const axisLabelStyle = {
			fontSize: this.state.axisLabelSize,
			fontWeight: a => {
				if (this.state.activeCat === a) {
					return "bold";
				} else {
					return "normal";
				}
			},
			fill: a => {
				if (this.state.activeCat === a) {
					return this.state.activeColor;
				} else {
					return "#555";
				}
			}
		};
		const events = [
			{
				childName: "all",
				target: "data",
				eventHandlers: {
					onMouseOver: (evt, obj, idx) => {
						let activeCat = obj.data[0].x;
						let activeBar = `${obj.datum.x}-${idx}`;
						this.setState({
							activeKey: activeCat,
							activeBar: activeBar,
							activeCat: idx
						});
						return activeStyle;
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
													fill: this.state.activeColor
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
							} else {
								//Está cliqueada una leyenda
								if (this.state.activeCat === refName) {
									this.setState({
										activeCat: null,
										isLegendClicked: false
									});
								} else {
									this.setState({ activeCat: refName });
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
								}
							];
						}
					}
				}
			}
		];

		const bars = () =>
			this.state.data.data.map((bar, idx) => {
				//Hay que calcular la altura para poder posicionar el label arriba, esto debería cambiar al haber 3 o más stacks
				const offset = d => {
					let dy = 0;
					if (idx === 0) {
						dy =
							-this.state.data.data[1].data[d.eventKey].y *
							this.state.labelOffset;
					}
					return dy;
				};
				return (
					<VictoryBar
						key={"bar-" + idx}
						name={this.state.barNames[idx]}
						theme={this.props.theme}
						title={bar.title}
						data={bar.data}
						eventKey={"bar-" + idx}
						alignment="middle"
						barRatio={0.2}
						style={{
							data: {
								fill: (d, active) =>
									this.getCurFill(
										this.state.barNames[idx],
										idx,
										active
									)
							}
						}}
						labelComponent={
							<VictoryLabel
								style={{
									fill: (d, active) =>
										this.getCurFillAlt(
											this.state.barNames[idx],
											idx,
											active
										),
									fontWeight: "bold",
									fontSize: this.state.activeBarFontSize
								}}
								dy={d => offset(d)}
								text={d => `${d.y}%`}
							/>
						}
					/>
				);
			});

		const labels = () => this.state.data.data[0].data.map(item => item.x);
		return (
			<div className="chart-widget">
				<VictorySharedEvents events={events}>
					<VictoryLegend
						title={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						x={this.props.width - 275}
						width={this.props.width}
						titleOrientation="left"
						gutter={20}
						height={60}
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="vertical"
						itemsPerRow={1}
						colorscale={this.props.colorscale}
						labelComponent={
							<VictoryLabel style={legendLabelStyle} y={16} />
						}
						dataComponent={
							<Point size={3} style={legendDataStyle} y={16} />
						}
						titleComponent={
							<Title
								title={this.state.title}
								subtitle={this.state.subtitle}
								fontSizeTop={9}
								fontSizeBottom={7}
								dy1={10}
								dy2={12}
							/>
						}
					/>
					<VictoryChart
						responsive={false}
						theme={this.props.theme}
						height={this.props.height}
						width={this.props.width}
						padding={{ top: 25, right: 30, bottom: 40, left: 30 }}
						domainPadding={{ y: 0, x: 40 }}
						containerComponent={
							<VictoryContainer
								containerRef={containerRef =>
									(this.containerRef = containerRef)
								}
							/>
						}
					>
						<VictoryAxis
							key="x"
							tickValues={labels()}
							tickLabelComponent={
								<VictoryLabel
									style={axisLabelStyle}
									dy={0}
									dx={-14}
									angle={-45}
								/>
							}
						/>
						<VictoryAxis
							key="y"
							dependentAxis
							style={{ tickLabels: { fontSize: 6 } }}
						/>
						<VictoryStack
							domain={{ y: [0, 100] }}
							style={{
								labels: {
									textAlign: "center",
									fontWeight: "bold"
								},
								data: {
									width: this.state.barWidth
								}
							}}
						>
							{bars()}
						</VictoryStack>
					</VictoryChart>
				</VictorySharedEvents>

				<DownloadButton
					type="stacked"
					data={this.props.data}
					fields={[
						{ label: "Mes", value: "data.x" },
						{ label: "Respuesta", value: "title" },
						{ label: "Porcentaje", value: "data.y" }
					]}
					unwind={["data"]}
				/>
			</div>
		);
	}
}

export default StackedTwelve;
