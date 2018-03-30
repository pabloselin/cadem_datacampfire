import React from "react";
import GraphWrapper from "../components/GraphWrapper.js";
import Lines from "../components/Lines.js";

const LinePage = props => (
	<div className="showCase">
		<GraphWrapper>
			<Lines {...props} height={430} title="Gráfico de Líneas" />
		</GraphWrapper>
	</div>
);

export default LinePage;
