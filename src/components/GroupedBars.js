import React, { Component } from "react";
import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryGroup,
	VictoryLegend,
	VictoryLabel,
	VictoryAxis,
	VictoryContainer,
	Point
} from "victory";

class GroupedBars extends Component {
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

	componentDidMount() {
		this.setState({
			svgrefs: [this.containerRef]
		});
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
			<div className="chart-widget">
				<VictoryChart
					theme={this.props.theme}
					height={this.props.height}
					domain={{ y: [0, 100] }}
					domainPadding={{ x: 40, y: 0 }}
					containerComponent={
						<VictoryContainer
							containerRef={containerRef =>
								(this.containerRef = containerRef)
							}
						/>
					}
				>
					<VictoryLegend
						title={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						width={this.props.width}
						titleOrientation="left"
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="vertical"
						itemsPerRow={1}
						height={60}
						style={{
							title: { fontSize: 12, fontWeight: "bold" },
							labels: { fontSize: 8 }
						}}
						labelComponent={<VictoryLabel y={12} />}
						dataComponent={<Point y={12} />}
						titleComponent={
							<VictoryLabel
								style={[
									{ fontSize: 10 },
									{ fontSize: 6, fontWeight: "normal" }
								]}
							/>
						}
					/>
					<VictoryAxis
						theme={this.props.theme}
						style={{
							tickLabels: {
								fontSize: 6
							}
						}}
					/>
					<VictoryAxis
						dependentAxis
						theme={this.props.theme}
						style={{
							tickLabels: {
								fontSize: 6
							}
						}}
					/>
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
				<DownloadButton
					type="groupedbars"
					svgs={this.state.svgrefs}
					title={this.state.title}
					subtitle={this.state.subtitle}
					percent={this.state.currentPercent}
				/>
			</div>
		);
	}
}

export default GroupedBars;
