import React from "react";
import { Row, Col } from "react-bootstrap";
import "./paymentUser.scss";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { Link } from "react-router-dom";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
function PaymentUserInfo() {
	const { data } = useSelector((store) => store.user);

	const checkField = (field: any, message: string) => {
		return (
			<span>
				{field ? (
					field
				) : (
					<span>
						<small className='text-danger'>
							You don't have a phone number!
						</small>{" "}
					</span>
				)}
			</span>
		);
	};
	const showUserBasicInfo = () => {
		return (
			<div className='info-card'>
				<div className='basic-info'>
					<div className='d-flex justify-content-between'>
						<div>
							<div className='d-flex'>
								<span className='mr-2'>
									<FaUserAlt />{" "}
								</span>
								<h5 className='text-center text-gray'>
									Personal Details
								</h5>
							</div>
						</div>

						<div>
							<Link to='/editProfile'>
								<span className='edit-icon'>
									<FaUserEdit />
								</span>
							</Link>
						</div>
					</div>
					<hr />
					<div>
						<small>
							<strong> Full Name: </strong>
						</small>{" "}
						{data.name + " " + data.surname}
					</div>
					<div>
						<small>
							<strong> Email: </strong>
						</small>{" "}
						{data.email}
					</div>
					<div>
						<small>
							<strong> Phone: </strong>
						</small>{" "}
						{checkField(
							data.phone,
							"You don't have a phone number!"
						)}
					</div>
				</div>
			</div>
		);
	};

	const showUserAddressInfo = () => {
		return (
			<div className='info-card'>
				<div className='address-info'>
					<div className='d-flex justify-content-between'>
						<div>
							<div className='d-flex'>
								<span className='mr-2'>
									<MdLocationOn />{" "}
								</span>
								<h5 className='text-center text-gray'>
									Address Details
								</h5>
							</div>
						</div>

						<div>
							<Link to='/editProfile'>
								<span className='edit-icon'>
									<FaUserEdit />
								</span>
							</Link>
						</div>
					</div>
					<hr />
					{data.address && data.address.country ? (
						<div>
							<div>
								<small>
									<strong>Country: </strong>
								</small>{" "}
								{data.address?.country}
							</div>

							<div>
								<small>
									<strong>City: </strong>
								</small>{" "}
								{data.address?.city}
							</div>

							<div>
								<small>
									<strong>Line1: </strong>
								</small>{" "}
								{data.address?.line1}
							</div>

							<div>
								<small>
									<strong>Line2: </strong>
								</small>{" "}
								{data.address?.line2}
							</div>

							<div>
								<small>
									<strong>Postal Code: </strong>
								</small>{" "}
								{data.address?.postalCode}
							</div>
						</div>
					) : (
						<p className='text-center'>
							You don't have any address information.
							<Link to='/editProfile'>Add new address</Link>
						</p>
					)}
				</div>
			</div>
		);
	};
	return (
		<div className='payment-user-info-container'>
			<Row>
				<Col md={12}>{showUserBasicInfo()}</Col>
				<Col md={12}>{showUserAddressInfo()}</Col>
			</Row>
		</div>
	);
}

export default PaymentUserInfo;
