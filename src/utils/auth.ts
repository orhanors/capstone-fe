//import { getCookie } from "./cookies";

export const isAuthUser = () => {
	return localStorage.getItem("isAuthUser") === "true";
};
