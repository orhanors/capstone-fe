import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Test from "../components/Test/Test";
import { useTranslation } from "react-i18next";
function App() {
	const { i18n } = useTranslation();
	return (
		<div className='App'>
			<Router>
				<Test />
				<button onClick={() => i18n.changeLanguage("tr")}>
					change
				</button>
			</Router>
		</div>
	);
}

export default App;
