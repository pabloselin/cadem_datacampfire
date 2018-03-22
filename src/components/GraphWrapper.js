import React, { Component } from "react";
import config from "../config.json";
import Pie from "./Pie.js";
import "./GraphWrapper.css";

class GraphWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
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
			}
		};
	}

	componentDidMount() {
		console.log(this.state.data.pie);
	}

	render() {
		return (
			<div className="GraphWrapper">
				<div>
					<Pie title="Gráfico de Pie" data={this.state.data.pie} />
				</div>
			</div>
		);
	}
}

export default GraphWrapper;
