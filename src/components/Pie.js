import React, { Component } from "react";
import "./Pie.css";
import DownloadButton from "./mini/DownloadButton.js";
import ChartHeader from "./mini/ChartHeader.js";
import {
	VictoryPie,
	VictoryLegend,
	VictorySharedEvents,
	VictoryLabel,
	VictoryContainer
} from "victory";

class Pie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data.data,
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			currentPercent: 0,
			activeColor: this.props.theme.interactions.active,
			clicked: false,
			activeKey: undefined,
			colorscale: this.props.theme.line.colorScale,
			svgrefs: []
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
						fontSize: 18.6,
						fontColor: this.state.activeColor
					};
				} else {
					return {
						fill: this.state.colorscale[idx],
						fontWeight: "normal",
						fontColor: "#555"
					};
				}
			};
			return {
				name: item.x + " (" + percent.toFixed(1) + "%)",
				percent: percent.toFixed(1),
				symbol: { fill: activeStyle().fill },
				labels: {
					fontWeight: activeStyle().fontWeight,
					fontSize: activeStyle().fontSize,
					fill: activeStyle().fontColor
				}
			};
		});
		return legData;
	}

	getData(data) {
		return data;
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.pieref, this.legendref, this.percent]
		});
	}

	render() {
		const percentPortal = () => {
			if (this.state.currentPercent !== 0) {
				return this.state.currentPercent + "%";
			}
		};

		const piecolor = key => {
			if (Number(this.state.activeKey) === key) {
				return this.state.activeColor;
			} else {
				return this.state.colorscale[key];
			}
		};

		const clicked = key => {
			if (
				this.state.clicked === true &&
				Number(this.state.activeKey) === Number(key)
			) {
				return false;
			} else {
				return true;
			}
		};
		return (
			<div className="Pie">
				<ChartHeader
					title={this.state.title}
					subtitle={this.state.subtitle}
					className="ChartHeader"
				/>
				<VictorySharedEvents
					className="pieWrapper"
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
									return [
										{
											childName: ["pie", "legend"],
											mutation: props => {
												this.setState({
													currentPercent:
														props.datum.percent,
													clicked: clicked(key),
													activeKey: Number(key)
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
						ref={Pie => (this.Pie = Pie)}
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
						innerRadius={70}
						data={this.getData(this.state.data)}
						standalone={true}
						labels={d => ""}
						containerComponent={
							<VictoryContainer
								containerRef={pieref => (this.pieref = pieref)}
							/>
						}
					/>
					<VictoryLabel
						className="percent"
						theme={this.props.theme}
						animate={{ duration: 500 }}
						text={percentPortal()}
						style={{
							fontSize: 48,
							color: this.state.activeColor,
							fontFamily: "Asap",
							fontWeight: 400
						}}
						ref={percent => (this.percent = percent)}
					/>
					<VictoryLegend
						theme={this.props.theme}
						name="legend"
						centerTitle
						orientation="vertical"
						borderPadding={{ top: 40 }}
						gutter={0}
						height={600}
						style={{
							labels: {
								fontFamily: "Asap",
								fontSize: 20
							},
							parent: { maxWidth: "40%" }
						}}
						data={this.makeLegend(this.state.data)}
						containerComponent={
							<VictoryContainer
								containerRef={legendref =>
									(this.legendref = legendref)
								}
							/>
						}
					/>
				</VictorySharedEvents>
				<DownloadButton
					type="pie"
					svgs={this.state.svgrefs}
					title={this.state.title}
					subtitle={this.state.subtitle}
				/>
			</div>
		);
	}
}

export default Pie;
