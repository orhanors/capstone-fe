import React, { useState } from "react";
interface Props {
	file: File[];
	imgClassName: string;
	deleteImage?: (e: any) => void;
	id?: string;
}
const ShowImagePreview: React.FC<Props> = (props: Props) => {
	const { file, imgClassName } = props;

	return (
		<>
			<img
				className={imgClassName}
				alt='product-preview'
				src={URL.createObjectURL(file[0])}
			/>

			<span
				id={props.id}
				onClick={props.deleteImage}
				className='delete-img'>
				X
			</span>
		</>
	);
};

export default ShowImagePreview;
