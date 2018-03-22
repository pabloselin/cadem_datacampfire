import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import "./TestGraph.css";

import { VictoryBar } from "victory";

class TestGraph extends Component {
	render() {
		return (
			<div className="TestGraph">
				<VictoryBar data={this.props.data} x="quarter" y="earnings" />
			</div>
		);
	}
}

export default TestGraph;
