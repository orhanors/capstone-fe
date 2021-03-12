import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { unsetProductSidebar } from "../../store/productSidebar/productSide";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { TiArrowBackOutline } from "react-icons/ti";
import "./prosidebar.scss";
function ProductsSidebar() {
	const sideWidth = "450px";
	const sideRef = useRef<HTMLDivElement>(null);
	const { productSidebar } = useSelector((state) => state);
	const dispatch = useDispatch();

	const mountedStyle = {
		animation: "inAnimation 250ms ease-in",
	};
	const unmountedStyle = {
		animation: "outAnimation 270ms ease-out",
		animationFillMode: "forwards",
	};

	useEffect(() => {
		if (productSidebar) {
			sideRef.current!.style.width = sideWidth;
		}
	}, [productSidebar]);

	return (
		<div
			ref={sideRef}
			id='mySidebar'
			className='sidebar'
			style={productSidebar ? mountedStyle : unmountedStyle}>
			<span
				className='closebtn'
				onClick={() => dispatch(unsetProductSidebar())}>
				<TiArrowBackOutline />
			</span>
			<div>Test</div>
			<div>Test</div>
			<div>Test</div>
			<div>Test</div>
			<div>Test</div>
		</div>
	);
}

export default ProductsSidebar;
