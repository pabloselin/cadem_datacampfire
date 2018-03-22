import React, { Component } from "react";
import "./Pie.css";

import { VictoryPie, VictoryLegend } from "victory";

class Pie extends Component {
	makeLegend(data) {
		let legData = data.map(item => {
			return { name: item.x };
		});
		return legData;
	}

	render() {
		return (
			<div className="Pie" style={{ display: "flex", flexWrap: "wrap" }}>
				<VictoryPie
					style={{ parent: { maxWidth: "50%" } }}
					padAngle={0}
					innerRadius={100}
					data={this.props.data}
				/>
				<VictoryLegend
					title={this.props.title}
					centerTitle
					orientation="vertical"
					borderPadding={{ top: 20 }}
					gutter={20}
					style={{
						title: { fontSize: 24 },
						parent: { maxWidth: "50%" },
						margin: { top: 20 }
					}}
					data={this.makeLegend(this.props.data)}
				/>
			</div>
		);
	}
}

export default Pie;
