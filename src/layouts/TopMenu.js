import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const TopMenu = props => (
	<Menu tabular id={props.id}>
		<NavLink className="item" to="/4-cols">
			4 columnas
		</NavLink>

		<NavLink exact className="item" to="/">
			6 columnas
		</NavLink>

		<NavLink className="item" to="/12-cols">
			12 columnas
		</NavLink>

		<NavLink className="item" to="/kpis">
			Kpis
		</NavLink>

		<NavLink className="item" to="/semaforo">
			Semáforo
		</NavLink>
	</Menu>
);

export default TopMenu;
