import React from "react";
import { Spinner } from "react-bootstrap";

interface Props {
	size?: "sm" | undefined;
}
function BasicLoader(props: Props) {
	return (
		<Spinner animation='border' role='status' size={props.size}>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	);
}

export default BasicLoader;
