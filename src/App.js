import React, { Component } from "react";
import GraphWrapper from "./components/GraphWrapper.js";
import logo from "./assets/Data-Campfire-Logo.png";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <GraphWrapper />
      </div>
    );
  }
}

export default App;
