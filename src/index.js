import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/semantic-ui/components/reset.css";
//import "./assets/semantic-ui/components/site.css";
import "./assets/semantic-ui/components/grid.css";
import "./assets/estilo-dashboard.css";

import "./assets/semantic-ui/components/menu.css";
import "./assets/semantic-ui/components/input.css";
import "./assets/semantic-ui/components/dropdown.css";
//import "./assets/semantic-ui/components/icon.css";
import "./assets/semantic-ui/components/button.css";
//import "./assets/semantic-ui/components/transition.css";

const rootEl = document.getElementById("root");

ReactDOM.render(<App />, rootEl);

if (module.hot) {
	module.hot.accept("./App", () => {
		const NextApp = require("./App").default;
		ReactDOM.render(<NextApp />, rootEl);
	});
}

registerServiceWorker();
