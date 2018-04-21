import React from "react";
import { Point } from "victory";

class CustomPoint extends React.Component {
	fillLegend() {
		console.log(this.props.semaforocolors);
		if (this.props.semaforo !== true) {
			if (this.props.activeCat === this.props.datum.name) {
				return this.props.activeColor;
			} else {
				return this.props.datum.symbol.fill;
			}
		} else {
			if (this.props.activeCat === this.props.datum.name) {
				if (this.props.datum.name === this.props.positiveValue) {
					return this.props.semaforocolors.verde[1];
				} else if (this.props.datum.name === this.props.negativeValue) {
					return this.props.semaforocolors.rojo[1];
				}
			} else {
				return this.props.datum.symbol.fill;
			}
		}
	}

	render() {
		const type = () => {
			if (this.props.datum.symbol.type === "line") {
				return (
					<rect
						x={this.props.x}
						y={this.props.y - 1}
						fill={this.fillLegend()}
						width={10}
						height={3}
					/>
				);
			} else {
				return (
					<Point
						{...this.props}
						x={this.props.x}
						y={this.props.y}
						style={{ cursor: "pointer", fill: this.fillLegend() }}
						size={this.props.size}
					/>
				);
			}
		};
		return <g>{type()}</g>;
	}
}

export default CustomPoint;
