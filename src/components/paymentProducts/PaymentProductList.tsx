import React from "react";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { IShoppingCart } from "../../types/cart.d";
import CartItem from "../cartItem/CartItem";
import HeartbeatLoader from "../../loaders/heartbeat/HeartbeatLoader";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";
function PaymentProductList() {
	const { cart, user } = useSelector((store) => store);
	const { loading } = cart;
	const getProducts = () => {
		//console.log(cart?.data!.products);
		return (cart.data as IShoppingCart)?.products;
	};

	return (
		<div>
			{loading && <HeartbeatLoader />}
			{!loading &&
				getProducts()?.length > 0 &&
				getProducts().map((product) => (
					<CartItem
						key={product._id + "payment"}
						productInfo={product}
					/>
				))}

			{getProducts()?.length === 0 ||
				(!getProducts() && (
					<div className='w-100'>
						{" "}
						<h5 className='text-center mt-4'>
							{" "}
							<strong>{user.data.name}</strong>,your cart is empty
							<br />
							<br />
							<small className='text-center w-100'>
								{" "}
								<GoInfo /> Go to{" "}
								<Link to='/products'>products</Link> page and
								add new products to your cart
							</small>
						</h5>
					</div>
				))}
		</div>
	);
}

export default PaymentProductList;
