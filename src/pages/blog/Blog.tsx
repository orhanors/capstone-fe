import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import ArticleCart from "../../components/articleCart/ArticleCart";
import { backend } from "../../utils/backend";
import { IArticle } from "../../types/article.d";

function Blog() {
	const [articles, setArticles] = useState<IArticle[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const getArticles = async () => {
		try {
			const response = await backend({ url: "/blog?page=1&limit=10" });
			if (response.status === 200) {
				setArticles(response.data);
			} else {
				setError("Something went wrong!");
			}
		} catch (error) {
			setError("Something went wrong!");
		}
	};

	useEffect(() => {
		getArticles();
	}, []);
	return (
		<div className='container mt-5'>
			<Row>
				<Col md={9}>
					<div className='cards'>
						<Row>
							{articles.map((article) => {
								return (
									<Col md={4}>
										<ArticleCart article={article} />
									</Col>
								);
							})}
						</Row>
					</div>
				</Col>

				<Col md={3}>
					<div className='latest'></div>
				</Col>
			</Row>
		</div>
	);
}

export default Blog;
