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
			currentPercent: 0,
			activeColor: this.props.theme.interactions.active,
			clicked: false,
			activeKey: undefined,
			colorscale: this.props.theme.line.colorScale
		};
	}

	makeLegend(data) {
		let sum = 0;
		data.map(item => {
			sum += Number(item.y);
			return true;
		});

		let legData = data.map((item, idx) => {
			let percent = Number(item.y) / sum * 100;
			let activeStyle = () => {
				if (idx === Number(this.state.activeKey)) {
					return {
						fill: this.state.activeColor,
						fontWeight: "bold",
						fontSize: 23
					};
				} else {
					return {
						fill: this.state.colorscale[idx],
						fontWeight: "normal"
					};
				}
			};
			return {
				name: item.x + " (" + percent.toFixed(1) + "%)",
				percent: percent.toFixed(1),
				symbol: { fill: activeStyle().fill },
				labels: {
					fontWeight: activeStyle().fontWeight,
					fontSize: activeStyle().fontSize
				}
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
								color: this.state.activeColor,
								fontFamily: "Asap, sans-serif",
								fontWeight: 400
							}}
						/>
					</VictoryPortal>
				);
			}
		};

		const piecolor = key => {
			if (Number(this.state.activeKey) === key) {
				return this.state.activeColor;
			} else {
				return this.state.colorscale[key];
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
								onMouseOver: (evt, obj, key) => {
									if (this.state.clicked === false) {
										return [
											{
												childName: ["pie", "legend"],
												mutation: props => {
													this.setState({
														currentPercent:
															props.datum.percent,
														activeKey: key
													});
												}
											}
										];
									}
								},
								onMouseOut: () => {
									if (this.state.clicked === false) {
										return [
											{
												childName: ["pie", "legend"],
												mutation: () => {
													this.setState({
														currentPercent: 0,
														activeKey: undefined
													});
													return null;
												}
											}
										];
									}
								},
								onClick: (evt, obj, key) => {
									this.setState({
										clicked: () =>
											Number(this.state.activeKey) ===
											Number(key)
												? false
												: true,
										activeKey: Number(key)
									});
									return [
										{
											childName: ["pie", "legend"],
											mutation: props => {
												this.setState({
													currentPercent:
														props.datum.percent
												});
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
							parent: { maxWidth: "60%" },
							data: {
								fill: d => piecolor(d.eventKey)
							}
						}}
						width={480}
						padAngle={0}
						innerRadius={100}
						data={this.getData(this.props.data)}
						standalone={true}
						labels={d => ""}
					/>
					{percentPortal()}
					<VictoryLegend
						theme={this.props.theme}
						name="legend"
						centerTitle
						orientation="vertical"
						borderPadding={{ top: 40 }}
						gutter={0}
						height={600}
						style={{
							title: { fontSize: 22, fontWeight: "bold" },
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
