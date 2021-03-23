import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

export const validateInput = (
	requiredFields: object,
	allRequired?: boolean,
	email?: string
) => {
	for (let [field, value] of Object.entries(requiredFields)) {
		//field==="0" means empty number
		if (isEmpty(value) || value === "0") {
			if (allRequired) return "All fields are required!";
			return `${field} is required!`;
		}
	}

	if (email) {
		if (isEmail(email)) {
			return false;
		} else {
			return "Invalid email format!";
		}
	}

	return false;
};
