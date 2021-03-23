const common = {
	orders: "Orders",
	reviews: "Reviews",
	edit: "Edit Profile",
	creditCart: "Credit Cards",
	help: "Help",
};

export const userPages = { ...common, wishlist: "Wishlist" };

export const sellerPages = {
	addProduct: "Add Product",
	myProducts: "My Products",
	...common,
};
