import React, { Component } from "react";
import Pie from "./Pie.js";
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
			<div className="GraphWrapper">
				<div>
					<p>Implementación gráfico de Pie con Victory y React</p>
					<Pie
						title="Gráfico de Pie"
						data={this.state.data.pie}
						externalEventMutations={this.state.updated}
					/>
					<div className="changeInput">
						<p>
							Se pueden cambiar los valores de cada dato y el
							gráfico se regenera automáticamente.
						</p>
						{this.state.data.pie.map((piedata, index) => (
							<p>
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
