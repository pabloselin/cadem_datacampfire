import React from "react";
import { Text } from "victory";

const ChartHeader = props => {
	return (
		<g>
			<Text
				title={props.title}
				desc={props.title}
				dx={0}
				style={{
					fontSize: 24,
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
					fontSize: 18,
					fontFamily: "Asap"
				}}
				x={0}
				y={20}
			/>
		</g>
	);
};

export default ChartHeader;
