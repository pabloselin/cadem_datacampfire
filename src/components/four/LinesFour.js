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

class LinesFour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data.data,
			activeLine: null,
			activeMonth: null,
			clicked: false,
			domainLength: this.props.data.data[0].values.length,
			xLabels: this.props.data.data[0].values.map(item => {
				return item.x;
			}),
			svgrefs: [],
			tooltipSize: 11
		};
	}

	makeLegend(data) {
		let legData = data.map((item, idx) => {
			let linename = "line-" + idx;
			let eventStyles = () => {
				if (linename === this.state.activeLine) {
					return {
						fill: this.props.activeColor,
						fontWeight: "bold"
					};
				} else {
					return {
						fill: this.props.colorscale[idx],
						fontWeight: "normal"
					};
				}
			};
			//console.log(ballcolor);
			return {
				name: item.title,
				symbol: {
					fill: eventStyles().fill
				},
				labels: {
					fill: eventStyles().fill,
					fontWeight: eventStyles().fontWeight
				}
			};
		});
		return legData;
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
						? this.props.activeColor
						: this.props.colorscale[idx];
				const linewidth = () =>
					this.state.activeLine === linename ? 1.8 : 0.7;

				return (
					<VictoryLine
						data={line.values}
						eventKey={linename}
						theme={this.props.theme}
						name={linename}
						style={{
							data: {
								stroke: linecolor(),
								strokeWidth: linewidth()
							}
						}}
					/>
				);
			});

		const legendLabelStyle = {
			fontSize: 18,
			fontFamily: "Asap"
		};

		const events = [
			{
				childName: "all",
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
											activeLine: null,
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
												activeLine: null
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
											activeLine: null,
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
		return (
			<div className="chart-widget">
				<svg height={40}>
					<Title
						title={this.state.title}
						subtitle={this.state.subtitle}
						fontSizeTop={15}
						fontSizeBottom={13}
						dy1={15}
						dy2={21}
					/>
				</svg>
				<VictorySharedEvents events={events}>
					<VictoryChart
						height={this.props.height}
						width={this.props.width}
						name="lines"
						theme={this.props.theme}
						domainPadding={{ x: 10, y: 20 }}
						padding={{ top: 20, right: 35, bottom: 50, left: 35 }}
						containerComponent={
							<VictoryVoronoiContainer
								activateLabels={false}
								radius={40}
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
										labelComponent={
											<VictoryLabel
												style={{
													fill: this.props
														.activeColor,
													fontWeight: "bold",
													fontSize: this.state
														.tooltipSize
												}}
											/>
										}
										flyoutComponent={
											<LineFlyOut
												graphHeight={this.props.height}
												color={this.props.activeColor}
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
									fontSize: 10,
									padding: 40
								},
								tickLabels: {
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
						x={30}
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="horizontal"
						itemsPerRow={4}
						rowGutter={10}
						gutter={20}
						height={30}
						dataComponent={<Point size={6} />}
						labelComponent={
							<VictoryLabel style={legendLabelStyle} />
						}
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

export default LinesFour;
