import React, { Component } from "react";
import "./DownloadButton.css";
import downloadIcon from "../../assets/download.svg";

class DownloadButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			generated: false
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		//console.log(this.props.svgs);
	}

	makePNG() {
		let piesvg = this.props.svgs[0].childNodes[0].innerHTML;
		let legendsvg = this.props.svgs[1].childNodes[0].innerHTML;

		window.canvg(this.canvas, piesvg, {});
		window.canvg(this.canvas, "<svg>" + legendsvg + "</svg>", {
			ignoreClear: true,
			offsetX: 400
		});
		let png = this.canvas.toDataURL("image/png");
		this.setState({ generated: true, image: png });
		var newTab = window.open();
		newTab.document.body.innerHTML = `<img src="${png}" alt="Gráfico" />`;
	}

	render() {
		return (
			<div>
				<button
					onClick={this.makePNG.bind(this)}
					className="DownloadButton"
				>
					<img src={downloadIcon} alt="Descargar imagen" />
				</button>
				<canvas
					id="canvas"
					className="canvas"
					width={880}
					height={405}
					ref={canvas => (this.canvas = canvas)}
				/>
			</div>
		);
	}
}

export default DownloadButton;
