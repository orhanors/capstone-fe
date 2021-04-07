import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Editor from "../../../components/editor/Editor";
import InputArea from "../../../components/_common/input/InputArea";
import "./addArticle.scss";
function AddArticle() {
	const [textHtml, setTextHtml] = useState({ value: null });
	const [title, setTitle] = useState("");
	const [warning, setWarning] = useState("");
	const [tag, setTag] = useState("");
	const [tags, setTags] = useState<Array<string>>([]);
	const handleHtmlChange = (value: any) => {
		setTextHtml({ value });
	};
	const hasTagExist = (tag: string) => {
		return tags.includes(tag);
	};
	const handleTagChange = (e: any) => {
		const userInput = e.target.value;
		if (e.keyCode === 13) {
			if (hasTagExist(userInput))
				return setWarning("'" + userInput + "'" + " already exist");
			setTag("");
			setTags([...tags, tag]);
		} else {
			setWarning("");
			setTag(userInput);
		}
	};

	const handleTagRemove = (e: any) => {
		const newTags = tags.filter((tag) => tag !== e.target.id);
		setTags(newTags);
		if (warning) setWarning("");
	};
	return (
		<div className='add-article container'>
			<input
				className='title mt-5'
				placeholder='TITLE'
				type='text'
				value={title}
				name='title'
				maxLength={70}
				onChange={(e: any) => setTitle(e.target.value)}
			/>
			<Editor html={textHtml.value!} handleChange={handleHtmlChange} />
			<div className='tags my-4'>
				<Row>
					<Col md={12} className='d-flex justify-content-center mb-2'>
						<h5 className='text-center'>#tags</h5>
					</Col>
					<Col md={12} className='d-flex justify-content-center mb-2'>
						<input
							className='tag-input'
							placeholder={
								tags.length === 5
									? "You can add max 5 tags"
									: "Add a tag and press enter"
							}
							type='text'
							value={tag}
							disabled={tags.length === 5 ? true : false}
							name='tag'
							maxLength={50}
							onChange={handleTagChange}
							onKeyDown={handleTagChange}
						/>
					</Col>
					{warning && (
						<Col
							md={12}
							className='d-flex justify-content-center mb-2'>
							<small className='text-danger'>{warning}</small>
						</Col>
					)}
					<Col md={12} className='d-flex justify-content-center'>
						<div className='tag-list d-flex mt-3'>
							{tags.map((tag, index) => {
								return (
									<div
										className='tag-single-wrapper mx-2'
										key={tag + index}>
										<span className='tag-single'>
											{tag}
										</span>
										<span
											className='tag-close'
											id={tag}
											onClick={handleTagRemove}>
											x
										</span>{" "}
									</div>
								);
							})}
						</div>
					</Col>
				</Row>
			</div>
			<button className='publish-btn mb-5 w-100'>Publish</button>
		</div>
	);
}

export default AddArticle;
