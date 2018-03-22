import React, { Component } from "react";
import "./Pie.css";

import { VictoryPie, VictoryLegend, VictorySharedEvents } from "victory";

class Pie extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data
		};
	}

	makeLegend(data) {
		let legData = data.map(item => {
			return { name: item.x + " (" + item.y + ")" };
		});
		return legData;
	}

	getData(data) {
		return data;
	}

	componentWillReceiveProps(nextProps) {}

	render() {
		console.log(this.props.data);
		return (
			<div className="Pie">
				<VictorySharedEvents
					events={[
						{
							childName: ["pie", "legend"],
							target: "data",
							eventHandlers: {
								onMouseOver: () => {
									return [
										{
											childName: ["pie", "legend"],
											mutation: props => {
												return {
													style: Object.assign(
														{},
														props.style,
														{ fill: "tomato" }
													)
												};
											}
										}
									];
								},
								onMouseOut: () => {
									return [
										{
											childName: ["pie", "legend"],
											mutation: () => {
												return null;
											}
										}
									];
								}
							}
						}
					]}
				>
					<VictoryPie
						animate={{ duration: 500 }}
						name="pie"
						style={{
							parent: { maxWidth: "60%" }
						}}
						width={480}
						padAngle={0}
						innerRadius={100}
						data={this.getData(this.props.data)}
					/>
					<VictoryLegend
						name="legend"
						title={this.props.title}
						centerTitle
						orientation="vertical"
						borderPadding={{ top: 40 }}
						gutter={0}
						style={{
							title: { fontSize: 32 },
							labels: { fontSize: 24 },
							parent: { maxWidth: "40%" }
						}}
						data={this.makeLegend(this.props.data)}
					/>
				</VictorySharedEvents>
			</div>
		);
	}
}

export default Pie;
