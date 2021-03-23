import { Row, Col } from "react-bootstrap";
import UserLayout from "../../../layouts/userLayout/UserLayout";
import React, { useState, useMemo } from "react";
import { DropTargetMonitor } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import "./addProduct.scss";
import InputArea from "../../../components/_common/input/InputArea";
import UploadImage from "../../../components/uploadImage/UploadImage";
import ShowImagePreview from "../../../components/uploadImage/ShowImagePreview";
import { MAX_IMG_SIZE } from "../../../utils/constants";
import FileInput from "../../../components/_common/fileInput/FileInput";

const { FILE } = NativeTypes;
function AddProduct() {
	const [uploadedFiles, setUploadedFiles] = useState<Array<File[]>>([]);
	const accepts = useMemo(() => [FILE], []);
	const [warning, setWarning] = useState(false);

	const isImageExist = (uploadedImage: File[]) => {
		const foundImage = uploadedFiles.find(
			(file) =>
				file[0].name === uploadedImage[0].name &&
				file[0].size === uploadedImage[0].size
		);

		return foundImage;
	};
	const handleFileDrop = (item: any, monitor: DropTargetMonitor) => {
		setWarning(false);
		if (monitor) {
			const uploadedImage = monitor.getItem<{ files: File[] }>().files;
			console.log("image is: ", uploadedImage);

			const foundImage = isImageExist(uploadedImage);
			if (foundImage) {
				setWarning(true);
			} else {
				setUploadedFiles([...uploadedFiles, uploadedImage]);
			}
		}
	};
	const handleNormalUpload = (e: any) => {
		setWarning(false);
		const uploadedImage = [e.target.files[0]];

		const foundImage = isImageExist(uploadedImage);
		if (foundImage) {
			setWarning(true);
		} else {
			setUploadedFiles([...uploadedFiles, uploadedImage]);
		}
	};

	const isDroppable = () => {
		return uploadedFiles.length < MAX_IMG_SIZE;
	};
	const handleDeleteImage = (e: any) => {
		const newFiles = uploadedFiles.filter(
			(file) => file[0].name !== e.target.id
		);
		setWarning(false);
		setUploadedFiles(newFiles);
	};
	const handleImagePreview = () => {
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

	const getProductInfo = () => {
		return (
			<div className='product-info p-5'>
				<InputArea />
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

						{warning && (
							<p className='text-center w-100 text-danger'>
								Image already exist!
							</p>
						)}
					</>
				)}

				{handleImagePreview()}
			</div>
		);
	};
	return (
		<div className='add-product-container'>
			<UserLayout>
				<Row>
					<Col md={6} sm={12}>
						{getProductInfo()}
					</Col>
					<Col md={6} sm={12}>
						{getProductImgs()}
					</Col>
				</Row>
			</UserLayout>
		</div>
	);
}

export default React.memo(AddProduct);
