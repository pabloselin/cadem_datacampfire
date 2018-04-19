import React from "react";
import { Menu } from "semantic-ui-react";
//import { NavLink } from "react-router-dom";

const SideMenu = props => (
	<Menu inverted vertical className="menu-izquierda">
		<Menu.Item className="item">Menu Lateral</Menu.Item>
		<Menu.Item className="item">
			<i className="far fa-circle" /> Reporte A
		</Menu.Item>
		<Menu.Item className="item">
			<i className="far fa-circle" /> Reporte B
		</Menu.Item>
		<Menu.Item className="item">
			<i className="far fa-circle" /> Reporte C
		</Menu.Item>
	</Menu>
);

export default SideMenu;
