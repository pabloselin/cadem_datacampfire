import React from "react";
import "./GraphWrapper.css";

const GraphWrapper = props => (
	<div className={"GraphWrapper " + props.size} width={props.width}>
		<div>{props.children}</div>
	</div>
);

export default GraphWrapper;
