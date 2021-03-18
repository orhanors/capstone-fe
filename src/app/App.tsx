import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useTranslation } from "react-i18next";
import NavBar from "../components/navBar/NavBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Products from "../components/products/Products";
import Auth from "../pages/auth/Auth/Auth";
import User from "../pages/user/User";
import ProtectedRoute from "./ProtectedRoute";
import Seller from "../pages/user/Seller";

function App() {
	const { i18n } = useTranslation();
	useEffect(() => {
		document.dir = i18n.dir(); //If the lng is arabic it will directed by right-to-left
	}, [i18n, i18n.language]);

	return (
		<div className='App'>
			<Router>
				<DndProvider backend={HTML5Backend}>
					<NavBar />
					<Route path='/login' exact component={Auth} />
					<ProtectedRoute path='/' exact component={Products} />
					<ProtectedRoute path='/user' exact component={User} />
					<ProtectedRoute path='/seller' exact component={Seller} />
				</DndProvider>
			</Router>
		</div>
	);
}

export default App;
