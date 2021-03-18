import React, { memo } from "react";
import ProductCart from "../productCart/ProductCart";

function Products() {
	return (
		<div>
			<ProductCart name='Product1' />
			<ProductCart name='Product2' />
			<ProductCart name='Product3' />
		</div>
	);
}

export default memo(Products);
