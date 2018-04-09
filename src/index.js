import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

const rootEl = document.getElementById("root");

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	rootEl
);

if (module.hot) {
	module.hot.accept("./App", () => {
		const NextApp = require("./App").default;
		ReactDOM.render(
			<BrowserRouter>
				<NextApp />
			</BrowserRouter>,
			rootEl
		);
	});
}

registerServiceWorker();
