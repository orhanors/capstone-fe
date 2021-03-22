import { combineReducers } from "redux";
import userReducer from "../../user/user";
import productSideReducer from "../../productSidebar/productSide";
import searchSideReducer from "../../searchSidebar/searchSide";

const rootReducer = combineReducers({
	user: userReducer,
	productSidebar: productSideReducer,
	searchSidebar: searchSideReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
