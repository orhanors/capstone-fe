import { IUser } from "./user";

export interface IProduct extends IProductDetails {
	_id: string;
	images: any[];
	seller: IUser;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProductDetails {
	name: string;
	brand: string;
	description: string;
	price: number;
	quantity: number;
	category: string;
	type: string;
}
