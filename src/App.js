import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GraphWrapper from "./components/GraphWrapper.js";
import logo from "./assets/Data-Campfire-Logo.png";
import Pie from "./components/Pie.js";
import Lines from "./components/Lines.js";
import cadem_theme from "./themes/cadem_theme.js";

import "./App.css";

const data = {
  pie: [
    {
      x: "Dato 1",
      y: 10
    },
    {
      x: "Dato 2",
      y: 20
    },
    {
      x: "Dato 3",
      y: 30
    },
    {
      x: "Dato 4",
      y: 60
    },
    {
      x: "Dato 5",
      y: 90
    },
    {
      x: "Dato 6",
      y: 70
    }
  ],
  lines: [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 }
  ]
};

const Inicio = () => (
  <div className="Inicio">
    <h2>Inicio</h2>
  </div>
);

const PiePage = () => (
  <div className="showCase">
    <h2>Pie</h2>
    <GraphWrapper>
      <Pie title="Gráfico de Pie" data={data.pie} theme={cadem_theme} />
    </GraphWrapper>
  </div>
);

const LinePage = () => (
  <div className="showCase">
    <h2>Líneas</h2>
    <GraphWrapper>
      <Lines title="Gráfico de Líneas" data={data.lines} theme={cadem_theme} />
    </GraphWrapper>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/pie">Pie</Link>
              </li>
              <li>
                <Link to="/lines">líneas</Link>
              </li>
            </ul>
          </nav>

          <Route exact path="/" component={Inicio} />
          <Route path="/pie" component={PiePage} />
          <Route path="/lines" component={LinePage} />
        </div>
      </Router>
    );
  }
}

export default App;
