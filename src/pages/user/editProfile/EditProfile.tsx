import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import InputArea from "../../../components/_common/input/InputArea";
import UserLayout from "../../../layouts/userLayout/UserLayout";
import { IAddress, IUser } from "../../../types/user";
import { useSelector } from "../../../store/_helpers/useCustomSelector";
import "./editProfile.scss";
import CountryList from "../../../components/_common/countries/CountryList";
import { validateInput } from "../../../utils/validateInput";
import { backend } from "../../../utils/backend";
function EditProfile() {
	const { data } = useSelector((store) => store.user);
	const initialPrimitiveState: IUser = {
		name: "",
		surname: "",
		email: "",
		phone: "",
	};

	const initialAddressState: IAddress = {
		country: "",
		city: "",
		line1: "",
		line2: "",
		postalCode: 0,
	};
	const [userDetails, setUserDetails] = useState<IUser>(
		initialPrimitiveState
	);
	const [addressDetails, setAddressDetails] = useState<IAddress>(
		initialAddressState
	);
	const [warningPrimitive, setWarningPrimitive] = useState("");
	const [warningAddress, setWarningAddress] = useState("");
	useEffect(() => {
		if (data.name) {
			setUserDetails({
				name: data.name,
				surname: data.surname,
				email: data.email,
				phone: data.phone || "+9",
			});

			if (data.address) {
				setAddressDetails({
					country: data.address.country,
					city: data.address.city,
					line1: data.address.line1,
					line2: data.address.line2,
					postalCode: data.address.postalCode,
				});
			}
		}
	}, [data.name]);

	const handleSubmit = async () => {
		setWarningPrimitive("");
		setWarningAddress("");
		const { name, surname, email, phone } = userDetails;
		const { country, city, line1, line2, postalCode } = addressDetails;
		const inputWarningPrimitive = validateInput({
			name,
			surname,
			email,
			phone,
		});

		const inputWarningAddress = validateInput({
			country,
			city,
			line1,
			line2,
			postalCode: String(postalCode),
		});

		if (inputWarningPrimitive) {
			setWarningPrimitive(inputWarningPrimitive);
		} else if (inputWarningAddress) {
			setWarningAddress(inputWarningAddress);
		} else {
			const body = {
				name,
				surname,
				email,
				phone,
				address: {
					country,
					city,
					line1,
					line2,
					postalCode: Number(postalCode),
				},
			};
			const response = await backend({
				url: "/users/me/edit",
				data: body,
				method: "put",
			});

			if (response.status === 201) {
				console.log(response);
			}
		}
	};
	const handlePersonalInputChange = (e: any) => {
		setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
	};

	const handleAddressInputChange = (e: any) => {
		setAddressDetails({
			...addressDetails,
			[e.target.name]: e.target.value,
		});
	};
	const showPrimitiveInfo = () => {
		const { name, surname, email, phone } = userDetails;
		return (
			<>
				<InputArea
					name='name'
					onChange={handlePersonalInputChange}
					value={name}
					label='Name'
					type='text'
				/>
				<InputArea
					name='surname'
					onChange={handlePersonalInputChange}
					value={surname}
					label='Surname'
					type='text'
				/>
				<InputArea
					name='email'
					onChange={handlePersonalInputChange}
					value={email}
					label='Email'
					type='email'
				/>
				<InputArea
					name='phone'
					onChange={handlePersonalInputChange}
					value={phone}
					label='Phone'
					type='text'
				/>
			</>
		);
	};

	const showAddressDetails = () => {
		const { country, city, line1, line2, postalCode } = addressDetails;

		return (
			<>
				<label>Country</label>
				<CountryList
					onSelect={handleAddressInputChange}
					name='country'
					defaultValue={country}
				/>

				<InputArea
					name='city'
					onChange={handleAddressInputChange}
					value={city}
					label='City'
					type='text'
				/>

				<InputArea
					name='line1'
					onChange={handleAddressInputChange}
					value={line1}
					label='Line1'
					type='text'
				/>

				<InputArea
					name='line2'
					onChange={handleAddressInputChange}
					value={line2}
					label='Line2'
					type='text'
				/>

				<InputArea
					name='postalCode'
					onChange={handleAddressInputChange}
					value={postalCode}
					label='Postal Code'
					type='number'
				/>
			</>
		);
	};
	return (
		<UserLayout>
			<div className='edit-profile-wrapper'>
				<Row>
					<Col md={6} sm={12}>
						<div className='primitive-info'>
							<h4 className='text-center mb-1'>Personal Info</h4>
							{warningPrimitive && (
								<small className='text-center text-danger'>
									{warningPrimitive}
								</small>
							)}
							{showPrimitiveInfo()}
						</div>
					</Col>
					<Col md={6} sm={12}>
						<div className='address-details'>
							<h4 className='text-center mb-1'>
								Address Details
							</h4>
							{warningAddress && (
								<div className='w-100'>
									{" "}
									<small className='text-center text-danger'>
										{warningAddress}
									</small>
								</div>
							)}
							{showAddressDetails()}

							<button
								className='w-100 mt-3'
								onClick={handleSubmit}>
								Submit
							</button>
						</div>
					</Col>
				</Row>
			</div>
		</UserLayout>
	);
}

export default EditProfile;
