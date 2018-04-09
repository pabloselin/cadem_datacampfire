import React, { Component } from "react";
import Header from "./components/mini/Header.js";
import Main from "./components/parts/Main.js";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
