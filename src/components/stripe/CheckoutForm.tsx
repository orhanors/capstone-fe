import React, { useMemo } from "react";
import useResponsiveFontSize from "../../hooks/useResponsiveFontSize";
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	Elements,
} from "@stripe/react-stripe-js";
import "./stripe.scss";
import { PaymentMethodCreateParams } from "@stripe/stripe-js";
import { useSelector } from "../../store/_helpers/useCustomSelector";

const useOptions = () => {
	const fontSize = useResponsiveFontSize();
	const options = useMemo(
		() => ({
			style: {
				base: {
					fontSize,
					color: "#424770",
					letterSpacing: "0.025em",
					fontFamily: "Source Code Pro, monospace",
					"::placeholder": {
						color: "#aab7c4",
					},
				},
				invalid: {
					color: "#9e2146",
				},
			},
		}),
		[fontSize]
	);

	return options;
};

function CheckoutForm() {
	const { data } = useSelector((store) => store.user);
	const stripe = useStripe();
	const elements = useElements();
	const options = useOptions();

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}
		const billing_details: PaymentMethodCreateParams.BillingDetails = {
			email: data.email,
			name: data.name + " " + data.surname,
		};

		const payload = await stripe.createPaymentMethod({
			type: "card",
			//@ts-ignore
			card: elements.getElement(CardNumberElement),
			billing_details,
		});

		console.log("[PaymentMethod]", payload);
	};
	const getCheckoutForm = () => {
		return (
			<form onSubmit={handleSubmit} className='d-flex flex-column'>
				<label>
					Card number
					<CardNumberElement
						options={options}
						onReady={() => {
							console.log("CardNumberElement [ready]");
						}}
						onChange={(event) => {
							console.log("CardNumberElement [change]", event);
						}}
						onBlur={() => {
							console.log("CardNumberElement [blur]");
						}}
						onFocus={() => {
							console.log("CardNumberElement [focus]");
						}}
					/>
				</label>
				<label>
					Expiration date
					<CardExpiryElement
						options={options}
						onReady={() => {
							console.log("CardNumberElement [ready]");
						}}
						onChange={(event) => {
							console.log("CardNumberElement [change]", event);
						}}
						onBlur={() => {
							console.log("CardNumberElement [blur]");
						}}
						onFocus={() => {
							console.log("CardNumberElement [focus]");
						}}
					/>
				</label>
				<label>
					CVC
					<CardCvcElement
						options={options}
						onReady={() => {
							console.log("CardNumberElement [ready]");
						}}
						onChange={(event) => {
							console.log("CardNumberElement [change]", event);
						}}
						onBlur={() => {
							console.log("CardNumberElement [blur]");
						}}
						onFocus={() => {
							console.log("CardNumberElement [focus]");
						}}
					/>
				</label>
				<button type='submit' disabled={!stripe}>
					Pay
				</button>
			</form>
		);
	};
	return <div className='checkout-form'>{getCheckoutForm()}</div>;
}

export default CheckoutForm;
