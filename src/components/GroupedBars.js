import React, { Component } from "react";
import "./GroupedBars.css";
import jsondata from "../data/barras.json";
import ChartHeader from "./mini/ChartHeader.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryGroup,
	VictoryTooltip,
	VictoryLegend,
	VictorySharedEvents,
	VictoryVoronoiContainer,
	VictoryScatter,
	VictoryLabel
} from "victory";

class GroupedBars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: jsondata.chart_title,
			data: jsondata,
			activeKey: null,
			activeColor: this.props.theme.interactions.hover
		};
	}

	makeLegend(data) {
		let legData = data.data.map(item => {
			return {
				name: item.title
			};
		});

		return legData;
	}

	render() {
		const groups = () =>
			this.state.data.data.map(group => {
				return (
					<VictoryBar
						name={"bar"}
						key={"bar"}
						style={{
							labels: { fontSize: 6, textAlign: "center" }
						}}
						colorscale={this.props.theme.colorscale}
						title={group.title}
						data={group.data}
						labels={d => `${d.y}%`}
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
					className="BarLegend"
					theme={this.props.theme}
					name="legend"
					data={this.makeLegend(this.state.data)}
					orientation="horizontal"
					itemsPerRow={5}
					height={24}
					style={{
						title: { fontSize: 12, fontWeight: "bold" },
						labels: { fontSize: 8 }
					}}
					labelComponent={
						<VictoryLabel
							labelPlacement="vertical"
							textAnchor="start"
						/>
					}
				/>
				<VictoryChart
					theme={this.props.theme}
					height={this.props.height}
					domain={{ y: [0, 100] }}
				>
					<VictoryGroup
						name="BarGroup"
						categories={{ x: this.state.data.categories }}
						offset={14}
					>
						{groups()}
					</VictoryGroup>
				</VictoryChart>
			</div>
		);
	}
}

export default GroupedBars;
