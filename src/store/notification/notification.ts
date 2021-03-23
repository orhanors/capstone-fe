import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../../types/notification.d";

const initialState: INotification = {
	message: "",
	show: false,
};

const slice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification: (state, action: PayloadAction<INotification>) => ({
			...state,
			message: action.payload.message,
			show: true,
			link: action.payload.link,
		}),
		unsetNotification: (state) => ({
			message: "",
			show: false,
			behavior: "good",
		}),
	},
});

export const { setNotification, unsetNotification } = slice.actions;
export default slice.reducer;
