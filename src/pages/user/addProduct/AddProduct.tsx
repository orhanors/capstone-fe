import { Row, Col, Carousel } from "react-bootstrap";
import UserLayout from "../../../layouts/userLayout/UserLayout";
import { FC, useState, useMemo } from "react";
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
	const [droppedFiles, setDroppedFiles] = useState<Array<File[]>>([]);
	const accepts = useMemo(() => [FILE], []);
	const [showRemove, setShowRemove] = useState(false);
	const handleFileDrop = (item: any, monitor: DropTargetMonitor) => {
		if (monitor) {
			const imageFile = monitor.getItem<{ files: File[] }>().files;
			console.log("image is: ", imageFile);
			setDroppedFiles([
				...droppedFiles,
				monitor.getItem<{ files: any[] }>().files,
			]);
		}
	};

	const handleImagePreview = () => {
		return (
			<div className='img-previews-container mt-4 mx-3'>
				<Row>
					{droppedFiles.map((file) => {
						return (
							<Col
								key={file[0].name + file[0].size}
								md={4}
								sm={12}>
								<div
									className='img-preview'
									onMouseOver={() => setShowRemove(true)}
									onMouseLeave={() => setShowRemove(false)}>
									<ShowImagePreview
										file={file}
										imgClassName='img-product m-1'
									/>

									{showRemove && (
										<span className='delete-img'>X</span>
									)}
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
				{droppedFiles.length < MAX_IMG_SIZE && (
					<div className='img-upload-options'>
						<UploadImage
							accepts={accepts}
							onDrop={handleFileDrop}
						/>
						<span>
							<FileInput />{" "}
						</span>
					</div>
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

export default AddProduct;
