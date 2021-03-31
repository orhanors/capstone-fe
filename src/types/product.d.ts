import { IUser } from "./user";

export interface IProduct extends IProductDetails {
	_id: string;
	images: Image[];
	seller: IUser;
	createdAt: string;
	updatedAt: string;
}

export interface IProductDetails {
	name: string;
	brand: string;
	description: string;
	price: number;
	quantity: number;
	category: string;
	slug: string;
	type: string;
}

interface Image {
	_id: string;
	url: string;
	id: string;
}
