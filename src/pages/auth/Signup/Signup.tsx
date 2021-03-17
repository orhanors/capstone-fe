import React from "react";
import { Link } from "react-router-dom";
import OAuth from "../Oauth";
interface Props {
	change: () => void;
}
function Signup(props: Props) {
	return (
		<div className='user signupBx'>
			<div className='formBx'>
				<form>
					<h2>Create an account</h2>
					<OAuth />
					<input type='text' placeholder='Username' />
					<input type='email' placeholder='Email Address' />
					<input type='password' placeholder='Create Password' />
					<input type='password' placeholder='Confirm Password' />
					<input type='submit' defaultValue='Sign Up' />
					<p className='signup'>
						Already have an account ?
						<Link to='/login' onClick={props.change}>
							Sign in.
						</Link>
					</p>
				</form>
			</div>
			<div className='imgBx'>
				<img
					src='https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg'
					alt=''
				/>
			</div>
		</div>
	);
}

export default Signup;
