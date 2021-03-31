import { combineReducers } from "redux";
import userReducer from "../../user/user";
import productSideReducer from "../../productSidebar/productSide";
import searchSideReducer from "../../searchSidebar/searchSide";
import notifyReducer from "../../notification/notification";
import productsReducer from "../../products/products";
import cartReducer from "../../cart/shoppingCart";

const rootReducer = combineReducers({
	user: userReducer,
	productSidebar: productSideReducer,
	searchSidebar: searchSideReducer,
	notification: notifyReducer,
	products: productsReducer,
	cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
