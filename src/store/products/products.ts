import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { apiCall } from "../api/api";
import { IProduct } from "../../types/product";
import { IError } from "../../types/error.d";

interface InitialState {
	data: IProduct[] | [];
	errorMessage: IError | null;
	loading: boolean;
}

const initialState: InitialState = {
	data: [],
	errorMessage: null,
	loading: false,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		requested: (state) => ({
			...state,
			loading: true,
		}),
		success: (state, action: PayloadAction<IProduct[]>) => ({
			...state,
			loading: false,
			isLoggedIn: true,
			data: [...action.payload],
		}),

		failed: (state, action: PayloadAction<IError>) => ({
			...state,
			loading: false,
			errorMessage: action.payload,
		}),
	},
});

export const { requested, success, failed } = productsSlice.actions;

export default productsSlice.reducer;

export const getMainProducts = () =>
	apiCall({
		url: `${process.env.REACT_APP_BE_URL}/products`,
		onStart: requested.type,
		onSuccess: success.type,
		onError: failed.type,
	});
