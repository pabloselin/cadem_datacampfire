import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./assets/Data-Campfire-Logo.png";
import cadem_theme from "./themes/cadem_theme.js";
import Inicio from "./routes/Inicio.js";
import LinePage from "./routes/LinePage.js";
import PiePage from "./routes/PiePage.js";
import "./App.css";

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
