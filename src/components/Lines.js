import React, { Component } from "react";
import "./Lines.css";
import LineFlyOut from "./mini/LineFlyOut.js";
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
			data: this.props.data,
			colorscale: this.props.theme.line.colorScale,
			activeLine: null,
			activeColor: this.props.theme.interactions.hover
		};
	}

	makeLegend(data) {
		let legData = data.map((item, idx) => {
			let linename = "line-" + idx;
			//let ballcolor = this.state.colorscale[idx];
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
			this.props.data.map((line, idx) => {
				let linename = "line-" + idx;
				linenames.push(linename);

				const linecolor = () =>
					this.state.activeLine === linename
						? this.state.activeColor
						: this.state.colorscale[idx];
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
									pointerEvents: "none"
								}
							}}
						/>
						<VictoryScatter
							size={(datum, active) => (active ? 6 : 3)}
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
			<div>
				<VictorySharedEvents
					events={[
						{
							childName: "legend",
							target: "data",
							eventHandlers: {
								onClick: (evt, obj, key) => {
									//console.log(linenames);
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
						domainPadding={{ x: 10, y: 20 }}
						containerComponent={<VictoryVoronoiContainer />}
					>
						{lines()}
					</VictoryChart>
					<VictoryLegend
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.props.data)}
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
