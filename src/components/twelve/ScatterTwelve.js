import React, { Component } from "react";
import DownloadButton from "../mini/DownloadButton.js";
import Title from "../mini/Title.js";
import {
	VictoryChart,
	VictoryScatter,
	VictoryLegend,
	VictoryAxis,
	Point,
	VictoryLabel,
	VictoryTooltip,
	VictorySharedEvents
} from "victory";

class ScatterSix extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data.data,
			activeColor: this.props.theme.interactions.hover,
			activeKey: null,
			activeCat: null,
			domainX: this.props.data.domainX,
			domainY: this.props.data.domainY,
			svgrefs: [],
			clicked: false,
			colorscale: this.props.colorscale
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

	componentDidMount() {}

	getCurFill(cat, index, active) {
		if (this.state.activeCat === cat) {
			return this.state.activeColor;
		} else if (active === true) {
			return this.props.altActiveColor;
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
		if (array.length === 0) {
			return false;
		} else {
			return true;
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
								cursor: "pointer",
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
								dy={-5}
								theme={this.props.theme}
								horizontal={true}
								activateData={true}
								style={{ fontSize: 6, textAnchor: "start" }}
							/>
						}
					/>
				);
			});

		const legendLabelStyle = {
			fontSize: 5,
			fontFamily: "Asap",
			cursor: "pointer",
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
			cursor: "pointer",
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
					onMouseOver: (evt, obj, key) => {
						return [
							{
								target: "data",
								mutation: props => {
									return {
										style: {
											fill: this.props.altActiveColor
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
					<VictoryLegend
						title={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						titleOrientation="left"
						gutter={0}
						height={40}
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="horizontal"
						itemsPerRow={4}
						dataComponent={
							<Point size={2.3} style={legendDataStyle} y={6} />
						}
						labelComponent={
							<VictoryLabel style={legendLabelStyle} y={6} />
						}
						titleComponent={
							<Title
								title={this.state.title}
								subtitle={this.state.subtitle}
								fontSizeTop={7}
								fontSizeBottom={5}
								dy1={7}
								dy2={9}
							/>
						}
					/>

					<VictoryChart
						theme={this.props.theme}
						width={this.props.width}
						height={this.props.height}
						domainPadding={40}
						padding={{ top: 0, left: 30, right: 30, bottom: 20 }}
					>
						<VictoryAxis
							domain={this.state.domainY}
							dependentAxis
							style={{ tickLabels: { fontSize: 6 } }}
						/>
						<VictoryAxis
							style={{ tickLabels: { fontSize: 6 } }}
							domain={this.state.domainX}
						/>
						{scatters()}
					</VictoryChart>
				</VictorySharedEvents>
				<DownloadButton
					type="scatter"
					data={this.props.data}
					fields={[
						{ label: "Recomendación", value: "data.x" },
						{ label: "Local", value: "title" },
						{ label: "Satisfacción", value: "data.y" },
						{ label: "Cartera", value: "data.cantidad" }
					]}
					unwind={["data"]}
				/>
			</div>
		);
	}
}

export default ScatterSix;
