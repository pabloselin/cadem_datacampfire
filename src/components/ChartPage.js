import React from "react";
import GraphWrapper from "../components/GraphWrapper.js";
import Header from "./mini/Header.js";

const ChartPage = props => (
	<div className="showCase">
		<Header />
		<GraphWrapper size={props.size}>{props.chart}</GraphWrapper>
	</div>
);

export default ChartPage;
