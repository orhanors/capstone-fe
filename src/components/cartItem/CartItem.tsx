import React, { useCallback, useEffect } from "react";
import "./cartItem.scss";
import { IProduct } from "../../types/product.d";
import { ICartItem } from "../../types/cart";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
	addProductToCart,
	decreaseItemFromCart,
	removeItemFromCart,
} from "../../store/cart/shoppingCart";
interface Props {
	productInfo: ICartItem;
}
function CartItem(props: Props) {
	const { productInfo } = props;
	const { product, qty } = productInfo;
	const dispatch = useDispatch();

	const handleAddItem = () => {
		dispatch(addProductToCart(product._id, product.price));
	};

	const handleIncreaseItem = () => {
		dispatch(decreaseItemFromCart(product._id, product.price));
	};

	const handleRemoveItem = () => {
		dispatch(removeItemFromCart(product._id, product.price, qty));
	};
	return (
		<div className='cart-item-wrapper my-4 mx-4 d-flex justify-content-between'>
			<div className='item-details d-flex flex-row'>
				{product?.images?.length > 0 && (
					<img
						className='cart-item-img'
						alt={product?.name}
						src={product?.images[0].url}
					/>
				)}

				<div className='d-flex flex-column mt-2'>
					<p className='title'>
						{product?.name?.length <= 7
							? product?.name + "abcdef"
							: product?.name + "..."}
					</p>
					<p className='price'>{"$" + product.price}</p>
				</div>
			</div>

			<div className='item-qty d-flex flex-column'>
				<span onClick={handleAddItem}>
					{" "}
					<IoIosArrowUp />{" "}
				</span>
				<p className='qty text-center'>{qty}</p>
				<span onClick={handleIncreaseItem}>
					{" "}
					<IoIosArrowDown />{" "}
				</span>
			</div>

			<div
				onClick={handleRemoveItem}
				className='d-flex justify-content-center align-items-center'>
				<AiOutlineCloseCircle />
			</div>
		</div>
	);
}

export default CartItem;
