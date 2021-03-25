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

interface Props {
	product: IProduct;
}

const ProductCart = (props: Props) => {
	const { product } = props;
	const dispatch = useDispatch();
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
	return (
		<div
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{ opacity: `${isDragging ? "0.5" : "1"}` }}
			className='product-cart-container m-2'>
			<div className='img-wrapper'>
				<img alt='product-img' src={product.images[0].url} ref={drag} />
				{!isDragging && (
					<div className='like-icon'>
						<span>
							<GrFavorite />{" "}
						</span>
					</div>
				)}
				{hovered && (
					<div className='icon-container fadeInBottom'>
						<span>
							{" "}
							<HiOutlineShoppingCart />
						</span>
						<span>
							{" "}
							<HiLink />{" "}
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductCart;
