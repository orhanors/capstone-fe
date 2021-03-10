import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import { useTranslation } from "react-i18next";
import UseLang from "../components/test/UseLang";
import LanguageSwitcher from "../components/test/LanguageSwitcher";
function App() {
	const { i18n } = useTranslation();
	useEffect(() => {
		document.dir = i18n.dir();
	}, [i18n, i18n.language]);

	return (
		<div className='App'>
			<Router>
				<LanguageSwitcher />
				<UseLang />
			</Router>
		</div>
	);
}

export default App;
