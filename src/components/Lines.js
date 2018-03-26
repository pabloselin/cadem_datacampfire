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
		let sum = 0;
		data.map(item => {
			sum += Number(item.y);
			return true;
		});

		let legData = data.map(item => {
			let percent = Number(item.y) / sum * 100;
			return {
				name: item.x + " (" + percent.toFixed(1) + "%)",
				percent: percent.toFixed(1)
			};
		});
		return legData;
	}

	getData(data) {
		return data;
	}

	componentWillReceiveProps(nextProps) {}

	render() {
		return (
			<div>
				<VictoryChart theme={this.props.theme}>
					<VictoryLine data={this.getData(this.props.data)} />
				</VictoryChart>
			</div>
		);
	}
}

export default Lines;
