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
					fontFamily: "Asap",
					textTransform: "uppercase",
					fontWeight: "bold",
					textAlign: "left",
					float: "left"
				}}
			/>
			<Text
				title={props.subtitle}
				desc={props.subtitle}
				dx={0}
				style={{
					fontSize: 18,
					fontFamily: "Asap",
					textTransform: "uppercase",
					fontWeight: "normal",
					textAlign: "left",
					float: "left",
					clear: "left"
				}}
			/>
		</g>
	);
};

export default ChartHeader;
