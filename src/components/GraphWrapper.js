import React, { Component } from "react";
import Pie from "./Pie.js";
import cadem_theme from "../themes/cadem_theme.js";
import "./GraphWrapper.css";

const pie = () => {
	return {
		pie: [
			{
				x: "Dato 1",
				y: 10
			},
			{
				x: "Dato 2",
				y: 20
			},
			{
				x: "Dato 3",
				y: 30
			},
			{
				x: "Dato 4",
				y: 60
			},
			{
				x: "Dato 5",
				y: 90
			},
			{
				x: "Dato 6",
				y: 70
			}
		]
	};
};

class GraphWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			updated: false,
			data: pie()
		};
		console.log(this.state);
	}

	handleChange(event) {
		//console.log(event.target.name);
		let newdata = Object.assign(this.state.data);
		newdata.pie[event.target.name].y = Number(event.target.value);
		this.setState((prevState, props) => ({
			data: newdata,
			updated: !this.state.updated
		}));
	}

	componentDidMount() {}

	render() {
		return (
			<div className="GraphWrapper" theme={cadem_theme}>
				<div>
					<h2>Implementación gráfico de Pie con Victory y React</h2>
					<Pie
						title="Gráfico de Pie"
						data={this.state.data.pie}
						theme={cadem_theme}
					/>
					<div className="changeInput">
						<p>
							Se pueden cambiar los valores de cada dato y el
							gráfico se regenera automáticamente.
						</p>
						{this.state.data.pie.map((piedata, index) => (
							<p key={"p-" + index}>
								{" "}
								{piedata.x}&nbsp;
								<input
									name={index}
									key={index}
									type="number"
									value={piedata.y}
									label={piedata.x}
									onChange={this.handleChange.bind(this)}
								/>
							</p>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default GraphWrapper;
