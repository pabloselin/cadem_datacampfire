import React, { Component } from "react";
import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryPie,
	VictoryLegend,
	VictorySharedEvents,
	VictoryLabel,
	VictoryContainer,
	VictoryGroup
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
						fontSize: 24,
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
						}
					]}
				>
					<VictoryLabel
						theme={this.props.theme}
						text={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						style={[
							{
								fontFamily: "Asap",
								fontSize: 15,
								fontWeight: "bold",
								display: "block"
							},
							{
								fontFamily: "Asap",
								fontSize: 13.5,
								fontWeight: "normal",
								display: "block"
							}
						]}
					/>
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
						>
							<VictoryPie
								ref={Pie => (this.Pie = Pie)}
								theme={this.props.theme}
								name="pie"
								style={{
									data: {
										fill: d => piecolor(d.eventKey)
									}
								}}
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

							<VictoryLabel
								className="percent"
								theme={this.props.theme}
								animate={{ duration: 500 }}
								text={percentPortal()}
								textAnchor="middle"
								verticalAnchor="middle"
								x={this.props.width / 2}
								y={this.props.height / 2}
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
							rowGutter={-15}
							style={{
								labels: {
									fontFamily: "Asap",
									fontSize: 24
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

export default Pie;
