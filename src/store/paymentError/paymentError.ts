import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const slice = createSlice({
	name: "paymentError",
	initialState,
	reducers: {
		setProductSidebar: (state) => true,
		unsetProductSidebar: (state) => false,
	},
});

export const { setProductSidebar, unsetProductSidebar } = slice.actions;
export default slice.reducer;
