import React, { Component } from "react";
import "./GroupedBars.css";
import jsondata from "../data/barras_single.json";
import ChartHeader from "./mini/ChartHeader.js";
import { VictoryChart, VictoryBar, VictoryLabel } from "victory";

class SingleBars extends Component {
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
					height={this.props.height}
					width={this.props.width}
					domainPadding={{ y: 0, x: 40 }}
				>
					<VictoryBar
						domain={{ y: [0, 100] }}
						key={"bar"}
						theme={this.props.theme}
						title={this.state.title}
						data={this.state.data.data}
						style={{
							labels: { fontSize: 10, textAlign: "center" },
							data: {
								width: 18,
								fill: d =>
									this.props.theme.bar.colorScale[d.eventKey]
							}
						}}
						alignment="middle"
						barRatio={0.2}
						labelComponent={
							<VictoryLabel
								style={{
									fill: "transparent"
								}}
								text={d => `${d.y}%`}
							/>
						}
						events={[
							{
								childName: "all",
								target: "data",
								eventHandlers: {
									onMouseOver: (evt, obj, idx) => {
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
									onClick: (evt, obj, idx) => {
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
					/>
				</VictoryChart>
			</div>
		);
	}
}

export default SingleBars;
