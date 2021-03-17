import React from "react";

function Signup() {
	return (
		<div className='signup mb-3'>
			<div className='signup-inputs d-flex flex-column'>
				<div className='form-wrapper  d-flex flex-row'>
					<input
						className='mr-3 mb-3'
						type='email'
						placeholder='E-mail'
						style={{ paddingRight: "50%" }}
					/>
				</div>
				<div className='form-wrapper  d-flex flex-row'>
					<input
						className='mr-3 mb-3'
						type='text'
						placeholder='Name'
					/>
					<input
						className='mr-3 mb-3'
						type='text'
						placeholder='Surname'
					/>
				</div>

				<div className='form-wrapper  d-flex flex-row'>
					<input
						className='mr-3 mb-3'
						type='password'
						placeholder='Password'
					/>
					<input
						className='mr-3 mb-3'
						type='password'
						placeholder='Confirm Password'
					/>
				</div>
			</div>
			<button className='signup-btn mb-2'>Signup</button>
		</div>
	);
}

export default Signup;
