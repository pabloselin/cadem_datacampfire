import React from "react";
import { VictoryLabel, VictoryContainer, VictoryGroup } from "victory";
import flecha_verde from "../../assets/flecha_verde.svg";
import flecha_rojo from "../../assets/flecha_rojo.svg";
import flecha_amarillo from "../../assets/flecha_amarillo.svg";
import "./KpiProgreso.css";

class KpiProgreso extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colorscale: this.props.theme.interactions.paleta.escala_semaforo
		};
	}

	cualFlecha() {
		if (this.props.semaforo === "rojo") {
			return flecha_rojo;
		} else if (this.props.semaforo === "verde") {
			return flecha_verde;
		} else if (this.props.semaforo === "amarillo") {
			return flecha_amarillo;
		}
	}

	render() {
		return (
			<div className="chart-widget">
				<VictoryLabel
					key={3}
					dy={20}
					dx={10}
					text={[this.props.title.toUpperCase(), this.props.subtitle]}
					style={[
						{
							fontFamily: "Asap",
							fontSize: 15,
							fontWeight: "bold",
							display: "block"
						},
						{
							fontFamily: "Asap",
							fontSize: 13,
							fontWeight: "normal",
							display: "block"
						}
					]}
				/>

				<VictoryLabel
					dy={100}
					className="percent"
					name="percent"
					key={1}
					text={`${this.props.percent}%`}
					style={{
						fontSize: 48,
						fontFamily: "Asap",
						display: "block",
						color: this.state.colorscale[this.props.semaforo][1]
					}}
				/>

				<VictoryLabel
					className="caption"
					key={2}
					text={this.props.caption}
					style={{
						fontSize: 12,
						fontFamily: "Asap",
						display: "block"
					}}
				/>

				<div className="status">
					<p>{this.props.goal}</p>
					<img
						alt="flecha"
						className="arrow"
						src={this.cualFlecha()}
					/>
				</div>
			</div>
		);
	}
}

export default KpiProgreso;
