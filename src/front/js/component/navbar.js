import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					
						<Link to="/signup" type="button" className="btn btn-success me-2">
							Sign Up
						</Link>

					{ !store.token ? (
						<Link type="button" className="btn btn-primary" to="/login">
							{/* <button className="btn btn-primary"> */}
								Log in
							{/* </button> */}
						</Link>
					) : (
						<button className="btn btn-danger" onClick={() => actions.logout()}>
							Log Out
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
