import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./services/i18n";
ReactDOM.render(
	<React.StrictMode>
		<React.Suspense fallback='Loading...'>
			<App />
		</React.Suspense>
	</React.StrictMode>,
	document.getElementById("root")
);

/**
 * ---> React.Suspense :We’ve told React to suspend rendering of the <App> component until i18next has initialized,
 *                      which now depends on the first language file completing its download.
 */
