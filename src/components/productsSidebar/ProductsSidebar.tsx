import React, { useEffect, useRef, memo, useState } from "react";
import { useDispatch } from "react-redux";
import {
	setProductSidebar,
	unsetProductSidebar,
} from "../../store/productSidebar/productSide";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { TiArrowBackOutline } from "react-icons/ti";
import { useDrop } from "react-dnd";
import "./prosidebar.scss";
import { ItemTypes } from "../../utils/items";
import {
	addProductToCart,
	getShoppingCart,
} from "../../store/cart/shoppingCart";
import { IProduct } from "../../types/product.d";
import CartItem from "../cartItem/CartItem";
import products from "../../store/products/products";
import { IShoppingCart } from "../../types/cart";
import BasicLoader from "../../loaders/spinner/BasicLoader";

function ProductsSidebar() {
	const dispatch = useDispatch();
	const { productSidebar, cart, user } = useSelector((state) => state);

	const { loading } = cart;
	const [isDropped, setIsDropped] = useState(false);
	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: (item: IProduct, monitor) => {
			dispatch(addProductToCart(item._id, item.price));
		},
		collect: (monitor: any) => ({
			isOver: monitor.isOver(),
		}),
	});

	const sideWidth = "450px";
	const sideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (productSidebar) {
			sideRef.current!.style.width = sideWidth;
			dispatch(getShoppingCart());
		}
	}, [productSidebar]);

	useEffect(() => {
		if (isDropped) {
			dispatch(setProductSidebar());
			dispatch(getShoppingCart());
		}
		console.log("isDropped", isDropped);
	}, [isDropped]);

	const getProducts = () => {
		//console.log(cart?.data!.products);
		return (cart.data as IShoppingCart)?.products;
	};
	return (
		<div ref={sideRef} id='mySidebar' className='sidebar'>
			<span
				className='closebtn'
				onClick={() => dispatch(unsetProductSidebar())}>
				<TiArrowBackOutline />
			</span>
			<h4 className='text-center text-green'>Shopping Cart</h4>
			{getProducts()?.length > 0 && (
				<p className='text-right mr-5' style={{ fontSize: "1rem" }}>
					{" "}
					<strong>Total:</strong> {"$" + cart.data?.total}
				</p>
			)}
			{getProducts()?.length === 0 && !isOver && (
				<p
					className='d-flex align-items-center justify-content-center w-100 mt-5'
					style={{ fontSize: "1rem" }}>
					<strong>{user.data.name + ", "}</strong> your cart is empty!
				</p>
			)}
			{loading ? (
				<div className='d-flex justify-content-center align-items-center w-100 h-100'>
					<BasicLoader variant='warning' animation='grow' />
				</div>
			) : (
				<div
					ref={drop}
					className='products'
					style={{
						backgroundColor: `${
							isOver ? "rgba(209, 209, 209, 0.514)" : "inherit"
						}`,
					}}>
					{getProducts()?.length > 0 &&
						getProducts().map((product) => {
							return (
								<CartItem
									//refresh={}
									key={product._id}
									productInfo={product}
								/>
							);
						})}
				</div>
			)}
		</div>
	);
}

export default memo(ProductsSidebar);
