export interface IUserStore {
	data: IUser;
	isLoggedIn: boolean;
	errorMessage: string;
	loading: boolean;
}

export interface IUser {
	_id: string;
	role: string;
	name: string;
	surname: string;
	image: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}
