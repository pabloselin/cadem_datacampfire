import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const SideMenu = props => (
	<Menu visible inverted left vertical className="menu-izquierda">
		<Menu.Item className="item">
			<i class="far fa-circle" /> Vista global resumen
		</Menu.Item>
		<Menu.Item className="item">
			<i class="far fa-circle" /> Vista general formato
		</Menu.Item>
		<Menu.Item className="item">
			<i class="far fa-circle" /> Vista general mercado
		</Menu.Item>
		<Menu.Item className="item">
			<i class="far fa-circle" /> Vista general local
		</Menu.Item>
		<Menu.Item className="item">
			<i class="far fa-circle" /> Ranking locales
		</Menu.Item>
		<Menu.Item className="item">
			<i class="far fa-circle" /> Respuestas locales
		</Menu.Item>
		<Menu.Item className="item">
			<i class="far fa-circle" /> Verbatims
		</Menu.Item>
	</Menu>
);

export default SideMenu;
