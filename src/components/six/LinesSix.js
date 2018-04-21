import React, { Component } from "react";
import LineFlyOut from "../mini/LineFlyOut.js";
import DownloadButton from "../mini/DownloadButton.js";
import Title from "../mini/Title.js";
import {
	VictoryChart,
	VictoryLine,
	VictoryTooltip,
	VictoryLegend,
	VictorySharedEvents,
	VictoryVoronoiContainer,
	VictoryLabel,
	VictoryAxis,
	Point
} from "victory";

class LinesSix extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data:
				this.props.debug === true
					? this.randomize(this.props.data.data)
					: this.props.data.data,
			activeLine: undefined,
			activeMonth: null,
			clicked: false,
			clickedKeys: [],
			domainLength: this.props.data.data[0].values.length,
			xLabels: this.props.data.data[0].values.map(item => {
				return item.x;
			}),
			svgrefs: [],
			tooltipSize: 13
		};
	}

	makeLegend(data) {
		let legData = data.map((item, idx) => {
			return {
				name: item.title,
				symbol: {
					fill: this.props.colorscale[idx]
				}
			};
		});
		return legData;
	}

	removeKey(array, element) {
		return array.filter(e => e !== element);
	}

	updateClickeds(array, element) {
		//Debe ser un listado de valores únicos
		//console.log(element, this.state.clickedKeys);
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

	randomize(data) {
		let fullData = data.map(line => {
			let newData = line.values.map(item => {
				return {
					x: item.x,
					y: Math.round(Math.random() * 70 * 100) / 100
				};
			});
			return { title: line.title, values: newData };
		});

		return fullData;
	}

	getData(data) {
		return data;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this.setState({
				data: nextProps.data,
				colorscale: nextProps.theme.line.colorScale
			});
		}
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.containerRef]
		});
	}

	render() {
		const linenames = [];
		const lines = () =>
			this.state.data.map((line, idx) => {
				let linename = "line-" + idx;
				linenames.push(linename);
				const linecolor = () =>
					this.state.activeLine === linename
						? this.props.colorscale[idx]
						: this.props.colorscale[idx];
				const linewidth = () =>
					this.state.activeLine === linename ? 3.2 : 1.2;

				return (
					<VictoryLine
						data={line.values}
						eventKey={linename}
						theme={this.props.theme}
						name={linename}
						style={{
							data: {
								stroke: linecolor(),
								strokeWidth: linewidth(),
								cursor: "pointer"
							}
						}}
					/>
				);
			});

		const legendLabelStyle = {
			labels: {
				fontSize: 11,
				fontFamily: "Asap",
				cursor: "pointer",
				fill: d => {
					return d.symbol.fill;
				}
			}
		};

		const events = [
			{
				childName: [...linenames],
				target: "data",
				eventHandlers: {
					onClick: (evt, obj, key) => {
						return [
							{
								target: "data",
								childName: [...linenames],
								eventKey: key,
								mutation: props => {
									if (this.state.activeLine === key) {
										this.setState({
											activeLine: undefined,
											clicked: false
										});
									} else {
										this.setState({
											activeLine: "line-" + key,
											clicked: true,
											activeMonth: null
										});
									}
								}
							},
							{
								target: "data",
								childName: "all",
								eventKey: key,
								mutation: props => {
									if (this.state.clicked !== true) {
										this.setState({
											clickedKeys: this.updateClickeds(
												this.state.clickedKeys,
												obj.key
											),
											clicked: true
										});
									} else {
										if (
											this.state.clickedKeys.indexOf(
												obj.key
											) !== -1
										) {
											this.setState({
												clickedKeys: this.removeKey(
													this.state.clickedKeys,
													obj.key
												)
											});
										} else {
											this.setState({
												clickedKeys: this.updateClickeds(
													this.state.clickedKeys,
													obj.key
												)
											});
										}
									}
								}
							}
						];
					},
					onMouseOver: (evt, obj, key) => {
						return [
							{
								target: "data",
								childName: [...linenames],
								eventKey: key,
								mutation: props => {
									if (this.state.clicked !== true) {
										if (this.state.activeLine === key) {
											this.setState({
												activeLine: undefined
											});
										} else {
											this.setState({
												activeLine: "line-" + key
											});
										}
									}
								}
							}
						];
					},
					onMouseOut: (evt, obj, key) => {
						return [
							{
								target: "data",
								childName: [...linenames],
								eventKey: key,
								mutation: props => {
									if (this.state.clicked !== true) {
										this.setState({
											activeLine: undefined,
											activeMonth: null,
											clicked: false
										});
									}
								}
							}
						];
					}
				}
			},
			{
				childName: "legend",
				target: "labels",
				eventHandlers: {
					onClick: (evt, obj, key) => {
						return [
							{
								target: "data",
								childName: [...linenames],
								eventKey: key,
								mutation: props => {
									if (this.state.activeLine === key) {
										this.setState({
											activeLine: undefined,
											clicked: false
										});
									} else {
										this.setState({
											activeLine: "line-" + key,
											clicked: true,
											activeMonth: null
										});
									}
								}
							},
							{
								eventKey: "all",
								target: "labels",
								mutation: props => ({
									style: Object.assign(props.style, {
										fontWeight: "normal"
									})
								})
							},
							{
								eventKey: key,
								target: "labels",
								mutation: props => ({
									style: Object.assign(props.style, {
										fontWeight: 700
									})
								})
							}
						];
					},
					onMouseOver: (evt, obj, key) => {
						return [
							{
								target: "data",
								childName: [...linenames],
								eventKey: key,
								mutation: props => {
									if (this.state.clicked !== true) {
										if (this.state.activeLine === key) {
											this.setState({
												activeLine: undefined
											});
										} else {
											this.setState({
												activeLine: "line-" + key
											});
										}
									}
								}
							}
						];
					},
					onMouseOut: (evt, obj, key) => {
						return [
							{
								target: "data",
								childName: [...linenames],
								eventKey: key,
								mutation: props => {
									if (this.state.clicked !== true) {
										this.setState({
											activeLine: undefined,
											activeMonth: null,
											clicked: false
										});
									}
								}
							}
						];
					}
				}
			}
		];

		const fillScale = (d, a) => {
			if (this.state.activeLine !== undefined) {
				let indexcolor = Number(this.state.activeLine.slice(-1));
				return this.props.colorscale[indexcolor];
			} else {
				return "transparent";
			}
		};

		return (
			<div className="chart-widget">
				<VictorySharedEvents events={events}>
					<svg height={40}>
						<Title
							title={this.state.title}
							subtitle={this.state.subtitle}
							fontSizeTop={15}
							fontSizeBottom={13}
							dy1={18}
							dy2={22}
						/>
					</svg>

					<VictoryChart
						height={this.props.height}
						width={this.props.width}
						name="lines"
						theme={this.props.theme}
						domainPadding={{ x: 10, y: 20 }}
						containerComponent={
							<VictoryVoronoiContainer
								activateLabels={false}
								radius={60}
								containerRef={containerRef =>
									(this.containerRef = containerRef)
								}
								onActivated={(points, props) => {
									if (points[0] !== undefined) {
										this.setState({
											activeLine: points[0].childName,
											activeMonth: points[0].x
										});
									}
								}}
								labelComponent={
									<VictoryTooltip
										theme={this.props.theme}
										activateData={true}
										style={{
											fontWeight: 700,
											fill: (d, a) =>
												fillScale(d, a) !== undefined
													? fillScale(d, a)
													: "transparent"
										}}
										flyoutComponent={
											<LineFlyOut
												width={40}
												height={14}
												graphHeight={this.props.height}
												color={(d, a) =>
													fillScale(d, a)
												}
											/>
										}
										orientation="top"
									/>
								}
								labels={d => `${d.y}%`}
							/>
						}
					>
						<VictoryAxis
							theme={this.props.theme}
							dependentAxis
							domain={[0, 100]}
						/>
						<VictoryAxis
							width={this.props.width}
							domain={[1, this.state.domainLength]}
							theme={this.props.theme}
							tickValues={this.state.xLabels}
							tickLabelComponent={
								<VictoryLabel dy={4} dx={-14} angle={-45} />
							}
							style={{
								axisLabel: {
									textAlign: "right",
									padding: 40
								},
								tickLabels: {
									fontSize: 11,
									fontWeight: a =>
										a === this.state.activeMonth
											? "bold"
											: "normal",
									fill: a =>
										a === this.state.activeMonth
											? this.props.activeColor
											: "#555"
								}
							}}
						/>
						{lines()}
					</VictoryChart>
					<VictoryLegend
						x={0}
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="vertical"
						itemsPerRow={4}
						rowGutter={-6}
						gutter={0}
						height={70}
						style={legendLabelStyle}
						dataComponent={<Point size={3} />}
					/>
				</VictorySharedEvents>
				<DownloadButton
					type="groupedbars"
					data={this.props.data}
					fields={[
						{ label: "Mes", value: "values.x" },
						{ label: "Respuesta", value: "title" },
						{ label: "Porcentaje", value: "values.y" }
					]}
					unwind={["values"]}
				/>
			</div>
		);
	}
}

export default LinesSix;
