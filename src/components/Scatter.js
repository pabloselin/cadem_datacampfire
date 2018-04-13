import React, { Component } from "react";
import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryChart,
	VictoryScatter,
	VictoryLegend,
	VictoryAxis,
	VictoryContainer,
	Point,
	VictoryLabel,
	VictoryTooltip,
	VictorySharedEvents
} from "victory";

class Scatter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data.data,
			activeColor: this.props.theme.interactions.hover,
			colorscale: this.props.theme.line.colorScale,
			activeKey: null,
			activeCat: null,
			domainX: this.props.data.domainX,
			domainY: this.props.data.domainY,
			svgrefs: [],
			clicked: false,
			clickedKeys: []
		};
	}

	makeLegend(data) {
		let legend = data.map((item, idx) => {
			return {
				name: item.title,
				symbol: { fill: this.state.colorscale[idx] }
			};
		});
		return legend;
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.containerRef]
		});
	}

	getCurFill(cat, index, active) {
		if (this.state.activeCat === cat || active === true) {
			return this.state.activeColor;
		} else {
			return this.state.colorscale[index];
		}
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

	legendLabelStyle() {}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.activeCat !== prevState.activeCat) {
		}
	}

	render() {
		const scatters = () =>
			this.state.data.map((local, idx) => {
				return (
					<VictoryScatter
						padding={{ top: 50 }}
						width={this.props.width}
						height={this.props.height}
						key={"scatter-" + idx}
						style={{
							data: {
								fill: (d, active) =>
									this.getCurFill(local.title, idx, active)
							}
						}}
						data={local.data}
						bubbleProperty="cantidad"
						maxBubbleSize={15}
						minBubbleSize={5}
						labels={d =>
							`${d.x}% Recomendación\n${d.y}% Satisfacción \n${
								d.cantidad
							} Cartera`
						}
						labelComponent={
							<VictoryTooltip
								theme={this.props.theme}
								horizontal={true}
								activateData={true}
							/>
						}
					/>
				);
			});

		const legendLabelStyle = {
			fontSize: 12,
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
				childName: "all",
				eventHandlers: {
					onClick: (evt, obj, key) => {
						return [
							{
								target: "data",
								mutation: props => {
									return props.style.fill ===
										this.state.activeColor
										? null
										: {
												style: {
													fill: this.state.activeColor
												}
										  };
								}
							}
						];
					}
				}
			},
			{
				childName: "legend",
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

							return [
								{
									target: "data",
									mutation: props => {
										return Object.assign({}, props.style, {
											style: {
												fill: this.state.activeColor
											}
										});
									}
								},
								{
									target: "labels",
									mutation: props => {
										return Object.assign({}, props.style, {
											style: {
												fill: this.state.activeColor,
												fontWeight: "bold",
												fontSize: 12,
												fontFamily: "Asap"
											}
										});
									}
								}
							];
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
						width={this.props.width}
						height={this.props.height}
						domainPadding={40}
						containerComponent={
							<VictoryContainer
								containerRef={containerRef =>
									(this.containerRef = containerRef)
								}
							/>
						}
					>
						<VictoryAxis domain={this.state.domainX} />
						<VictoryAxis
							domain={this.state.domainY}
							dependentAxis
						/>

						<VictoryLegend
							title={[
								this.state.title.toUpperCase(),
								this.state.subtitle
							]}
							titleOrientation="top"
							gutter={10}
							padding={{ bottom: 100 }}
							theme={this.props.theme}
							name="legend"
							data={this.makeLegend(this.state.data)}
							orientation="horizontal"
							itemsPerRow={4}
							dataComponent={
								<Point style={legendDataStyle} y={40} />
							}
							labelComponent={
								<VictoryLabel style={legendLabelStyle} y={40} />
							}
							titleComponent={
								<VictoryLabel
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
						{scatters()}
					</VictoryChart>
				</VictorySharedEvents>
				<DownloadButton
					type="scatter"
					svgs={this.state.svgrefs}
					title={this.state.title}
					subtitle={this.state.subtitle}
					percent={this.state.currentPercent}
				/>
			</div>
		);
	}
}

export default Scatter;
