import React, { Component } from "react";
import "./Scatter.css";
import jsondata from "../data/scatter.json";
import ChartHeader from "./mini/ChartHeader.js";
import {
	VictoryChart,
	VictoryScatter,
	VictoryLegend
	//VictoryTooltip
} from "victory";

class Scatter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: jsondata.chart_title,
			data: jsondata.data,
			activeColor: this.props.theme.interactions.hover,
			colorscale: this.props.theme.line.colorScale
		};
	}

	makeLegend(data) {
		let legend = data.map((item, idx) => {
			return {
				name: item.title,
				symbol: { fill: this.state.colorscale[idx] }
			};
		});
		console.log(legend);
		return legend;
	}

	render() {
		const scatters = () =>
			this.state.data.map((local, idx) => {
				return (
					<VictoryScatter
						key={local.title}
						style={{ data: { fill: this.state.colorscale[idx] } }}
						data={local.data}
						bubbleProperty="cantidad"
						maxBubbleSize={25}
						minBubbleSize={5}
					/>
				);
			});
		return (
			<div>
				<ChartHeader
					title={this.state.title}
					subtitle={this.state.data.chart_subtitle}
					className="ChartHeader"
				/>
				<VictoryLegend
					orientation="horizontal"
					theme={this.props.theme}
					data={this.makeLegend(this.state.data)}
					height={15}
				/>
				<VictoryChart
					theme={this.props.theme}
					width={this.props.width}
					height={this.props.height}
					domainPadding={40}
				>
					{scatters()}
				</VictoryChart>
			</div>
		);
	}
}

export default Scatter;
