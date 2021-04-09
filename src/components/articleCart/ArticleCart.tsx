import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import "./articleCart.scss";
import { IArticle } from "../../types/article.d";
import { Link } from "react-router-dom";

interface ArticleProps {
	article: IArticle;
}
function ArticleCart(props: ArticleProps) {
	const { article } = props;
	const [headerImg, setHeaderImg] = useState<string | undefined>("");
	const [slug, setSlug] = useState("");

	const firstImg = () => {
		const imgRegex = /<img[^>\/]*src=("(?:[^\"]*)"|'(?:[^\']*)'|(?:[^=<>\s\"\'`]+))/;

		const imgUrlString = article.content.match(imgRegex);
		const imgUrl = imgUrlString?.[1].substring(
			1,
			imgUrlString?.[1].length - 1
		);
		console.log(imgUrl);
		setHeaderImg(imgUrl);
	};
	useEffect(() => {
		firstImg();
	});
	return (
		<Tilt tiltAxis='y'>
			<div className='article-cart-container my-2'>
				<Link to={`/blog/${article.slug}`}>
					<img alt='product' src={headerImg} />
				</Link>
			</div>
		</Tilt>
	);
}

export default ArticleCart;
