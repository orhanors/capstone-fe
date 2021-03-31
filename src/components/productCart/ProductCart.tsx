import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import "./productCart.scss";
import { useDispatch } from "react-redux";
import { setProductSidebar } from "../../store/productSidebar/productSide";
import { IProduct } from "../../types/product";
import { GrFavorite } from "react-icons/gr"; //empty heart
import { MdFavorite } from "react-icons/md"; //filled heart
import { HiOutlineShoppingCart, HiLink } from "react-icons/hi"; //cart

import "../../style/animations.scss";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../store/cart/shoppingCart";
import { setNotification } from "../../store/notification/notification";
import { useSelector } from "../../store/_helpers/useCustomSelector";

interface Props {
	product: IProduct;
}

const ProductCart = (props: Props) => {
	const { product } = props;
	const dispatch = useDispatch();
	const { productSidebar } = useSelector((store) => store);
	const [hovered, setHovered] = useState(false);
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: product,
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	useEffect(() => {
		if (isDragging) {
			dispatch(setProductSidebar());
		}
	}, [isDragging]);

	const generateSuccessNotification = () => {
		const notify = {
			message: "Successfully added to cart!",
			behavior: "good",
		};
		dispatch(setNotification(notify));
	};
	const handleAddToCart = () => {
		dispatch(addProductToCart(product._id, product.price));
		if (!productSidebar) {
			generateSuccessNotification();
		}
		//dispatch(setProductSidebar());
	};

	return (
		<div
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{ opacity: `${isDragging ? "0.5" : "1"}` }}
			className='product-cart-container m-2'>
			<div className='img-wrapper'>
				<img
					title='Drag and drop or add to cart'
					alt='product-img'
					src={
						hovered && product.images[1]
							? product.images[1].url
							: product.images[0].url
					}
					ref={drag}
				/>
				{!isDragging && (
					<div className='like-icon'>
						<span>
							<GrFavorite />{" "}
						</span>
					</div>
				)}
				{hovered && (
					<div className='icon-container fadeInBottom'>
						<span onClick={handleAddToCart}>
							{" "}
							<HiOutlineShoppingCart />
						</span>
						<Link to={`/products/${product.slug}`}>
							<span>
								{" "}
								<HiLink />{" "}
							</span>
						</Link>
					</div>
				)}
			</div>

			<div className='p-details'>
				<p className='text-black p-name'>{product.name}</p>
				<p className='text-gray p-name'>{"$" + product.price}</p>
			</div>
		</div>
	);
};

export default ProductCart;
