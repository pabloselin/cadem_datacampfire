import React, { Component } from "react";
import DownloadButton from "../mini/DownloadButton.js";
import Title from "../mini/Title.js";
import {
	VictoryPie,
	VictoryLegend,
	VictorySharedEvents,
	VictoryLabel,
	VictoryContainer,
	VictoryGroup,
	Point
} from "victory";

class PieFour extends Component {
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
			svgrefs: [],
			legendSize: 32
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
						fontSize: this.state.legendSize + 1,
						fontColor: this.state.activeColor
					};
				} else {
					return {
						fill: this.props.colorscale[idx],
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
			svgrefs: [this.viewBox, this.legendref]
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
				return this.props.colorscale[key];
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
						},
						{
							childName: "legend",
							target: "labels",
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
					<svg height={40}>
						<Title
							title={this.state.title}
							subtitle={this.state.subtitle}
							fontSizeTop={15}
							fontSizeBottom={13.5}
							dy1={15}
							dy2={21}
						/>
					</svg>

					<div
						style={{
							display: "flex",
							flexWrap: "wrap"
						}}
					>
						<VictoryGroup
							style={{
								parent: { maxWidth: "65%", marginTop: "80px" }
							}}
						>
							<svg viewBox={"0 0 400 400"}>
								<VictoryPie
									ref={Pie => (this.Pie = Pie)}
									theme={this.props.theme}
									name="pie"
									style={{
										data: {
											fill: d => piecolor(d.eventKey),
											cursor: "pointer"
										}
									}}
									padAngle={0}
									innerRadius={85}
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

								<VictoryLabel
									className="percent"
									theme={this.props.theme}
									animate={{ duration: 500 }}
									text={percentPortal()}
									textAnchor="middle"
									verticalAnchor="middle"
									x={200}
									y={200}
									style={{
										fontSize: 48,
										fill: this.state.activeColor,
										fontFamily: "Asap",
										fontWeight: "700"
									}}
									ref={percent => (this.percent = percent)}
								/>
							</svg>
						</VictoryGroup>
						<VictoryLegend
							theme={this.props.theme}
							name="legend"
							centerTitle
							orientation="vertical"
							borderPadding={{ top: 150 }}
							width={300}
							height={700}
							style={{
								data: { cursor: "pointer" },
								labels: {
									cursor: "pointer",
									fontFamily: "Asap",
									fontSize: this.state.legendSize
								},
								parent: { maxWidth: "35%" }
							}}
							data={this.makeLegend(this.state.data)}
							dataComponent={<Point size={16} />}
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
					data={this.props.data}
					fields={[
						{ label: "Tipo", value: "x" },
						{ label: "Porcentaje", value: "y" }
					]}
					unwind={["data"]}
				/>
			</div>
		);
	}
}

export default PieFour;
