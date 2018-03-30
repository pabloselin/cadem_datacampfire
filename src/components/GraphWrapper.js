import React from "react";
import "./GraphWrapper.css";

const GraphWrapper = props => (
	<div className="GraphWrapper">
		<div>{props.children}</div>
	</div>
);

export default GraphWrapper;
