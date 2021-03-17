import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../auth.scss";
import Login from "../Login/Login";
import OAuth from "../Oauth";
import Signup from "../Signup/Signup";
function Auth() {
	const LOGIN = "login";
	const SIGNUP = "signup";
	const [method, setMethod] = useState(LOGIN);
	const handleMethod = (e: any) => {
		setMethod(e.target.id);
	};
	return (
		<div className='auth-container'>
			<div className='auth'>
				<div className='auth-choose'>
					<Container>
						<Row>
							<Col md={3}>
								<div className='auth-method'>
									<div
										id={LOGIN}
										onClick={handleMethod}
										style={{
											color: `${
												method === LOGIN
													? "black"
													: "gray"
											}`,
										}}>
										Login
									</div>
									<div
										id={SIGNUP}
										onClick={handleMethod}
										style={{
											color: `${
												method === SIGNUP
													? "black"
													: "gray"
											}`,
										}}>
										Signup
									</div>
								</div>
							</Col>

							<Col md={1}>
								<div className='line'></div>
							</Col>
							<Col md={8}>
								<div className='auth-interaction'>
									{method === LOGIN ? <Login /> : <Signup />}

									<div>
										<OAuth />
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				</div>

				<div></div>
			</div>
		</div>
	);
}

export default Auth;
