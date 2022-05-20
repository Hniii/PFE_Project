import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import { Link } from "react-router-dom";
import Login from "./Login";
function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false);

    let history = useHistory();

    const Swal = require("sweetalert2");
    const forgot = async (event) => {
        event.preventDefault();
        const data = {
            email,
        };
        let url = "http://127.0.0.1:8000/api/forgotpassword";
        let options = {
            method: "POST",
            data,
            url: url,
            headers: {
                Accept: "Application/json",
            },
        };
        try {
            let response = await axios(options);
            console.log(response);
            if (response && response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", response.data.user);
                Swal.fire({
                    title: "Password chamged",
                    text: "Please check you are email, we have generated an new password for you",
                    icon: "success",

                    iconColor: "#3dc00c",
                }).then(() => {
                    history.push("/login");
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Bad credentials!",
                text: "this email does not exit ",
                icon: "error",
            });
        }

        
    };
    function emailHandler(e) {
        let item = e.target.value;
        let pattern =
            /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z\-]{3,9}[\.][a-z]{2,5}/g;
        if (pattern.test(item)) {
            setEmailErr(false);
            setEmail(e.target.value);
        } else {
            setEmailErr(true);
        }
    }

    useEffect(() => {
        let bodyElement = document.getElementsByTagName("body")[0];
        document.body.classList.add("bg-image");
    }, []);
    return (
        <div className="container  ">
            <div className="row justify-content-center">
                <div className="col-lg-6 bg-white content-center">
                    <div className="p-5">
                        <div className="text-center">
                            <h4 className="text-dark mb-4">
                                Forgot your password?
                            </h4>
                            <p>
                                {" "}
                                Please enter your email and we'll send you a
                                link to get back to your account.
                            </p>
                        </div>
                        <form className="user" onSubmit={forgot}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-control form-control-user"
                                    type="email"
                                    id="username-1"
                                    placeholder="Enter Your Email..."
                                    name="email"
                                    required
                                    onChange={emailHandler}
                                />{" "}
                                {emailErr ? (
                                    <div className="error">
                                        <span>
                                            It should be a valid email address!
                                        </span>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <button
                                className="btn btn-primary d-block btn-user"
                                type="submit"
                            >
                                Send
                            </button>
                            <hr />
                        </form>
                        <div className="text-center">
                            <Link className="small" to={"/login"}>
                                Go back to login page
                            </Link>
                        </div>
                        <div className="text-center"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
