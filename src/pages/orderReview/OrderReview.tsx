import React, { useState } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
function OrderReview() {
	const [isExploding, setIsExploding] = useState(true);
	return (
		<div className='w-100 h-100'>
			{" "}
			{isExploding && (
				<div
					className='d-flex justify-content-center align-items-center'
					style={{ marginTop: "20%" }}>
					<ConfettiExplosion
						duration={5000}
						floorHeight={1200}
						particleCount={300}
					/>{" "}
				</div>
			)}
		</div>
	);
}

export default OrderReview;
