import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store/_helpers/useCustomSelector";
import { Link } from "react-router-dom";
import "../../../style/animations.scss";
import "./notification.scss";
import { unsetNotification } from "../../../store/notification/notification";
function Notification() {
	const dispatch = useDispatch();
	const notifyRef = useRef<HTMLDivElement>(null);
	const successColor = "";
	const failColor = "";
	const { show, message, link, behavior } = useSelector(
		(store) => store.notification
	);

	const handleClose = () => {
		dispatch(unsetNotification());
	};
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
					}}>
					<div className='notify-content-wrapper'>
						<span onClick={handleClose}>X</span>
						<div className='content'>
							{message}

							{link && (
								<Link to={link.to}>{" " + link.content}</Link>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Notification;
