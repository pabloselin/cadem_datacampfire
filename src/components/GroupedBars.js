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
			colorscale: this.props.theme.line.colorScale,
			clicked: false,
			svgrefs: [],
			domainY: [0, 100],
			domainX: [0, 100]
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

	getCurFill(cat, index, active) {
		if (this.state.activeCat === cat || active === true) {
			return this.state.activeColor;
		} else {
			return this.state.colorscale[index];
		}
	}

	getLabelState(cat, index, active) {
		if (this.state.activeCat === cat || active === true) {
			return this.state.activeColor;
		} else {
			return "transparent";
		}
	}

	componentDidMount() {
		this.setState({
			svgrefs: [this.containerRef]
		});
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
						fontSize: 8,
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

		const labelStyle = {
			fontWeight: a => {
				if (
					this.state.clickedKeys.indexOf(a) !== -1 ||
					this.state.activeKey === a
				) {
					return "bold";
				} else {
					return "normal";
				}
			},
			fill: a => {
				if (
					this.state.clickedKeys.indexOf(a) !== -1 ||
					this.state.activeKey === a
				) {
					return this.state.activeColor;
				} else {
					return "#555";
				}
			}
		};

		const legendLabelStyle = {
			fontSize: 8,
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
						if (this.state.clicked !== true) {
							let activeCat = obj.data[0].cat;
							this.setState({
								activeKey: activeCat
							});
							return activeStyle;
						}
					},
					onClick: (evt, obj, idx) => {
						let activeCat = obj.data[0].cat;
						this.setState({
							activeKey: activeCat,
							clicked: true
						});
						return activeStyle;
					},
					onMouseOut: () => {
						if (this.state.clicked !== true) {
							this.setState({ activeKey: null });

							return normalStyle;
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
							if (this.state.clicked !== true) {
								this.setState({
									activeCat: refName,
									clicked: true
								});
							} else {
								//Está cliqueada una leyenda
								if (this.state.activeCat === refName) {
									this.setState({
										activeCat: null,
										clicked: false
									});
								} else {
									this.setState({ activeCat: refName });
								}
							}
						}
					},
					onMouseOver: (evt, obj, key) => {
						if (this.state.clicked !== true) {
							if (obj.datum !== undefined) {
								this.setState({
									activeCat: obj.datum.name
								});
							}
						}
					},
					onMouseOut: (evt, obj, key) => {
						if (this.state.clicked !== true) {
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
						colorscale={this.props.theme.colorscale}
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
									fontSize: 8,
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

		return (
			<div className="chart-widget">
				<VictorySharedEvents events={events}>
					<VictoryChart
						responsive={false}
						theme={this.props.theme}
						height={this.props.height}
						width={this.props.width}
						domain={{ y: [0, 100] }}
						domainPadding={{ x: 40, y: 0 }}
					>
						<VictoryAxis tickValues={[1, 2, 3, 4]} />
						<VictoryAxis dependentAxis />
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
							gutter={0}
							height={60}
							labelComponent={
								<VictoryLabel style={legendLabelStyle} y={12} />
							}
							dataComponent={
								<Point style={legendDataStyle} y={12} />
							}
							titleComponent={
								<VictoryLabel
									style={[
										{ fontSize: 17, fontWeight: "bold" },
										{ fontSize: 15, fontWeight: "normal" }
									]}
								/>
							}
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
