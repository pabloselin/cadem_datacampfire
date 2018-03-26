import React, { Component } from "react";
import "./GraphWrapper.css";

class GraphWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			updated: false
		};
	}

	componentDidMount() {}

	render() {
		return (
			<div className="GraphWrapper">
				<div>{this.props.children}</div>
			</div>
		);
	}
}

export default GraphWrapper;
