import React from "react";
import { Flyout } from "victory";

class LineFlyOut extends React.Component {
	render() {
		const { x, y, graphHeight, color } = this.props;
		return (
			<g>
				<Flyout {...this.props} />
				<line
					x1={x}
					x2={x}
					y1={y}
					y2={graphHeight - 52}
					stroke={color}
					strokeWidth={0.5}
				/>
			</g>
		);
	}
}

export default LineFlyOut;
