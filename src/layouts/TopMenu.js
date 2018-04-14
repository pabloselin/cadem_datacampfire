import React from "react";
import { Menu } from "semantic-ui-react";
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
		<Menu.Item className="item">Lider.cl</Menu.Item>
		<Menu.Item className="item">SSFF</Menu.Item>
		<Menu.Item className="item">Lider.cl Hist.</Menu.Item>
	</Menu>
);

export default TopMenu;
