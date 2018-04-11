import React, { Component } from "react";
import "./Lines.css";
import LineFlyOut from "./mini/LineFlyOut.js";
import ChartHeader from "./mini/ChartHeader.js";
import {
	VictoryChart,
	VictoryLine,
	VictoryGroup,
	VictoryTooltip,
	VictoryLegend,
	VictorySharedEvents,
	VictoryVoronoiContainer,
	VictoryScatter,
	VictoryLabel,
	VictoryAxis
} from "victory";

class Lines extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			data: this.props.data.data,
			colorscale: this.props.theme.line.colorScale,
			activeLine: null,
			activeMonth: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false,
			domainLength: this.props.data.data[0].values.length,
			xLabels: this.props.data.data[0].values.map(item => {
				return item.x;
			})
		};
	}

	makeLegend(data) {
		let legData = data.map((item, idx) => {
			let linename = "line-" + idx;
			let eventStyles = () => {
				if (linename === this.state.activeLine) {
					return {
						fill: this.state.activeColor,
						fontWeight: "bold"
					};
				} else {
					return {
						fill: this.state.colorscale[idx],
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

	LineHoverEvent() {}

	LineOutEvent() {}

	render() {
		const linenames = [];
		const lines = () =>
			this.state.data.map((line, idx) => {
				let linename = "line-" + idx;
				linenames.push(linename);

				const linecolor = () =>
					this.state.activeLine === linename
						? this.state.activeColor
						: this.state.colorscale[idx];
				const linewidth = () =>
					this.state.activeLine === linename ? 1.8 : 0.7;
				const labels = d => {
					if (this.state.activeLine === linename) {
						return `${d.y}%`;
					} else {
						return "";
					}
				};

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
				<ChartHeader
					title={this.state.title}
					subtitle={this.props.data.chart_subtitle}
					className="ChartHeader"
				/>
				<VictorySharedEvents events={events}>
					<VictoryChart
						height={this.props.height}
						width={this.props.width}
						name="lines"
						theme={this.props.theme}
						domainPadding={{ x: 10, y: 20 }}
						containerComponent={
							<VictoryVoronoiContainer
								onActivated={(points, props) => {
									this.setState({
										activeLine: points[0].childName,
										activeMonth: points[0].x
									});
								}}
								labelComponent={
									<VictoryTooltip
										theme={this.props.theme}
										activateData={true}
										labelComponent={
											<VictoryLabel
												style={{
													fill: this.state
														.activeColor,
													fontWeight: "bold",
													fontSize: 10
												}}
											/>
										}
										flyoutComponent={
											<LineFlyOut
												graphHeight={this.props.height}
												color={this.state.activeColor}
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
							domain={[this.state.domainLength]}
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
											? this.state.activeColor
											: "#555"
								}
							}}
						/>
						{lines()}
					</VictoryChart>
					<VictoryLegend
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="vertical"
						itemsPerRow={3}
						height={60}
						style={{
							title: { fontSize: 12, fontWeight: "bold" },
							labels: { fontSize: 12 }
						}}
					/>
				</VictorySharedEvents>
			</div>
		);
	}
}

export default Lines;
