import React, { Component } from "react";
import "./DownloadButton.css";
import downloadIcon from "../../assets/download.svg";
import cadem_theme from "../../themes/cadem_theme.js";

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
		//Pie Specific
		let piesvg = this.props.svgs[0].childNodes[0].innerHTML;
		let legendsvg = this.props.svgs[1].childNodes[0].innerHTML;
		let percent = this.props.svgs[2].props.text;

		let percentsvg = `<svg><text style="font-size: 60; fill:${
			cadem_theme.interactions.hover
		}">${percent}</text></svg>`;

		let title = `<svg><text style="font-size:22; fill: #333;">${this.props.title.toUpperCase()}</text></svg>`;
		let subtitle = `<svg><text style="font-size:18; fill: #333;">${
			this.props.subtitle
		}</text></svg>`;

		//Fondo
		let ctx = this.canvas.getContext("2d");
		ctx.fillStyle = "#f0f0f0";
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		window.canvg(this.canvas, title, {
			offsetY: 30,
			offsetX: 10,
			ignoreClear: true
		});
		window.canvg(this.canvas, subtitle, {
			offsetY: 50,
			offsetX: 10,
			ignoreClear: true
		});

		window.canvg(this.canvas, `<svg>${piesvg}</svg>`, {
			ignoreClear: true,
			offsetY: 40
		});
		window.canvg(this.canvas, `<svg>${legendsvg}</svg>`, {
			ignoreClear: true,
			offsetX: 420,
			offsetY: 40,
			scaleWidth: 300
		});
		window.canvg(this.canvas, percentsvg, {
			ignoreClear: true,
			offsetY: 260,
			offsetX: 150
		});

		//Common
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
					width={800}
					height={440}
					ref={canvas => (this.canvas = canvas)}
				/>
			</div>
		);
	}
}

export default DownloadButton;
