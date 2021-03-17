import React from "react";

function Login() {
	return (
		<div className='login mb-3'>
			<div className='login-inputs d-flex flex-column'>
				<input className='mb-3' type='email' placeholder='E-mail' />
				<input
					className='mb-3'
					type='password'
					placeholder='Password'
				/>
				<button className='login-btn mb-2'>Login</button>
			</div>
		</div>
	);
}

export default Login;
