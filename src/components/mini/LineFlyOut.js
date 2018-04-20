import React from "react";

class LineFlyOut extends React.Component {
	render() {
		const { x, y, graphHeight, color } = this.props;
		const actColor = color() !== undefined ? color() : "transparent";

		return (
			<g>
				<circle cx={x} cy={y} r={3} fill={actColor} />
				<line
					x1={x}
					x2={x}
					y1={y}
					y2={graphHeight - 52}
					stroke={actColor}
					strokeWidth={0.8}
				/>
			</g>
		);
	}
}

export default LineFlyOut;
