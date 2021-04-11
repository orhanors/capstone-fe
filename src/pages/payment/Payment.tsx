import React, { useState } from "react";
import "./payment.scss";
import { FaBookReader, FaShoppingCart, FaCreditCard } from "react-icons/fa";
import PaymentUserInfo from "../../components/paymentUserInfo/PaymentUserInfo";
import Stripe from "../../components/paymentStripe/Stripe";
import PaymentProductList from "../../components/paymentProducts/PaymentProductList";

function Payment() {
	const [page, setPage] = useState(1);
	const showProgress = () => {
		return (
			<div className='progress d-flex justify-content-around'>
				<span className={page >= 1 ? "active" : ""}>
					<FaBookReader />
				</span>
				<span className={page >= 2 ? "active" : ""}>
					<FaShoppingCart />
				</span>
				<span className={page >= 3 ? "active" : ""}>
					<FaCreditCard />
				</span>
			</div>
		);
	};
	const showPageButtons = () => {
		return (
			<>
				{" "}
				{page <= 3 && page > 1 && (
					<button
						onClick={() => {
							page > 1 && setPage(page - 1);
						}}>
						Go Back
					</button>
				)}
				{page < 3 && (
					<button
						onClick={() => {
							page <= 3 && setPage(page + 1);
						}}>
						Next
					</button>
				)}{" "}
			</>
		);
	};
	return (
		<div className='container my-5 payment-page-wrapper h-100'>
			{showProgress()}

			{page === 1 && (
				<div className='mt-5 user-info'>
					<h4 className='text-center mb-3 text-gray'>User Details</h4>
					<PaymentUserInfo />
				</div>
			)}
			{page === 2 && (
				<div className='mt-5 product-info'>
					<h4 className='text-center mb-3 text-gray'>Products</h4>
					<PaymentProductList />
				</div>
			)}
			{page === 3 && (
				<div className='mt-5 cart-info'>
					<h4 className='text-center mb-3 text-gray'>
						Payment Method
					</h4>
					<Stripe />
				</div>
			)}

			<div className='d-flex justify-content-around btn-page'>
				{showPageButtons()}
			</div>
		</div>
	);
}

export default Payment;
