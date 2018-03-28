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
			activeLine: null
		};
	}

	makeLegend(data) {
		let legData = data.map((item, idx) => {
			let linename = "line-" + idx;
			return {
				name: item.title,
				symbol: {
					fill: this.state.colorscale[idx]
				},
				eventKey: linename
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
										color={
											this.props.theme.interactions.hover
										}
									/>
								}
								orientation="top"
							/>
						}
					>
						<VictoryLine
							style={{
								data: {
									stroke: () =>
										this.state.activeLine === linename
											? this.props.theme.interactions
													.hover
											: this.state.colorscale[idx]
									//pointerEvents: "none"
								}
							}}
						/>
						<VictoryScatter
							size={(datum, active) => (active ? 6 : 3)}
							style={{
								data: {
									fill: (datum, active) =>
										active
											? this.props.theme.interactions
													.hover
											: this.state.colorscale[idx]
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
												console.log(evt);
												this.setState({
													activeLine: key
												});
												return {
													style: Object.assign(
														{},
														props.style,
														{
															stroke: this.props
																.theme
																.interactions
																.hover
														}
													)
												};
											}
										},
										{
											target: "data",
											childName: "legend",
											mutation: props => {
												return {
													style: Object.assign(
														{},
														props.style,
														{
															fill: this.props
																.theme
																.interactions
																.hover
														}
													)
												};
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
