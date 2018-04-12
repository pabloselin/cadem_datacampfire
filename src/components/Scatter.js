import React, { Component } from "react";
import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryChart,
	VictoryScatter,
	VictoryLegend,
	VictoryAxis,
	VictoryContainer,
	Point,
	VictoryLabel
	//VictoryTooltip
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
		console.log(legend);
		return legend;
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.containerRef]
		});
	}

	render() {
		const scatters = () =>
			this.state.data.map((local, idx) => {
				return (
					<VictoryScatter
						key={local.title}
						style={{ data: { fill: this.state.colorscale[idx] } }}
						data={local.data}
						bubbleProperty="cantidad"
						maxBubbleSize={15}
						minBubbleSize={5}
					/>
				);
			});
		return (
			<div className="chart-widget">
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
					<VictoryAxis />
					<VictoryAxis dependentAxis />
					{scatters()}
					<VictoryLegend
						title={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						width={this.props.width}
						titleOrientation="top"
						gutter={10}
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="horizontal"
						itemsPerRow={4}
						height={120}
						style={{
							labels: { fontSize: 12 }
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
				</VictoryChart>
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
