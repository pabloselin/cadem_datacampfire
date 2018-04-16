import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const TopMenu = props => (
	<Menu tabular id={props.id}>
		<NavLink exact className="item" to="/">
			6 columnas
		</NavLink>

		<NavLink className="item" to="/kpis">
			Kpis
		</NavLink>

		<NavLink className="item" to="/alt-paleta">
			Paleta 2
		</NavLink>

		<NavLink className="item" to="/4-cols">
			4 columnas
		</NavLink>

		<NavLink className="item" to="/12-cols">
			12 columnas
		</NavLink>
		<Menu.Item className="item">Central Ma..</Menu.Item>
		<Menu.Item className="item">SBA</Menu.Item>
		<Menu.Item className="item">Líder SSFF</Menu.Item>
		<Menu.Item className="item">Express SSFF</Menu.Item>
		<Dropdown item simple text="Ver más">
			<Dropdown.Menu>
				<Dropdown.Item className="item">
					<a href="/">Lider.cl</a>
				</Dropdown.Item>
				<Dropdown.Item className="item">
					<a href="/">SSFF</a>
				</Dropdown.Item>
				<Dropdown.Item className="item">
					<a href="/">Lider.cl Hist.</a>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	</Menu>
);

export default TopMenu;
