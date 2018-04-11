import React from "react";

class LineFlyOut extends React.Component {
	render() {
		const { x, y, graphHeight, color } = this.props;
		return (
			<g>
				<circle cx={x} cy={y} r={3} fill={color} />
				<line
					x1={x}
					x2={x}
					y1={y}
					y2={graphHeight - 52}
					stroke={color}
					strokeWidth={0.8}
				/>
			</g>
		);
	}
}

export default LineFlyOut;
