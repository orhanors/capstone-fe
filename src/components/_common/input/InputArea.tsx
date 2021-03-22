import React, { CSSProperties } from "react";
import "./inputArea.scss";
interface Props {
	onChange: any;
	type: string;
	value: any;
	style: CSSProperties;
	id: string;
	label: string;
}
function InputArea() {
	return (
		<div className='input-area-container'>
			<label htmlFor='test'>Test</label>
			<input type='text' id='test' />
		</div>
	);
}

export default InputArea;
