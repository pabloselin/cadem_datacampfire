import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GraphWrapper from "./components/GraphWrapper.js";
import logo from "./assets/Data-Campfire-Logo.png";
import Pie from "./components/Pie.js";
import Lines from "./components/Lines.js";
import cadem_theme from "./themes/cadem_theme.js";

import "./App.css";

const Inicio = props => <div className="Inicio" />;

const PiePage = props => (
  <div className="showCase">
    <h2>Pie</h2>
    <GraphWrapper>
      <Pie {...props} height={300} title="Gráfico de Pie" />
    </GraphWrapper>
  </div>
);

const LinePage = props => (
  <div className="showCase">
    <h2>Líneas</h2>
    <GraphWrapper>
      <Lines {...props} height={430} title="Gráfico de Líneas" />
    </GraphWrapper>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {}

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

          <Route
            render={props => (
              <Inicio {...props} theme={cadem_theme} exact path="/" />
            )}
          />
          <Route
            render={props => <PiePage {...props} theme={cadem_theme} />}
            path="/pie"
          />
          <Route
            render={props => <LinePage {...props} theme={cadem_theme} />}
            path="/lines"
          />
        </div>
      </Router>
    );
  }
}

export default App;
