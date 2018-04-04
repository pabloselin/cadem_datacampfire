import React from "react";
import GraphWrapper from "../components/GraphWrapper.js";

const ChartPage = props => (
	<div className="showCase">
		<GraphWrapper size={props.size}>{props.chart}</GraphWrapper>
	</div>
);

export default ChartPage;
