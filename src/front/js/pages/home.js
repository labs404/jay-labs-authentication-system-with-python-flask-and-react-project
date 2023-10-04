import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const message = store.message;
	const user = store.email;

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined) {
			actions.getMessage();
		}
	},[store.token])

	return (
		<>
			<div className="text-center mt-5">
				<h1>{message}</h1>
				<p>
					<img src={rigoImageUrl} />
				</p>
				<div className="alert alert-info">
					{!message ? <font color='red'><b>Baby Rigo wants you to SIGN UP or LOG IN above.</b></font> : <h1>Welcome {user}</h1>}
				</div>
			</div>
		</>
	);
};