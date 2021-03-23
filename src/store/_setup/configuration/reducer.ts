import { combineReducers } from "redux";
import userReducer from "../../user/user";
import productSideReducer from "../../productSidebar/productSide";
import searchSideReducer from "../../searchSidebar/searchSide";
import notifyReducer from "../../notification/notification";
const rootReducer = combineReducers({
	user: userReducer,
	productSidebar: productSideReducer,
	searchSidebar: searchSideReducer,
	notification: notifyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
