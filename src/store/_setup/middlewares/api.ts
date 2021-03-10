/**
 * Refresh auth logic makes another call if it see 401
 *
 */

import axios from "axios";
import { MiddlewareAPI, Dispatch, Middleware, AnyAction } from "redux";
import * as actions from "../../api/api";
import createAuthRefreshInterceptor from "axios-auth-refresh";
const { REACT_APP_BE_URL } = process.env;
const refreshAuthLogic = (failedRequest: any) =>
	axios({
		url: `http://localhost:3001/api/users/refreshToken`,
		withCredentials: true,
		method: "get",
	}).then((tokenRefreshResponse) => {
		return Promise.resolve();
	});

createAuthRefreshInterceptor(axios, refreshAuthLogic);

const api: Middleware = ({ dispatch }: MiddlewareAPI) => (
	next: Dispatch<AnyAction>
) => async (action: AnyAction) => {
	console.log("action is: ", action);
	if (action.type !== actions.apiCall.type) {
		//if action is not for api call,go to the next step
		return next(action);
	}

	const {
		url,
		headers,
		method,
		data,
		onSuccess,
		onStart,
		onError,
	} = action.payload;

	//"onStart" represents loading and makes it true,
	//"onSuccess" action makes it false
	if (onStart) dispatch({ type: onStart });
	//next(action); //we can also delete this. It's for seeing the 'api' action details
	try {
		const response = await axios({
			url,
			method,
			data,
			headers,
			withCredentials: true,
		});

		//General
		dispatch(actions.apiCallSuccess(response.data));
		//Spesific
		if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
	} catch (error) {
		console.log("errorr is: ", error.response.data);
		//General error action
		const errorMessage = error.response.data.errors;
		dispatch(actions.apiCallFailed(errorMessage));

		//Spesific error action
		if (onError) dispatch({ type: onError, payload: errorMessage });
	}
};

export default api;
