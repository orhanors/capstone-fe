import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store/_helpers/useCustomSelector";
import { Link } from "react-router-dom";
import "../../../style/animations.scss";
import "./notification.scss";
import { unsetNotification } from "../../../store/notification/notification";
import { NOTIFICATION_TIME } from "../../../utils/constants";
import { addProductToCart } from "../../../store/cart/shoppingCart";
import { FcApproval, FcInfo } from "react-icons/fc";
function Notification() {
	const dispatch = useDispatch();
	const notifyRef = useRef<HTMLDivElement>(null);
	const successColor = "#51A351";
	const failColor = "#202124";
	const { show, message, link, behavior, undo, product } = useSelector(
		(store) => store.notification
	);

	const handleClose = () => {
		dispatch(unsetNotification());
	};
	const handleUndo = () => {
		dispatch(addProductToCart(product!?.id, product!?.price));
		dispatch(unsetNotification());
	};
	useEffect(() => {
		if (show && behavior !== "warning") {
			setTimeout(() => {
				dispatch(unsetNotification());
			}, NOTIFICATION_TIME);
		}
	}, [show]);
	return (
		<>
			{show && (
				<div
					ref={notifyRef}
					className='notification-wrapper fadeInBottom'
					style={{
						backgroundColor: `${
							behavior === "good" ? successColor : failColor
						}`,
						color: "white",
					}}>
					<div className='notify-content-wrapper d-flex align-items-center'>
						<div className='close' onClick={handleClose}>
							X
						</div>
						<div className='content mb-2'>
							{behavior === "good" && (
								<span className='approve-icon'>
									<FcApproval />
								</span>
							)}
							{behavior === "warning" && (
								<span className='info-icon mr-1'>
									<FcInfo />
								</span>
							)}
							{message}
							{link && (
								<span
									onClick={() =>
										dispatch(unsetNotification())
									}>
									<Link to={link.to} className='notify-link'>
										{" " + link.content}
									</Link>
								</span>
							)}

							{undo && (
								<button onClick={handleUndo} className='ml-2'>
									Undo
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Notification;
