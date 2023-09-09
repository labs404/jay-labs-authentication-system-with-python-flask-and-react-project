import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Login = () => {
    const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();


    const handleLogin = () => {
        //moved this block to flux.
        //////////////////////////////////////////////////
        // const options = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(
        //         {
        //             "email": email,
        //             "password": password
        //         }
        //     )
        // }
        // fetch("https://cuddly-space-broccoli-7g6q4r97xw62p66x-3001.app.github.dev/api/token", options)
        // .then(response => {
        //     if(response.status === 200) return response.json();
        // })
        // .then(data => {
        //     console.log("Access token:", data);
        //     sessionStorage.setItem("token", data.access_token);
        // })
        // .catch(error => console.log("There was an error.", error))
        //////////////////////////////////////////////////
        actions.login(email, password).then(() => {
            navigate("/");
        })
    }

	return (
        <>
        {(store.token && store.token != "" && store.token != undefined) ? <center><h1>You are logged in with the following token:</h1><p>{store.token}</p></center>
        :
        <div className="container container-fluid text-center">
            <div className="text-center mt-5">
                <div className="signup-header mb-3">
                    <h1>Hello form Login!</h1>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                    <input type="text" className="form-control" placeholder="email" aria-label="email" aria-describedby="basic-addon1" 
                    onChange={e => setEmail(e.target.value)} 
                    value={email}
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                    <input type="text" className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" 
                    onChange={e => setPassword(e.target.value)} 
                    value={password}
                    />
                </div>
                <div className="signup-footer mb-3">
                    <button type="button" className="btn btn-danger" onClick={handleLogin}>Submit Button</button>
                </div>
            </div>
        </div>
        }
        </>
	)
};

export default Login;