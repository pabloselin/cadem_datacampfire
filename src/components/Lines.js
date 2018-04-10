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
			activeColor: this.props.theme.interactions.hover
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
					this.state.activeLine === linename ? 1.5 : 0.5;
				return (
					<VictoryGroup
						name={linename}
						key={linename}
						data={line.values}
						eventKey={linename}
						labels={d => `${d.y}%`}
						theme={this.props.theme}
						labelComponent={
							<VictoryTooltip
								theme={this.props.theme}
								activateData={true}
								style={{ data: { fontSize: 8 } }}
								flyoutComponent={
									<LineFlyOut
										graphHeight={this.props.height}
										color={this.state.activeColor}
									/>
								}
								orientation="top"
							/>
						}
					>
						<VictoryLine
							style={{
								data: {
									stroke: linecolor(),
									pointerEvents: "none",
									strokeWidth: linewidth()
								}
							}}
						/>
						<VictoryScatter
							size={(datum, active) => (active ? 4 : 2)}
							style={{
								data: {
									fill: linecolor()
								}
							}}
						/>
					</VictoryGroup>
				);
			});
		return (
			<div className="chart-widget">
				<ChartHeader
					title={this.state.title}
					subtitle={this.props.data.chart_subtitle}
					className="ChartHeader"
				/>
				<VictorySharedEvents
					events={[
						{
							childName: "legend",
							target: "data",
							eventHandlers: {
								onClick: (evt, obj, key) => {
									return [
										{
											target: "data",
											childName: [...linenames],
											eventKey: key,
											mutation: props => {
												if (
													this.state.activeLine ===
													key
												) {
													this.setState({
														activeLine: null
													});
												} else {
													this.setState({
														activeLine:
															"line-" + key
													});
												}
											}
										}
									];
								}
							}
						}
					]}
				>
					<VictoryChart
						height={this.props.height}
						width={600}
						name="lines"
						theme={this.props.theme}
						domainPadding={{ x: 20, y: 20 }}
						containerComponent={<VictoryVoronoiContainer />}
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
