import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const TopMenu = props => (
	<Menu tabular column id={props.id}>
		<NavLink exact className="item" to="/">
			Vista Global
		</NavLink>

		<NavLink className="item" to="/kpis">
			Lider
		</NavLink>

		<Menu.Item className="item">Express</Menu.Item>
		<Menu.Item className="item">Ekono</Menu.Item>
		<Menu.Item className="item">Central Ma..</Menu.Item>
		<Menu.Item className="item">SBA</Menu.Item>
		<Menu.Item className="item">Líder SSFF</Menu.Item>
		<Menu.Item className="item">Express SSFF</Menu.Item>
		<Menu.Item className="item">SBA SSFF</Menu.Item>
		<Dropdown item simple text="Ver más">
			<Dropdown.Menu>
				<Dropdown.Item className="item">
					<a href="#">Lider.cl</a>
				</Dropdown.Item>
				<Dropdown.Item className="item">
					<a href="#">SSFF</a>
				</Dropdown.Item>
				<Dropdown.Item className="item">
					<a href="#">Lider.cl Hist.</a>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	</Menu>
);

export default TopMenu;
