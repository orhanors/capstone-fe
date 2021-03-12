import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";

import { useTranslation } from "react-i18next";
import NavBar from "../components/navBar/NavBar";

function App() {
	const { i18n } = useTranslation();
	useEffect(() => {
		document.dir = i18n.dir(); //If the lng is arabic it will directed by right-to-left
	}, [i18n, i18n.language]);

	return (
		<div className='App'>
			<Router>
				<NavBar />
			</Router>
		</div>
	);
}

export default App;
