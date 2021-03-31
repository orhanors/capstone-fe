import React, { ReactChild } from "react";
import "./dropdown.scss";

interface DropdownProps {
	children: ReactChild;
}
function CommonDropdown({ children }: DropdownProps) {
	return (
		<>
			<div className='dropdown-wrapper text-gray'>
				<div className='triangle-up'></div>
				{children}
			</div>
		</>
	);
}

export default CommonDropdown;
