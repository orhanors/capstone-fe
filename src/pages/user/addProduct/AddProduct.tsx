import { Row, Col } from "react-bootstrap";
import UserLayout from "../../../layouts/userLayout/UserLayout";
import React, { useState, useMemo, useRef } from "react";
import { DropTargetMonitor } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import "./addProduct.scss";
import InputArea from "../../../components/_common/input/InputArea";
import UploadImage from "../../../components/uploadImage/UploadImage";
import ShowImagePreview from "../../../components/uploadImage/ShowImagePreview";
import { GENERIC_ERROR_MSG, MAX_IMG_SIZE } from "../../../utils/constants";
import FileInput from "../../../components/_common/fileInput/FileInput";
import { IProductDetails } from "../../../types/product";
import { validateInput } from "../../../utils/validateInput";
import { backend } from "../../../utils/backend";
import BasicLoader from "../../../loaders/spinner/BasicLoader";
import { Link } from "react-router-dom";
import Notification from "../../../components/_common/notification/Notification";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../store/notification/notification";

const { FILE } = NativeTypes;
function AddProduct() {
	const [productDetails, setProductDetails] = useState<IProductDetails>({
		name: "",
		description: "",
		brand: "",
		price: 0,
		quantity: 0,
	});
	const [uploadedFiles, setUploadedFiles] = useState<Array<File[]>>([]);
	const [error, setError] = useState("");
	const [imgWarning, setImgWarning] = useState(false);
	const [loading, setLoading] = useState(false);

	const accepts = useMemo(() => [FILE], []);
	const dispatch = useDispatch();
	const wrapperRef = useRef<HTMLDivElement>(null);
	/**
	 * Checks product inputs and submits if there is no input error
	 */
	const handleSubmitProductDetails = async () => {
		const { name, brand, description, price, quantity } = productDetails;
		const inputWarning = validateInput({
			name,
			brand,
			description,
			price: String(price),
			quantity: String(quantity),
		});

		if (inputWarning) {
			setError(inputWarning);
		} else if (uploadedFiles.length === 0) {
			setError("You should upload at least one image");
		} else {
			setLoadingActions();

			setError("");
			try {
				const detailsResponse = await backend({
					url: "/products",
					method: "post",
					data: productDetails,
				});
				if (detailsResponse.status === 201) {
					const formData = convertArrayToForm();
					const imageResponse = await backend({
						url: `/products/upload/images/${detailsResponse.data.productId}`,
						data: formData,
						method: "post",
						headers: {
							"content-type": "multipart/form-data",
						},
					});

					if (imageResponse.status === 201) {
						//TODO Push to myProductsPage
						unsetLoadingActions();

						setUploadedFiles([]);
						setProductDetails({
							name: "",
							description: "",
							brand: "",
							price: 0,
							quantity: 0,
						});
						generateSuccessNotification();
					} else {
						setError(GENERIC_ERROR_MSG);
						unsetLoadingActions();
					}
				} else {
					setError(GENERIC_ERROR_MSG);
					unsetLoadingActions();
				}
			} catch (error) {
				setError("Something went wrong");
				setLoading(false);
				console.log("detailsResponse.data: ", error.response.data);
			}
		}
	};

	const handleInputChange = (e: any) => {
		setError("");
		setProductDetails({
			...productDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleFileDrop = (item: any, monitor: DropTargetMonitor) => {
		setImgWarning(false);
		setError("");
		if (monitor) {
			const uploadedImage = monitor.getItem<{ files: File[] }>().files;

			const foundImage = hasImageExist(uploadedImage);
			if (foundImage) {
				setImgWarning(true);
			} else {
				setUploadedFiles([...uploadedFiles, uploadedImage]);
			}
		}
	};

	const handleNormalUpload = (e: any) => {
		setImgWarning(false);
		setError("");
		const uploadedImage = new Array(e.target.files[0]);

		const foundImage = hasImageExist(uploadedImage);
		if (foundImage) {
			setImgWarning(true);
		} else {
			setUploadedFiles([...uploadedFiles, uploadedImage]);
		}
	};

	const handleDeleteImage = (e: any) => {
		const newFiles = uploadedFiles.filter(
			(file) => file[0].name !== e.target.id
		);
		setImgWarning(false);
		setUploadedFiles(newFiles);
	};

	const hasImageExist = (uploadedImage: File[]) => {
		const foundImage = uploadedFiles.find(
			(file) =>
				file[0].name === uploadedImage[0].name &&
				file[0].size === uploadedImage[0].size
		);

		return foundImage;
	};

	const isDroppable = () => {
		return uploadedFiles.length < MAX_IMG_SIZE;
	};
	const convertArrayToForm = () => {
		const formData = new FormData();
		uploadedFiles.forEach((file) => {
			formData.append("product", file[0]);
		});

		return formData;
	};
	const generateSuccessNotification = () => {
		const notify = {
			message: "Successfully created! Go to",
			link: { to: "/myProducts", content: "my products" },
		};
		dispatch(setNotification(notify));
	};

	const setLoadingActions = () => {
		setLoading(true);
		wrapperRef.current?.classList.add("loading");
	};

	const unsetLoadingActions = () => {
		setLoading(false);
		wrapperRef.current?.classList.remove("loading");
	};
	const showImagePreviews = () => {
		return (
			<div className='img-previews-container mx-3 my-3'>
				<Row>
					{uploadedFiles.map((file) => {
						return (
							<Col
								key={file[0].name + file[0].size}
								md={isDroppable() ? 4 : 6}
								sm={12}>
								<div className='img-preview'>
									<ShowImagePreview
										file={file}
										imgClassName='img-product m-1'
										id={file[0].name}
										deleteImage={(e) =>
											handleDeleteImage(e)
										}
									/>
								</div>
							</Col>
						);
					})}
				</Row>
			</div>
		);
	};

	const getProductImgs = () => {
		return (
			<div className='product-images'>
				{isDroppable() && (
					<>
						<div className='img-upload-options'>
							<UploadImage
								accepts={accepts}
								onDrop={handleFileDrop}>
								<FileInput onChange={handleNormalUpload} />
							</UploadImage>
						</div>

						<p className='text-center w-100 text-secondary'>
							You can upload maximum 6 images!
						</p>

						{imgWarning && (
							<p className='text-center w-100 text-danger'>
								Image already exist!
							</p>
						)}
					</>
				)}

				{showImagePreviews()}
			</div>
		);
	};

	const getProductInfo = () => {
		const { name, brand, description, price, quantity } = productDetails;
		return (
			<div className='product-info p-5'>
				{error && (
					<p className='text-center w-100 text-danger'>{error}</p>
				)}

				<InputArea
					required
					name='name'
					onChange={handleInputChange}
					value={name}
					label='Name'
					type='text'
				/>

				<InputArea
					required
					name='brand'
					onChange={handleInputChange}
					value={brand}
					label='Brand'
					type='text'
				/>

				<InputArea
					required
					name='price'
					onChange={handleInputChange}
					value={price}
					label='Price'
					type='number'
				/>

				<InputArea
					required
					name='quantity'
					onChange={handleInputChange}
					value={quantity}
					label='Quantity'
					type='number'
				/>

				<InputArea
					required
					name='description'
					onChange={handleInputChange}
					value={description}
					label='Description'
					type='textarea'
				/>

				<button onClick={handleSubmitProductDetails}>submit</button>
			</div>
		);
	};
	return (
		<div ref={wrapperRef} className='add-product-container'>
			<UserLayout>
				<Row>
					<Col md={6} sm={12}>
						{getProductInfo()}
						{loading && (
							<div className='loader-container'>
								<BasicLoader />
							</div>
						)}
					</Col>
					<Col md={6} sm={12}>
						{getProductImgs()}
						{loading && (
							<div className='loader-container'>
								<BasicLoader />
							</div>
						)}
					</Col>
				</Row>
			</UserLayout>
		</div>
	);
}

export default AddProduct;
