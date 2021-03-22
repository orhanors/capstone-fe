import React from "react";
interface Props {
	file: File[];
	imgClassName: string;
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
		</>
	);
};

export default ShowImagePreview;
