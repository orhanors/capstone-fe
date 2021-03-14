import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import "./productCart.scss";
import { useDispatch } from "react-redux";
import {
	setProductSidebar,
	unsetProductSidebar,
} from "../../store/productSidebar/productSide";

interface Props {
	name: string;
}

const ProductCart = (props: Props) => {
	const dispatch = useDispatch();
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: { name: props.name },
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
			style={{ opacity: `${isDragging ? "0.5" : "1"}` }}
			className='product-cart-container m-2'
			ref={drag}>
			{props.name}
		</div>
	);
};

export default ProductCart;
