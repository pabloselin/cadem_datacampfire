import React from "react";
import { Text } from "victory";
import "./ChartHeader.css";

const ChartHeader = props => {
	return (
		<g>
			<Text
				title={props.title.toUpperCase()}
				desc={props.title.toUpperCase()}
				dx={0}
				style={{
					fontSize: 14,
					fontFamily: "Asap",
					display: "block",
					fontWeight: "bold",
					lineHeight: "1em",
					padding: 0,
					parent: {
						display: "block"
					}
				}}
			/>

			<Text
				title={props.subtitle}
				desc={props.subtitle}
				dx={0}
				style={{
					lineHeight: "1em",
					fontSize: 12,
					fontFamily: "Asap"
				}}
			/>
		</g>
	);
};

export default ChartHeader;
