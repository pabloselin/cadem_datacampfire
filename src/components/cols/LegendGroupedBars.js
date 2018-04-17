import React from "react";
import { VictoryLegend, VictoryLabel, Point } from "victory";

const LegendGroupedBars = props => (
	<VictoryLegend
		title={props.title}
		titleOrientation="left"
		theme={props.theme}
		name={props.legend}
		data={props.makeLegend}
		orientation={props.orientation}
		itemsPerRow={props.itemsPerRow}
		gutter={props.gutter}
		height={props.height}
		labelComponent={<VictoryLabel style={props.legendLabelStyle} />}
		dataComponent={
			<Point size={props.pointSize} style={props.legendDataStyle} />
		}
		titleComponent={
			<VictoryLabel
				style={[
					{ fontSize: `${props.titleSize}`, fontWeight: "bold" },
					{ fontSize: `${props.subTitleSize}`, fontWeight: "normal" }
				]}
			/>
		}
	/>
);

export default LegendGroupedBars;
