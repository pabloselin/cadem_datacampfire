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
    {
      title: "Línea 1",
      values: [
        { x: "Mar 17", y: 14 },
        { x: "Abr 17", y: 26 },
        { x: "May 17", y: 12 },
        { x: "Jun 17", y: 11 },
        { x: "Jul 17", y: 10 },
        { x: "Ago 17", y: 20 },
        { x: "Sept 17", y: 40 },
        { x: "Oct 17", y: 40 },
        { x: "Nov 17", y: 20 },
        { x: "Dic 17", y: 10 }
      ]
    },
    {
      title: "Línea 2",
      values: [
        { x: "Mar 17", y: 10 },
        { x: "Abr 17", y: 11 },
        { x: "May 17", y: 45.2 },
        { x: "Jun 17", y: 15.4 },
        { x: "Jul 17", y: 20 },
        { x: "Ago 17", y: 11 },
        { x: "Sept 17", y: 33 },
        { x: "Oct 17", y: 70.5 },
        { x: "Nov 17", y: 14 },
        { x: "Dic 17", y: 11 }
      ]
    }
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
      <Pie
        height={300}
        title="Gráfico de Pie"
        data={data.pie}
        theme={cadem_theme}
      />
    </GraphWrapper>
  </div>
);

const LinePage = () => (
  <div className="showCase">
    <h2>Líneas</h2>
    <GraphWrapper>
      <Lines
        height={430}
        title="Gráfico de Líneas"
        data={data.lines}
        theme={cadem_theme}
      />
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
