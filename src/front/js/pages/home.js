import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";



export const Home = () => {
	const { store, actions } = useContext(Context);

	const handleLogout = async () => {
		actions.logout();
	}

	useEffect(() => {
		actions.getMessage();
	},[])

	return (
		// store.token === null ? <center><h1>Please <a href="/login">Log In</a> to continue.</h1></center>
		// :
		<div className="text-center mt-5">
			<h1>{store.message}</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
			{!store.token ? 
				<Link to="/login">
					<button type="button" className="btn btn-success">Click Here to Log In</button>
				</Link>
			:
				<button type="button" className="btn btn-danger" onClick={handleLogout}>Log Out of Sesison</button>
			}
		</div>
	);
};
