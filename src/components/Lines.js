import React, { Component } from "react";
import "./Lines.css";

import {
	VictoryChart,
	VictoryLine,
	VictoryTooltip,
	VictoryLegend,
	VictorySharedEvents,
	VictoryLabel,
	VictoryPortal
} from "victory";

class Lines extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			currentPercent: 0
		};
	}

	makeLegend(data) {
		let legData = data.map(item => {
			return {
				name: item.title,
				label: item.title,
				number: 0
			};
		});
		return legData;
	}

	getData(data) {
		return data;
	}

	componentWillReceiveProps(nextProps) {}

	render() {
		const lines = () =>
			this.state.data.map((line, idx) => {
				return (
					<VictoryLine
						name={"line-" + idx}
						key={"line-" + idx}
						data={line.values}
					/>
				);
			});
		const linenames = ["line-0", "line-1"];
		const childs = ["line-0", "line-1", "legend"];
		return (
			<div>
				<VictorySharedEvents
					eventKey={datum => datum.label}
					events={[
						{
							childName: childs,
							target: "data",
							eventHandlers: {
								onMouseOver: () => {
									return [
										{
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
								},
								onMouseOut: () => {
									return [
										{
											childName: childs,
											mutation: () => {
												return null;
											}
										}
									];
								}
							}
						}
					]}
				>
					<VictoryChart name="lines" theme={this.props.theme}>
						{lines()}
					</VictoryChart>
					<VictoryLegend
						name="legend"
						data={this.makeLegend(this.props.data)}
						orientation="vertical"
						itemsPerRow="3"
					/>
				</VictorySharedEvents>
			</div>
		);
	}
}

export default Lines;
