import React from "react";
import { Text } from "victory";
import "./ChartHeader.css";

const ChartHeader = props => {
	return (
		<g className="ChartHeader">
			<Text
				title={props.title.toUpperCase()}
				desc={props.title.toUpperCase()}
				dx={0}
				style={{
					fontSize: 18,
					fontFamily: "Asap"
				}}
				x={0}
				y={2}
			/>
			<br />
			<Text
				title={props.subtitle}
				desc={props.subtitle}
				dx={0}
				style={{
					fontSize: 16,
					fontFamily: "Asap"
				}}
				x={0}
				y={20}
			/>
		</g>
	);
};

export default ChartHeader;
