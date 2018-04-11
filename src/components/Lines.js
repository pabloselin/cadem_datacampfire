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
	VictoryScatter
} from "victory";

class Lines extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			data: this.props.data.data,
			colorscale: this.props.theme.line.colorScale,
			activeLine: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false
		};
	}

	makeLegend(data) {
		let legData = data.map((item, idx) => {
			let linename = "line-" + idx;
			let fill = () => {
				if (linename === this.state.activeLine) {
					return this.state.activeColor;
				} else {
					return this.state.colorscale[idx];
				}
			};
			//console.log(ballcolor);
			return {
				name: item.title,
				symbol: {
					fill: fill()
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
				const tooltip = () => {
					if (this.state.activeLine === linename) {
						return (
							<VictoryTooltip
								theme={this.props.theme}
								activateData={true}
								flyoutComponent={
									<LineFlyOut
										graphHeight={this.props.height}
										color={this.state.activeColor}
									/>
								}
								orientation="top"
							/>
						);
					}
				};
				return (
					<VictoryLine
						labels={d => labels(d)}
						data={line.values}
						theme={this.props.theme}
						style={{
							labels: {
								fill: this.state.activeColor,
								fontWeight: "bold"
							}
						}}
						labelComponent={tooltip()}
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
											clicked: true
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
						width={600}
						name="lines"
						theme={this.props.theme}
						domainPadding={{ x: 20, y: 20 }}
						containerComponent={
							<VictoryVoronoiContainer
								labelComponent={
									<VictoryTooltip
										theme={this.props.theme}
										activateData={true}
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
						{lines()}
					</VictoryChart>
					<VictoryLegend
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="vertical"
						itemsPerRow={3}
						height={70}
						style={{
							title: { fontSize: 12, fontWeight: "bold" },
							labels: { fontSize: 8 }
						}}
					/>
				</VictorySharedEvents>
			</div>
		);
	}
}

export default Lines;
