import React, { Component } from "react";
import Header from "./components/mini/Header.js";
import Main from "./components/parts/Main.js";

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
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
