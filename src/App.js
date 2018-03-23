import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GraphWrapper from "./components/GraphWrapper.js";
import logo from "./assets/Data-Campfire-Logo.png";
import "./App.css";

const Inicio = () => (
  <div className="Inicio">
    <h2>Inicio</h2>
  </div>
);

const Pie = () => (
  <div className="showCase">
    <h2>Pie</h2>
    <GraphWrapper />
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
            </ul>
          </nav>

          <Route exact path="/" component={Inicio} />
          <Route path="/pie" component={Pie} />
        </div>
      </Router>
    );
  }
}

export default App;
