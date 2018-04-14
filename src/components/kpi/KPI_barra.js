import React from "react";
import { VictoryBar, VictoryStack, VictoryLabel } from "victory";

class KPI_barra extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colorscale: this.props.theme.interactions.paleta.escala_semaforo
		};
	}

	getData(idx) {
		let data = [
			{ x: "", y: 100 - this.props.percent },
			{ x: this.props.title, y: this.props.percent }
		];
		console.log(data[idx]);
		return [data[idx]];
	}

	render() {
		return (
			<div className="chart-widget">
				<VictoryLabel
					text={[
						this.props.title.toUpperCase(),
						` ${this.props.subtitle}`
					]}
					style={[
						{
							fontFamily: "Asap",
							fontSize: 15,
							fontWeight: "bold"
						},
						{
							fontFamily: "Asap",
							fontSize: 13,
							fontWeight: "normal"
						}
					]}
				/>

				<VictoryLabel
					text={`${this.props.percent}%`}
					style={{
						fontSize: 48,
						fontFamily: "Asap",
						display: "block",
						color: this.state.colorscale[this.props.semaforo][1]
					}}
				/>
				<VictoryStack
					padding={6}
					horizontal
					height={50}
					colorScale={[
						this.state.colorscale[this.props.semaforo][1],
						"#ccc"
					]}
				>
					<VictoryBar
						style={{ data: { width: 15 } }}
						data={this.getData(1)}
					/>
					<VictoryBar
						style={{ data: { width: 15 } }}
						data={this.getData(0)}
					/>
				</VictoryStack>
			</div>
		);
	}
}

export default KPI_barra;
