import React, { Component } from "react";
import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryChart,
	VictoryScatter,
	VictoryLegend,
	VictoryAxis,
	VictoryContainer,
	Point,
	VictoryLabel,
	VictoryTooltip,
	VictorySharedEvents
} from "victory";

class Scatter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.data.chart_title,
			subtitle: this.props.data.chart_subtitle,
			data: this.props.data.data,
			activeColor: this.props.theme.interactions.hover,
			colorscale: this.props.theme.line.colorScale,
			activeKey: null,
			activeCat: null,
			domainX: this.props.data.domainX,
			domainY: this.props.data.domainY,
			svgrefs: []
		};
	}

	makeLegend(data) {
		let legend = data.map((item, idx) => {
			return {
				name: item.title,
				symbol: { fill: this.state.colorscale[idx] }
			};
		});
		return legend;
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.containerRef]
		});
	}

	getCurFill(cat, index, active) {
		if (this.state.activeCat === cat || active === true) {
			return this.state.activeColor;
		} else {
			return this.state.colorscale[index];
		}
	}

	render() {
		const scatters = () =>
			this.state.data.map((local, idx) => {
				return (
					<VictoryScatter
						padding={{ top: 50 }}
						width={this.props.width}
						height={this.props.height}
						key={"scatter-" + idx}
						style={{
							data: {
								fill: (d, active) =>
									this.getCurFill(local.title, idx, active)
							}
						}}
						data={local.data}
						bubbleProperty="cantidad"
						maxBubbleSize={15}
						minBubbleSize={5}
						labels={d =>
							`${d.x}% Recomendación\n${d.y}% Satisfacción \n${
								d.cantidad
							} Cartera`
						}
						labelComponent={
							<VictoryTooltip
								theme={this.props.theme}
								horizontal={true}
								activateData={true}
							/>
						}
					/>
				);
			});

		return (
			<div className="chart-widget">
				<VictorySharedEvents
					events={[
						{
							childName: "all",
							eventHandlers: {
								onClick: (evt, obj, key) => {
									return [
										{
											target: "data",
											mutation: props => {
												return Object.assign(
													{},
													props.style,
													{
														style: {
															fill: this.state
																.activeColor
														}
													}
												);
											}
										}
									];
								}
							}
						},
						{
							childName: "legend",
							eventHandlers: {
								onMouseOver: (evt, obj, key) => {
									if (obj.datum !== undefined) {
										this.setState({
											activeCat: obj.datum.name
										});
									}

									return [
										{
											target: "data",
											mutation: props => {
												return Object.assign(
													{},
													props.style,
													{
														style: {
															fill: this.state
																.activeColor
														}
													}
												);
											}
										},
										{
											target: "labels",
											mutation: props => {
												return Object.assign(
													{},
													props.style,
													{
														style: {
															fill: this.state
																.activeColor,
															fontWeight: "bold",
															fontSize: 12,
															fontFamily: "Asap"
														}
													}
												);
											}
										}
									];
								},
								onMouseOut: (evt, obj, key) => {
									this.setState({ activeCat: null });
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
					<VictoryChart
						theme={this.props.theme}
						width={this.props.width}
						height={this.props.height}
						domainPadding={40}
						containerComponent={
							<VictoryContainer
								containerRef={containerRef =>
									(this.containerRef = containerRef)
								}
							/>
						}
					>
						<VictoryAxis domain={this.state.domainX} />
						<VictoryAxis
							domain={this.state.domainY}
							dependentAxis
						/>

						<VictoryLegend
							title={[
								this.state.title.toUpperCase(),
								this.state.subtitle
							]}
							titleOrientation="top"
							gutter={10}
							padding={{ bottom: 100 }}
							theme={this.props.theme}
							name="legend"
							data={this.makeLegend(this.state.data)}
							orientation="horizontal"
							itemsPerRow={4}
							style={{
								labels: { fontSize: 12, fontWeight: "normal" }
							}}
							dataComponent={<Point y={40} />}
							labelComponent={<VictoryLabel y={40} />}
							titleComponent={
								<VictoryLabel
									style={[
										{
											fontSize: 14,
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
						{scatters()}
					</VictoryChart>
				</VictorySharedEvents>
				<DownloadButton
					type="scatter"
					svgs={this.state.svgrefs}
					title={this.state.title}
					subtitle={this.state.subtitle}
					percent={this.state.currentPercent}
				/>
			</div>
		);
	}
}

export default Scatter;
