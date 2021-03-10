import { combineReducers } from "redux";
import userReducer from "../../user/user";
import testReducer from "../../test/test";

const rootReducer = combineReducers({
	user: userReducer,
	test: testReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
