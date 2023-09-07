import React, { useContext } from "react";
import "../../styles/home.css";

const Signup = () => {

	return (
        <div className="container container-fluid text-center">
            <div className="text-center mt-5">
                <div className="signup-header mb-3">
                    <h1>Hello form Signup!</h1>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                    <input type="text" className="form-control" placeholder="email" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                    <input type="text" className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                </div>
                <div className="signup-footer mb-3">
                    <button type="button" class="btn btn-primary">Submit Button</button>
                </div>
            </div>
        </div>
	)
};

export default Signup;