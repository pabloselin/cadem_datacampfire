import React, { Component } from "react";
import "./Pie.css";
import DownloadButton from "./mini/DownloadButton.js";
import ChartHeader from "./mini/ChartHeader.js";
import {
	VictoryPie,
	VictoryLegend,
	VictorySharedEvents,
	VictoryLabel,
	VictoryContainer,
	VictoryGroup
} from "victory";

class KPI_Semicirculo extends Component {
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
			colorscale: this.props.theme.pie.colorScale,
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
				name: item.x,
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
			<div className="Pie chart-widget">
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
					<div
						style={{
							display: "flex",
							flexWrap: "wrap"
						}}
					>
						<VictoryGroup
							style={{
								parent: { maxWidth: "65%", marginTop: 12 }
							}}
							width={290}
						>
							<svg viewBox="0 0 260 260">
								<VictoryPie
									width={260}
									height={260}
									ref={Pie => (this.Pie = Pie)}
									theme={this.props.theme}
									name="pie"
									style={{
										data: {
											fill: d => piecolor(d.eventKey)
										}
									}}
									startAngle={90}
									endAngle={-90}
									padAngle={0}
									innerRadius={65}
									data={this.getData(this.state.data)}
									standalone={false}
									labels={d => ""}
									containerComponent={
										<VictoryContainer
											containerRef={pieref =>
												(this.pieref = pieref)
											}
										/>
									}
								/>
							</svg>
							<VictoryLabel
								className="percent"
								theme={this.props.theme}
								animate={{ duration: 500 }}
								text={percentPortal()}
								textAnchor="middle"
								verticalAnchor="middle"
								x={140}
								y={150}
								style={{
									fontSize: 42,
									fill: this.state.activeColor,
									fontFamily: "Asap",
									fontWeight: "bold"
								}}
								ref={percent => (this.percent = percent)}
							/>
						</VictoryGroup>
						<VictoryLegend
							theme={this.props.theme}
							name="legend"
							centerTitle
							orientation="vertical"
							borderPadding={{ top: 40 }}
							rowGutter={{ top: 0, bottom: 0 }}
							width={200}
							height={400}
							style={{
								labels: {
									fontFamily: "Asap",
									fontSize: 20
								},
								parent: { maxWidth: "35%" }
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
					</div>
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

export default KPI_Semicirculo;
