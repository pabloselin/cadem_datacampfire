import React, { Component } from "react";
import DownloadButton from "../mini/DownloadButton.js";
import Title from "../mini/Title.js";
import GroupedBarsCols from "../cols/GroupedBarsCols.js";
import {
	VictoryChart,
	VictoryBar,
	VictoryGroup,
	VictoryLegend,
	VictoryLabel,
	VictoryAxis,
	VictorySharedEvents,
	VictoryContainer,
	VictoryTooltip,
	Flyout,
	Point
} from "victory";

class GroupedBarsFour extends Component {
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
			activeBarFontSize: 12,
			barWidth: 14,
			barOffset: 20,
			domainPadding: { x: 60, y: 0 }
		};
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
						fontSize: this.state.activeBarFontSize,
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
			fontSize: 14,
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
													fontSize: this.state
														.activeBarFontSize,
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
								width: this.state.barWidth,
								fill: (d, active) =>
									this.getCurFill(group.title, idx, active)
							}
						}}
						labelComponent={
							<VictoryLabel
								style={{
									fill: (d, active) =>
										this.getLabelState(
											group.title,
											idx,
											active
										),
									fontWeight: "bold",
									fontSize: this.state.activeBarFontSize
								}}
								text={d => `${d.y}%`}
							/>
						}
					/>
				);
			});

		return (
			<div className="chart-widget">
				<VictorySharedEvents events={events}>
					<VictoryLegend
						title={[
							this.state.title.toUpperCase(),
							this.state.subtitle
						]}
						titleOrientation="top"
						theme={this.props.theme}
						name="legend"
						data={this.makeLegend(this.state.data)}
						orientation="horizontal"
						itemsPerRow={3}
						gutter={20}
						height={78}
						labelComponent={
							<VictoryLabel y={66} style={legendLabelStyle} />
						}
						dataComponent={
							<Point size={8} y={66} style={legendDataStyle} />
						}
						titleComponent={
							<Title
								title={this.state.title}
								subtitle={this.state.subtitle}
								fontSizeTop={20}
								fontSizeBottom={18}
								dy1={15}
								dy2={25}
							/>
						}
					/>
					<GroupedBarsCols
						padding={{
							top: 30,
							left: 50,
							right: 50,
							bottom: 25
						}}
						width={400}
						height={320}
						theme={this.props.theme}
						domainPadding={this.state.domainPadding}
						domain={{ y: [0, 100] }}
						tickLabels={{ tickLabels: { fontSize: 14 } }}
						tickValues={[1, 2]}
						tickLabelsFontSize={16}
						categories={this.state.data.categories}
						offset={this.state.barOffset}
					>
						{groups()}
					</GroupedBarsCols>
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

export default GroupedBarsFour;
