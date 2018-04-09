import React, { Component } from "react";
import "./GroupedBars.css";
import jsondata from "../data/barras.json";
import ChartHeader from "./mini/ChartHeader.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryGroup,
	VictoryLegend,
	VictoryLabel,
	VictoryAxis
} from "victory";

class GroupedBars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: jsondata.chart_title,
			data: jsondata,
			activeKey: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false
		};
	}

	makeLegend(data) {
		let legData = data.data.map((item, idx) => {
			let fill = () => {
				if (item.title === this.state.activeKey) {
					return this.state.activeColor;
				} else {
					return this.props.theme.bar.colorScale[idx];
				}
			};
			return {
				name: item.title,
				symbol: {
					fill: fill()
				}
			};
		});

		return legData;
	}

	render() {
		const groups = () =>
			this.state.data.data.map((group, idx) => {
				return (
					<VictoryBar
						key={"bar-" + idx}
						colorscale={this.props.theme.colorscale}
						title={group.title}
						data={group.data}
						labelComponent={
							<VictoryLabel
								style={{
									display: "none",
									fontSize: 6,
									fill: "transparent"
								}}
								text={d => `${d.y}%`}
							/>
						}
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
					domainPadding={{ x: 40, y: 0 }}
				>
					<VictoryAxis />
					<VictoryAxis dependentAxis />
					<VictoryGroup
						name="BarGroup"
						categories={{ x: this.state.data.categories }}
						offset={14}
						events={[
							{
								childName: "all",
								target: "data",
								eventHandlers: {
									onMouseOver: (evt, obj, idx) => {
										this.setState({
											activeKey: obj.data[0].label
										});
										return [
											{
												target: "data",
												mutation: props => ({
													style: Object.assign(
														{},
														props.style,
														{
															fill: this.state
																.activeColor
														}
													)
												})
											},
											{
												target: "labels",
												mutation: props => ({
													style: Object.assign(
														{},
														props.style,
														{
															fontSize: 6,
															fill: this.state
																.activeColor
														}
													)
												})
											}
										];
									},
									onClick: (evt, obj, idx) => {
										this.setState({
											activeKey: obj.data[0].label,
											clicked: true
										});
										return [
											{
												target: "data",
												mutation: props => ({
													style: Object.assign(
														{},
														props.style,
														{
															fill: this.state
																.activeColor
														}
													)
												})
											},
											{
												target: "labels",
												mutation: props => ({
													style: Object.assign(
														{},
														props.style,
														{
															display: "block",
															fill: this.state
																.activeColor
														}
													)
												})
											}
										];
									},
									onMouseOut: () => {
										this.setState({ activeKey: null });
										return [
											{
												target: "data",
												mutation: props => null
											},
											{
												target: "labels",
												mutation: props => null
											}
										];
									}
								}
							}
						]}
					>
						{groups()}
					</VictoryGroup>
				</VictoryChart>
			</div>
		);
	}
}

export default GroupedBars;
