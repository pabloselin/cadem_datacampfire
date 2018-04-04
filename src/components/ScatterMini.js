import React, { Component } from "react";
import "./Scatter.css";
import jsondata from "../data/scattermini.json";
import ChartHeader from "./mini/ChartHeader.js";
import {
	VictoryChart,
	VictoryScatter,
	//VictoryLegend,
	VictoryTooltip
} from "victory";

class ScatterMini extends Component {
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
		return (
			<div>
				<ChartHeader
					title={this.state.title}
					subtitle={this.state.data.chart_subtitle}
					className="ChartHeader"
				/>
				<VictoryChart
					theme={this.props.theme}
					width={this.props.width}
					height={this.props.height}
					domainPadding={40}
				>
					<VictoryScatter
						theme={this.props.theme}
						key={this.state.title}
						style={{ data: { fill: "#555" } }}
						data={this.state.data}
						bubbleProperty="cantidad"
						maxBubbleSize={25}
						minBubbleSize={5}
						labels={d =>
							`${d.x}% Recomendación\n${d.y}% Satisfacción \n${
								d.cantidad
							} Cartera`
						}
						labelComponent={
							<VictoryTooltip
								theme={this.props.theme}
								orientation="right"
								dy={-10}
								activateData={true}
							/>
						}
					/>
				</VictoryChart>
			</div>
		);
	}
}

export default ScatterMini;
