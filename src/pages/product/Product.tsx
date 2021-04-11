import React, { useEffect, useState } from "react";
import { backend } from "../../utils/backend";
import { RouteComponentProps } from "react-router";

import "./product.scss";
import BasicLoader from "../../loaders/spinner/BasicLoader";
import { GENERIC_ERROR_MSG } from "../../utils/constants";
import { IProduct } from "../../types/product.d";
import { Col, Row } from "react-bootstrap";
import CommonCarousel from "../../components/_common/carousel/CommonCarousel";
import { MdStars } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addMultipleProductToCart } from "../../store/cart/shoppingCart";
import { setProductSidebar } from "../../store/productSidebar/productSide";
import HeartbeatLoader from "../../loaders/heartbeat/HeartbeatLoader";
import AddComment from "../../components/comment/AddComment";
interface MatchParams {
	slug: string;
}

interface ProductProps extends RouteComponentProps<MatchParams> {}
function Product(props: ProductProps) {
	const FAKE_DISCOUNT = 30;
	const dispatch = useDispatch();
	const [product, setProduct] = useState<IProduct | null>(null);

	const [qty, setQty] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const getProduct = async () => {
		setLoading(true);
		try {
			const response = await backend({
				url: `/products/slug/${props.match.params.slug}`,
			});
			setProduct(response.data);
			setLoading(false);
		} catch (error) {
			setError(GENERIC_ERROR_MSG);
			setLoading(false);
		}
	};

	const getFakeDiscount = (price: number) => {
		return Math.ceil(price + price * 0.3);
	};

	useEffect(() => {
		getProduct();
	}, []);

	useEffect(() => {
		getProduct();
	}, [props.match.params.slug]);

	const handleAddMultipleProducts = () => {
		dispatch(addMultipleProductToCart(product?._id, product?.price, qty));
		dispatch(setProductSidebar());
	};

	const showLoader = () => {
		return <HeartbeatLoader />;
	};
	const showError = () => {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<span className='text-danger'>{error}</span>
			</div>
		);
	};

	const showProductInfo = () => {
		return (
			<>
				{" "}
				{product && (
					<div className='product-info-wrapper'>
						<div className='product-head mt-3'>
							<p>{product.name}</p>
							<img
								alt={product.name}
								src={product.images[0].url}
							/>
						</div>

						<div className='product-details container'>
							<Row>
								<Col md={6} sm={12}>
									<CommonCarousel showIndicators={false}>
										{product.images.map((image) => {
											return (
												<div key={image._id}>
													<img
														alt={product.name}
														src={image.url}
													/>
												</div>
											);
										})}
									</CommonCarousel>
								</Col>
								<Col md={6} sm={12}>
									<div className='title text-green text-left'>
										<h3> {product.name}</h3>
									</div>
									<div className='d-flex justify-content-between'>
										<span>
											<MdStars />
										</span>
										<span className='fake-discount-value text-danger'>
											% {FAKE_DISCOUNT}
										</span>
									</div>
									<div className='text-green mt-3 d-flex justify-content-between align-items-center'>
										<div className='d-flex float-left'>
											<h6 className='fake-discount mr-4 mt-1 text-danger'>
												{" "}
												{"$" +
													getFakeDiscount(
														product.price
													)}
											</h6>
											<h4>{"$" + product.price}</h4>
										</div>
									</div>

									<p className='description text-gray mt-3'>
										{product.description}
									</p>

									<div className='d-flex cart-actions mt-4 '>
										<div className='d-flex qty-wrapper align-items-center'>
											<button
												className='mr-3'
												onClick={() => {
													qty > 1 && setQty(qty - 1);
												}}>
												-
											</button>
											<span>{qty}</span>
											<button
												className='ml-3'
												onClick={() => {
													qty <= product.quantity &&
														setQty(qty + 1);
												}}>
												+
											</button>
										</div>

										<button
											onClick={handleAddMultipleProducts}
											className='add-to-cart ml-5'>
											Add to Cart +
										</button>
									</div>

									<div className='product-subinfo mt-4'>
										<p className='text-gray mb-1'>
											{" "}
											<strong>Brand: </strong>{" "}
											{product.brand}
										</p>
										<p className='text-gray mb-1'>
											{" "}
											<strong>Category: </strong>{" "}
											{product.category}
										</p>
										<p className='text-gray mb-1'>
											<strong>Type: </strong>
											{product.type}
										</p>

										<p className='text-gray mb-1'>
											<strong>Stock: </strong>
											{product.quantity}
										</p>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				)}
			</>
		);
	};

	const showAddCommentSection = () => {
		return (
			<div className='comment-section container'>
				<AddComment />
			</div>
		);
	};
	return (
		<div className='product-page-wrapper'>
			{loading && showLoader()}
			{error && showError()}
			{!error && !loading && showProductInfo()}
			{product && showAddCommentSection()}
		</div>
	);
}

export default Product;
