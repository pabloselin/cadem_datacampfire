import React from "react";
import { VictoryChart, VictoryAxis, VictoryGroup } from "victory";

const GroupedBarsCols = props => (
	<VictoryChart
		padding={props.padding}
		theme={props.theme}
		height={props.height}
		width={props.width}
		domain={props.domain}
		domainPadding={props.domainPadding}
	>
		<VictoryAxis style={props.tickLabels} tickValues={props.tickValues} />
		<VictoryAxis
			style={{ tickLabels: { fontSize: props.tickLabelsFontSize } }}
			dependentAxis
		/>

		<VictoryGroup
			name="BarGroup"
			categories={{ x: props.categories }}
			offset={props.offset}
		>
			{props.children}
		</VictoryGroup>
	</VictoryChart>
);

export default GroupedBarsCols;
