import React from "react";
import { Link } from "react-router-dom";
import OAuth from "../Oauth";

interface Props {
	change: () => void;
}
function Login(props: Props) {
	return (
		<div className='user signinBx'>
			<div className='imgBx'>
				<img
					src='https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg'
					alt=''
				/>
			</div>
			<div className='formBx'>
				<form>
					<h2>Sign In</h2>
					<OAuth />
					<input type='text' placeholder='Username' />
					<input type='password' placeholder='Password' />
					<input type='submit' defaultValue='Login' />
					<p className='signup'>
						Don't have an account ?
						<Link to='/login' onClick={props.change}>
							Sign Up.
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
