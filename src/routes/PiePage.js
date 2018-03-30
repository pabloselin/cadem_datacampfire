import React from "react";
import GraphWrapper from "../components/GraphWrapper.js";
import Pie from "../components/Pie.js";

const PiePage = props => (
	<div className="showCase">
		<GraphWrapper>
			<Pie {...props} height={300} title="Gráfico de Pie" />
		</GraphWrapper>
	</div>
);

export default PiePage;
