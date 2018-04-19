import React from "react";
import { VictoryPortal } from "victory";

const MiniLabel = props => (
	<g>
		<rect
			x={props.x - props.width / 2}
			y={props.y - props.height / 1.4}
			width={props.width}
			height={props.height}
			rx={3}
			ry={3}
			style={props.style}
			fill="#f0efeb"
		/>
		<text className="MiniLabel" x={props.x} y={props.y}>
			<tspan style={props.style} fill={props.color} text-anchor="middle">
				{props.datum.y}%
			</tspan>
		</text>
	</g>
);

export default MiniLabel;
