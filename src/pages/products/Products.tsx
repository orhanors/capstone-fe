import React, { useEffect } from "react";
import "./products.scss";

import ProductList from "../../components/productList/ProductList";
import { useSelector } from "../../store/_helpers/useCustomSelector";
function Products() {
	const { productSidebar } = useSelector((store) => store);
	return (
		<div style={{ marginRight: `${productSidebar ? "30%" : ""}` }}>
			<ProductList />
		</div>
	);
}

export default Products;
