import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./assets/Data-Campfire-Logo.png";
import cadem_theme from "./themes/cadem_theme.js";
import Inicio from "./routes/Inicio.js";
import ChartPage from "./components/ChartPage.js";
import Lines from "./components/Lines.js";
import Pie from "./components/Pie.js";
import GroupedBars from "./components/GroupedBars.js";
import SingleBars from "./components/SingleBars.js";
import LineBars from "./components/LineBars.js";
import Scatter from "./components/Scatter.js";
import ScatterMini from "./components/ScatterMini.js";
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
            </ul>
          </nav>

          <Route
            render={props => (
              <Inicio {...props} theme={cadem_theme} exact path="/" />
            )}
          />
          <Route
            render={props => (
              <ChartPage chart={<Pie {...props} theme={cadem_theme} />} />
            )}
            path="/pie"
          />
          <Route
            render={props => (
              <ChartPage
                chart={<Lines {...props} height={300} theme={cadem_theme} />}
              />
            )}
            path="/lines"
          />

          <Route
            render={props => (
              <ChartPage
                chart={
                  <GroupedBars {...props} height={240} theme={cadem_theme} />
                }
              />
            )}
            path="/grouped-bars"
          />

          <Route
            render={props => (
              <ChartPage
                size="mini"
                chart={
                  <SingleBars
                    {...props}
                    height={300}
                    width={300}
                    theme={cadem_theme}
                  />
                }
              />
            )}
            path="/single-bars"
          />

          <Route
            render={props => (
              <ChartPage
                chart={
                  <LineBars
                    {...props}
                    height={300}
                    width={600}
                    theme={cadem_theme}
                  />
                }
              />
            )}
            path="/line-bars"
          />

          <Route
            render={props => (
              <ChartPage
                chart={
                  <Scatter
                    {...props}
                    height={300}
                    width={600}
                    theme={cadem_theme}
                  />
                }
              />
            )}
            path="/scatter"
          />

          <Route
            render={props => (
              <ChartPage
                size="mini"
                chart={
                  <ScatterMini
                    {...props}
                    height={300}
                    width={300}
                    theme={cadem_theme}
                  />
                }
              />
            )}
            path="/scatter-mini"
          />
        </div>
      </Router>
    );
  }
}

export default App;
