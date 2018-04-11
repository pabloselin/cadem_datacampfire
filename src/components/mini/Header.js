import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Data-Campfire-Logo.png";

const Header = () => (
  <div>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/pie">1. Pie</Link>
        </li>
        <li>
          <Link to="/lines">2. Líneas</Link>
        </li>
        <li>
          <Link to="/grouped-bars">3a. Barra integrado</Link>
        </li>
        <li>
          <Link to="/single-bars">3b. Barra</Link>
        </li>
        <li>
          <Link to="/line-bars">4. Barra y línea</Link>
        </li>
        <li>
          <Link to="/scatter">5a. Posicionamiento</Link>
        </li>
        <li>
          <Link to="/scatter-mini">5b. Posicionamiento 2</Link>
        </li>
        <li>
          <Link to="/stacked">6a. Stacked bar</Link>
        </li>
        <li>
          <Link to="/stacked-mini">6b. Stacked bar mini</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Header;
