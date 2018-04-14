import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const SideMenu = props => (
	<Menu visible inverted left vertical className="menu-izquierda">
		<Menu.Item className="item">Vista global resumen</Menu.Item>
		<Menu.Item className="item">Vista general formato</Menu.Item>
		<Menu.Item className="item">Vista general mercado</Menu.Item>
		<Menu.Item className="item">Vista general local</Menu.Item>
		<Menu.Item className="item">Ranking locales</Menu.Item>
		<Menu.Item className="item">Respuestas locales</Menu.Item>
		<Menu.Item className="item">Verbatims</Menu.Item>
	</Menu>
);

export default SideMenu;
