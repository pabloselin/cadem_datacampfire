import React from "react";

const Title = props => (
	<text x={0} y={0}>
		<tspan
			style={{
				fontSize: props.fontSizeTop,
				fontWeight: "bold"
			}}
			x={0}
			dy={props.dy1}
		>
			{props.title.toUpperCase()}
		</tspan>
		<tspan
			style={{
				fontSize: props.fontSizeBottom,
				fontWeight: "normal",
				display: "block"
			}}
			x={0}
			dy={props.dy2}
		>
			{props.subtitle}
		</tspan>
	</text>
);

export default Title;
