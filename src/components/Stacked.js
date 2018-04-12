import React, { Component } from "react";
import "./Stacked.css";
import ChartHeader from "./mini/ChartHeader.js";
import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryStack,
	VictoryLabel,
	VictoryAxis,
	VictoryContainer,
	VictoryLegend,
	Point
} from "victory";

class Stacked extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data,
			activeKey: null,
			activeColor: this.props.theme.interactions.hover,
			clicked: false,
			svgrefs: []
		};
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.containerRef]
		});
	}

	makeLegend() {
		return this.state.data.data.map(item => {
			return {
				name: item.title
			};
		});
	}

	render() {
		const events = [
			{
				childName: "all",
				target: "data",
				eventHandlers: {
					onMouseOver: (evt, obj, idx) => {
						return [
							{
								target: "data",
								mutation: props => ({
									style: Object.assign({}, props.style, {
										fill: this.state.activeColor
									})
								})
							},
							{
								target: "labels",
								mutation: props => ({
									style: Object.assign({}, props.style, {
										fill: this.state.activeColor
									})
								})
							}
						];
					},
					onClick: (evt, obj, idx) => {
						return [
							{
								target: "data",
								mutation: props => ({
									style: Object.assign({}, props.style, {
										fill: this.state.activeColor
									})
								})
							},
							{
								target: "labels",
								mutation: props => ({
									style: Object.assign({}, props.style, {
										fill: this.state.activeColor
									})
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
		];

		const bars = () =>
			this.state.data.data.map((bar, idx) => {
				const offset = d => {
					let dy = 0;
					if (idx === 0) {
						dy = -this.state.data.data[1].data[d.eventKey].y * 2;
					}
					return dy;
				};
				return (
					<VictoryBar
						key={"bar-" + idx}
						theme={this.props.theme}
						title={bar.title}
						data={bar.data}
						alignment="middle"
						barRatio={0.2}
						colorscale={this.props.theme.colorscale}
						labelComponent={
							<VictoryLabel
								style={{ fill: "transparent" }}
								dy={d => offset(d)}
								text={d => `${d.y}%`}
							/>
						}
						events={events}
					/>
				);
			});

		const labels = () => this.state.data.data[0].data.map(item => item.x);
		return (
			<div className="chart-widget">
				<VictoryChart
					theme={this.props.theme}
					height={this.props.height}
					width={this.props.width}
					domainPadding={{ y: 0, x: 40 }}
					containerComponent={
						<VictoryContainer
							containerRef={containerRef =>
								(this.containerRef = containerRef)
							}
						/>
					}
				>
					<VictoryAxis
						key="x"
						tickValues={labels()}
						tickLabelComponent={
							<VictoryLabel dy={-4} dx={-14} angle={-45} />
						}
					/>
					<VictoryAxis key="y" dependentAxis />
					<VictoryStack
						domain={{ y: [0, 100] }}
						labels={["ene", "feb", "mar", "abr", "may"]}
						style={{
							labels: { fontSize: 10, textAlign: "center" },
							data: {
								width: 18
							}
						}}
					>
						{bars()}
					</VictoryStack>
					<VictoryLegend
						title={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						x={this.props.width - 220}
						width={this.props.width}
						titleOrientation="left"
						gutter={20}
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="horizontal"
						itemsPerRow={3}
						height={60}
						style={{
							labels: { fontSize: 12 }
						}}
						titleComponent={
							<VictoryLabel
								dx={-360}
								style={[
									{
										fontSize: 16,
										fontWeight: "bold"
									},
									{
										fontSize: 12,
										fontWeight: "normal"
									}
								]}
							/>
						}
					/>
				</VictoryChart>

				<DownloadButton
					type="stacked"
					svgs={this.state.svgrefs}
					title={this.state.title}
					subtitle={this.state.subtitle}
					percent={this.state.currentPercent}
				/>
			</div>
		);
	}
}

export default Stacked;
