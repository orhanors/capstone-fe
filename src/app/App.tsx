import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar/NavBar";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar />
			</Router>
		</div>
	);
}

export default App;
