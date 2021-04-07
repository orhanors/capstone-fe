import React from "react";
import Tilt from "react-parallax-tilt";
import "./articleCart.scss";
function ArticleCart() {
	return (
		<Tilt tiltAxis='y'>
			<div className='article-cart-container my-2'>
				<img
					alt='product'
					src='https://www.wework.com/ideas/wp-content/uploads/sites/4/2018/05/Medinas-HERO.jpg'
				/>
			</div>
		</Tilt>
	);
}

export default ArticleCart;
