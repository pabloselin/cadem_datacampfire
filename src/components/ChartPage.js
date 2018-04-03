import React from "react";
import GraphWrapper from "../components/GraphWrapper.js";

const ChartPage = props => (
	<div className="showCase">
		<GraphWrapper>{props.chart}</GraphWrapper>
	</div>
);

export default ChartPage;
