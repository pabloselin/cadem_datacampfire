import React, { Component } from "react";
import { Parser } from "json2csv";
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

	debugPNG() {
		console.log(this.props);
	}

	makeCSV() {
		let data = this.props.data.data;
		let fields = this.props.fields;
		let jsonparse = new Parser({
			fields,
			unwind: this.props.unwind
		});
		let csv = jsonparse.parse(data);

		// var newTab = window.open();
		// newTab.document.body.innerHTML = csv;
		console.log(csv);
	}

	makeDownload() {
		if (this.props.data !== undefined) {
			this.makeCSV();
		} else {
			this.makePNG();
		}
	}

	makePNG() {
		//Fondo
		let ctx = this.canvas.getContext("2d");
		ctx.fillStyle = "#f0f0f0";
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		//Sólo para gráfico de PIE
		if (this.props.type === "pie") {
			let title = `<svg><text style="font-size:22; fill: #333;">${this.props.title.toUpperCase()}</text></svg>`;
			let subtitle = `<svg><text style="font-size:18; fill: #333;">${
				this.props.subtitle
			}</text></svg>`;

			//Cabecera
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
			//Pie
			let piesvg = this.props.svgs[0].childNodes[0].innerHTML;
			let legendsvg = this.props.svgs[1].childNodes[0].innerHTML;
			let percent = this.props.percent;

			window.canvg(this.canvas, `<svg>${piesvg}</svg>`, {
				ignoreClear: true,
				offsetY: 80,
				offsetX: 20
			});
			window.canvg(this.canvas, `<svg>${legendsvg}</svg>`, {
				ignoreClear: true,
				offsetX: 300,
				offsetY: 40
			});

			if (percent !== 0) {
				let percentsvg = `<svg><text style="font-size: 36;font-weight: bold; font-family:'Asap'; fill:${
					cadem_theme.interactions.hover
				}">${percent}%</text></svg>`;

				window.canvg(this.canvas, percentsvg, {
					ignoreClear: true,
					offsetY: 225,
					offsetX: 100
				});
			}
		} else {
			let anysvg = this.props.svgs[0].innerHTML;
			window.canvg(this.canvas, `<svg>${anysvg}</svg>`, {
				ignoreClear: true,
				offsetY: 40,
				offsetX: 0
			});
		}

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
					onClick={this.makeDownload.bind(this)}
					className="DownloadButton"
				>
					<img src={downloadIcon} alt="Descargar imagen" />
				</button>
				<canvas
					id="canvas"
					className="canvas"
					width={440}
					height={440}
					ref={canvas => (this.canvas = canvas)}
				/>
			</div>
		);
	}
}

export default DownloadButton;
