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

function ProductsSidebar() {
	const dispatch = useDispatch();
	const [cart, setCart] = useState([]);
	const { productSidebar } = useSelector((state) => state);
	const [isDropped, setIsDropped] = useState(false);
	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: (item, monitor) => {
			//@ts-ignore
			setCart([...cart, item.name]);
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
		}
	}, [productSidebar]);

	useEffect(() => {
		if (isDropped) {
			dispatch(setProductSidebar());
		}
		console.log("isDropped", isDropped);
	}, [isDropped]);
	return (
		<div ref={sideRef} id='mySidebar' className='sidebar'>
			<span
				className='closebtn'
				onClick={() => dispatch(unsetProductSidebar())}>
				<TiArrowBackOutline />
			</span>
			<div
				ref={drop}
				className='products'
				style={{ backgroundColor: `${isOver ? "green" : "inherit"}` }}>
				{cart.map((item) => (
					<h4 key={item}>{item}</h4>
				))}
			</div>
		</div>
	);
}

export default memo(ProductsSidebar);
