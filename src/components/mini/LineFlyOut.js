import React from "react";

class LineFlyOut extends React.Component {
	render() {
		const { x, y, graphHeight, color } = this.props;
		const actColor = color() !== undefined ? color() : "transparent";
		const rectColor = color() !== undefined ? "#f0efeb" : "transparent";
		const pointSize =
			this.props.pointSize !== undefined ? this.props.pointSize : 3;
		return (
			<g>
				<rect
					x={this.props.x - this.props.width / 2}
					y={this.props.y - this.props.height * 1.6}
					width={this.props.width}
					height={this.props.height}
					rx={3}
					ry={3}
					fill={rectColor}
				/>
				<circle cx={x} cy={y} r={pointSize} fill={actColor} />
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
