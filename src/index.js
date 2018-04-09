import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";

const rootEl = document.getElementById("root");

ReactDOM.render(<App />, rootEl);

if (module.hot) {
	module.hot.accept("./App", () => {
		const NextApp = require("./App").default;
		ReactDOM.render(<NextApp />, rootEl);
	});
}

registerServiceWorker();
