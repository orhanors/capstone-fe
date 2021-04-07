import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useTranslation } from "react-i18next";
import NavBar from "../components/navBar/NavBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Auth from "../pages/auth/Auth/Auth";

import ProtectedRoute from "./ProtectedRoute";
import Seller from "../pages/user/Seller";
import Home from "../pages/home/Home";
import AddProduct from "../pages/user/addProduct/AddProduct";
import MyProducts from "../pages/user/MyProducts";
import Notification from "../components/_common/notification/Notification";
import Products from "../pages/products/Products";
import CommonDropdown from "../components/_common/dropdown/CommonDropdown";
import Product from "../pages/product/Product";
import AddArticle from "../pages/user/addArticle/AddArticle";

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
					<Notification />

					<Route path='/login' exact component={Auth} />
					<ProtectedRoute
						path='/products/:slug'
						exact
						component={Product}
					/>
					<ProtectedRoute path='/' exact component={Home} />
					<ProtectedRoute
						path='/addProduct'
						exact
						component={AddProduct}
					/>
					<ProtectedRoute
						path='/addArticle'
						exact
						component={AddArticle}
					/>
					<ProtectedRoute
						path='/myProducts'
						exact
						component={MyProducts}
					/>
					<ProtectedRoute
						path='/products'
						exact
						component={Products}
					/>

					<ProtectedRoute path='/seller' exact component={Seller} />
				</DndProvider>
			</Router>
		</div>
	);
}

export default App;
