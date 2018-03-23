import React, { Component } from "react";
import "./Pie.css";

import {
	VictoryPie,
	VictoryLegend,
	VictorySharedEvents,
	VictoryLabel,
	VictoryPortal
} from "victory";

class Pie extends Component {
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
		const percentPortal = () => {
			if (this.state.currentPercent !== 0) {
				return (
					<VictoryPortal className="percent">
						<VictoryLabel
							theme={this.props.theme}
							animate={{ duration: 500 }}
							text={this.state.currentPercent + "%"}
							style={{
								fontSize: 64,
								color: "#1abc9c",
								fontFamily: "Asap, sans-serif",
								fontWeight: 400
							}}
						/>
					</VictoryPortal>
				);
			}
		};
		return (
			<div className="Pie">
				<VictorySharedEvents
					events={[
						{
							childName: ["pie", "legend"],
							target: "data",
							eventHandlers: {
								onMouseOver: () => {
									return [
										{
											childName: ["pie", "legend"],
											mutation: props => {
												this.setState({
													currentPercent:
														props.datum.percent
												});
												return {
													style: Object.assign(
														{},
														props.style,
														{ fill: "#1abc9c" }
													)
												};
											}
										}
									];
								},
								onMouseOut: () => {
									return [
										{
											childName: ["pie", "legend"],
											mutation: () => {
												this.setState({
													currentPercent: 0
												});
												return null;
											}
										}
									];
								}
							}
						}
					]}
				>
					<VictoryPie
						theme={this.props.theme}
						animate={{ duration: 500 }}
						name="pie"
						style={{
							parent: { maxWidth: "60%" }
						}}
						width={480}
						padAngle={0}
						innerRadius={100}
						data={this.getData(this.props.data)}
						standalone={true}
					/>
					{percentPortal()}
					<VictoryLegend
						theme={this.props.theme}
						name="legend"
						title={this.props.title}
						centerTitle
						orientation="vertical"
						borderPadding={{ top: 40 }}
						gutter={0}
						height={600}
						style={{
							title: { fontSize: 24, fontWeight: "bold" },
							labels: { fontSize: 22 },
							parent: { maxWidth: "40%" }
						}}
						data={this.makeLegend(this.props.data)}
					/>
				</VictorySharedEvents>
			</div>
		);
	}
}

export default Pie;
