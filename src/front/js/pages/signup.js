import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Signup = () => {
    const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        if ( !email || !password ) {
            alert("Missing value. Enter a valid Username / Password");
            return false;
        }
        actions.signup(email, password).then(navigate("/"))
    };

	return (
        <div className="container container-fluid text-center">
            <div className="text-center mt-5">
                <div className="signup-header mb-3">
                    <h1>Hello from Jay's signup.js!</h1>
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
                    <button type="button" className="btn btn-danger" onClick={handleSignup}>Submit Button</button>
                </div>
            </div>
        </div>
	)
};

export default Signup;