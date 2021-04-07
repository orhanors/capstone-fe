import React from "react";
import { Row, Col } from "react-bootstrap";

import ArticleCart from "../../components/articleCart/ArticleCart";

function Blog() {
	return (
		<div className='container mt-5'>
			<Row>
				<Col md={9}>
					<div className='cards'>
						<Row>
							<Col md={4}>
								<ArticleCart />
							</Col>

							<Col md={4}>
								<ArticleCart />
							</Col>

							<Col md={4}>
								<ArticleCart />
							</Col>

							<Col md={4}>
								<ArticleCart />
							</Col>

							<Col md={4}>
								<ArticleCart />
							</Col>

							<Col md={4}>
								<ArticleCart />
							</Col>
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
