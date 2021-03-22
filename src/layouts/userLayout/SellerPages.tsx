import React from "react";
import { Link } from "react-router-dom";
import { sellerPages } from "../../utils/userPages";
import UserPages from "./UserPages";
import { RiShoppingBasketFill, RiAddCircleFill } from "react-icons/ri";

function SellerPages() {
	return (
		<div>
			<UserPages>
				<Link to='addProduct'>
					<div className='user-page'>
						<span className='user-page-icon mr-2'>
							<RiAddCircleFill />
						</span>
						{sellerPages.addProduct}
					</div>
				</Link>

				<Link to='myProducts'>
					<div className='user-page'>
						<span className='user-page-icon mr-2'>
							<RiShoppingBasketFill />
						</span>
						{sellerPages.myProducts}
					</div>
				</Link>
			</UserPages>
		</div>
	);
}

export default SellerPages;
