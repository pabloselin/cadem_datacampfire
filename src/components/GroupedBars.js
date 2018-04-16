import React, { Component } from "react";
import DownloadButton from "./mini/DownloadButton.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryGroup,
	VictoryLegend,
	VictoryLabel,
	VictoryAxis,
	VictorySharedEvents,
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
			activeCat: null,
			activeColor: this.props.theme.interactions.hover,
			isLegendClicked: false,
			clickedBar: false,
			activeClickedBar: null,
			svgrefs: [],
			domainY: [0, 100],
			domainX: [0, 100],
			fontSizes: this.fontSizes(this.props.columns)
		};
	}

	fontSizes(columns) {
		if (columns === 4) {
			return {
				active: 8,
				label: 10,
				barLabel: 10,
				legend: [16, 13],
				legendLabel: 20,
				ticks: 12
			};
		} else if (columns === 6) {
			return {
				active: 8,
				label: 10,
				barLabel: 10,
				legend: [13, 11],
				legendLabel: 10,
				ticks: 12
			};
		} else if (columns === 12) {
			return {
				active: 8,
				label: 10,
				barLabel: 10,
				legend: [13, 11],
				legendLabel: 8,
				ticks: 12
			};
		}
	}

	makeLegend(data) {
		let legData = data.data.map((item, idx) => {
			let fill = () => {
				if (item.title === this.state.activeKey) {
					return this.state.activeColor;
				} else {
					return this.props.colorscale[idx];
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

	getCurFill(cat, index, active) {
		if (this.state.activeCat === cat) {
			return this.state.activeColor;
		} else {
			return this.props.colorscale[index];
		}
	}

	getLabelState(cat, index, active) {
		if (this.state.activeCat === cat) {
			return this.state.activeColor;
		} else {
			return "transparent";
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.columns !== this.props.columns) {
			this.setState({
				fontSizes: this.fontSizes(this.props.columns)
			});
		}
	}

	render() {
		const activeStyle = [
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
						display: "block",
						fill: this.state.activeColor,
						fontSize: this.state.fontSizes.active,
						fontWeight: "bold"
					})
				})
			}
		];
		const normalStyle = [
			{
				target: "data",
				mutation: props => null
			},
			{
				target: "labels",
				mutation: props => null
			}
		];

		const legendLabelStyle = {
			fontSize: this.state.fontSizes.legendLabel,
			fontFamily: "Asap",
			fontWeight: a => {
				if (this.state.activeCat === a.name) {
					return "bold";
				} else {
					return "normal";
				}
			},
			fill: a => {
				if (this.state.activeCat === a.name) {
					return this.state.activeColor;
				} else {
					return "#555";
				}
			}
		};

		const legendDataStyle = {
			fill: a => {
				if (this.state.activeCat === a.name) {
					return this.state.activeColor;
				} else {
					return a.symbol.fill;
				}
			}
		};

		const events = [
			{
				childName: "all",
				target: "data",
				eventHandlers: {
					onMouseOver: (evt, obj, idx) => {
						console.log("over");
						let activeCat = obj.data[0].cat;
						let activeBar = `${obj.datum.cat}-${idx}`;
						this.setState({
							activeKey: activeCat,
							activeBar: activeBar
						});
						return activeStyle;
					},
					onClick: (evt, obj, idx) => {
						let clicked = `${obj.datum.cat}-${idx}`;
						if (this.state.clickedBar !== true) {
							this.setState({
								clickedBar: true,
								activeClickedBar: clicked
							});
							return activeStyle;
						} else {
							if (this.state.activeClickedBar === clicked) {
								this.setState({
									clickedBar: false,
									activeClickedBar: null
								});
								return normalStyle;
							} else {
								this.setState({
									clickedBar: true,
									activeClickedBar: clicked
								});
								return [
									{
										target: "data",
										eventKey: "all",
										childName: "all",
										mutation: props => null
									},
									{
										target: "labels",
										eventKey: "all",
										childName: "all",
										mutation: props => null
									},
									{
										target: "data",
										mutation: props => ({
											style: Object.assign(
												{},
												props.style,
												{
													fill: this.state.activeColor
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
														.activeColor,
													fontSize: 8,
													fontWeight: "bold"
												}
											)
										})
									}
								];
							}
						}
					},
					onMouseOut: (evt, obj, idx) => {
						if (obj.datum.cat !== undefined) {
							let clickedthing = `${obj.datum.cat}-${idx}`;
							if (this.state.activeClickedBar !== clickedthing) {
								this.setState({
									activeKey: null,
									activeBar: null
								});
								return normalStyle;
							}
						}
					}
				}
			},
			{
				childName: "legend",
				target: "data",
				eventHandlers: {
					onClick: (evt, obj, key) => {
						if (obj.datum !== undefined) {
							let refName = obj.datum.name;
							if (this.state.isLegendClicked !== true) {
								this.setState({
									activeCat: refName,
									isLegendClicked: true
								});
							} else {
								//Está cliqueada una leyenda
								if (this.state.activeCat === refName) {
									this.setState({
										activeCat: null,
										isLegendClicked: false
									});
								} else {
									this.setState({ activeCat: refName });
								}
							}
						}
					},
					onMouseOver: (evt, obj, key) => {
						if (this.state.isLegendClicked !== true) {
							if (obj.datum !== undefined) {
								this.setState({
									activeCat: obj.datum.name
								});
							}
						}
					},
					onMouseOut: (evt, obj, key) => {
						if (this.state.isLegendClicked !== true) {
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
			}
		];

		const groups = () =>
			this.state.data.data.map((group, idx) => {
				return (
					<VictoryBar
						name={group.title}
						theme={this.props.theme}
						key={"bar-" + idx}
						colorscale={this.props.colorscale}
						title={group.title}
						data={group.data}
						style={{
							data: {
								width: 10,
								fill: (d, active) =>
									this.getCurFill(group.title, idx, active)
							}
						}}
						labelComponent={
							<VictoryLabel
								style={{
									fontSize: this.state.fontSizes.label,
									fontWeight: "bold",
									fill: (d, active) =>
										this.getLabelState(
											group.title,
											idx,
											active
										)
								}}
								text={d => `${d.y}%`}
							/>
						}
					/>
				);
			});

		const RunLegend = () => {
			if (this.props.columns === 6) {
				return (
					<VictoryLegend
						title={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						titleOrientation="left"
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="vertical"
						itemsPerRow={1}
						gutter={20}
						height={60}
						labelComponent={
							<VictoryLabel style={legendLabelStyle} />
						}
						dataComponent={
							<Point size={5} style={legendDataStyle} />
						}
						titleComponent={
							<VictoryLabel
								style={[
									{
										fontSize: this.state.fontSizes
											.legend[0],
										fontWeight: "bold"
									},
									{
										fontSize: this.state.fontSizes
											.legend[1],
										fontWeight: "normal"
									}
								]}
							/>
						}
					/>
				);
			} else if (this.props.columns === 4) {
				return (
					<VictoryLegend
						titleOrientation="left"
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="vertical"
						itemsPerRow={1}
						gutter={20}
						height={60}
						labelComponent={
							<VictoryLabel style={legendLabelStyle} />
						}
						dataComponent={
							<Point size={5} style={legendDataStyle} />
						}
					/>
				);
			}
		};

		const RunHTMLTitle = () => {
			if (this.props.columns === 4) {
				return (
					<div style={{ padding: "5px" }}>
						<p
							style={{
								fontFamily: "Asap",
								fontSize: 14,
								display: "block",
								margin: 0
							}}
						>
							{this.state.title.toUpperCase()}
						</p>
						<p
							style={{
								margin: 0,
								fontFamily: "Asap",
								fontSize: 12,
								fontWeight: "normal",
								display: "block"
							}}
						>
							{this.state.subtitle}
						</p>
					</div>
				);
			}
		};

		return (
			<div className="chart-widget">
				{RunHTMLTitle()}
				<VictorySharedEvents events={events}>
					{RunLegend()}
					<VictoryChart
						padding={{ top: 10, left: 50, right: 50, bottom: 50 }}
						responsive={false}
						theme={this.props.theme}
						height={this.props.height}
						width={this.props.width}
						domain={{ y: [0, 100] }}
						domainPadding={{ x: 40, y: 0 }}
					>
						<VictoryAxis tickValues={[1, 2, 3, 4]} />
						<VictoryAxis
							style={{
								tickLabels: {
									fontSize: this.state.fontSizes.ticks
								}
							}}
							dependentAxis
						/>

						<VictoryGroup
							name="BarGroup"
							categories={{ x: this.state.data.categories }}
							offset={14}
						>
							{groups()}
						</VictoryGroup>
					</VictoryChart>
				</VictorySharedEvents>
				<DownloadButton
					data={this.props.data}
					type="groupedbars"
					fields={[
						{ label: "Compañía", value: "data.x" },
						{ label: "Tipo", value: "title" },
						{ label: "Porcentaje", value: "data.y" }
					]}
					unwind={["data"]}
				/>
			</div>
		);
	}
}

export default GroupedBars;
