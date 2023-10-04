import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const user = store.email;

    useEffect(() => {
        if (!sessionStorage.token) {
            navigate("/");
        } else {
            actions.getMessage();
        }
    }, [sessionStorage.token]);

    return (
        <>
            <div className="container-fluid p-5">
                <div className="row">
                    <div className="col-4">
                    &nbsp;
                    </div>
                    <div className="col-4 text-center">
                        <h1>You have successfully logged in.</h1>
                        <h3>Username: {user}</h3>
                        <sub>This is a super secret, private, secure page.</sub>
                    </div>
                    <div className="col-4">
                    &nbsp;
                    </div>
                </div>

            </div>
        </>
    )
}

export default Private;