handleChange(event) {
		//console.log(event.target.name);
		let newdata = Object.assign(this.state.data);
		newdata.pie[event.target.name].y = Number(event.target.value);
		this.setState((prevState, props) => ({
			data: newdata,
			updated: !this.state.updated
		}));
	}

<div className="changeInput">
	<p>
		Se pueden cambiar los valores de cada dato y el gráfico se regenera
		automáticamente.
	</p>
	{this.state.data.pie.map((piedata, index) => (
		<p key={"p-" + index}>
			{" "}
			{piedata.x}&nbsp;
			<input
				name={index}
				key={index}
				type="number"
				value={piedata.y}
				label={piedata.x}
				onChange={this.handleChange.bind(this)}
			/>
		</p>
	))}
</div>;
