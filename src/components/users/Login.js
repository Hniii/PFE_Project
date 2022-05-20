import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const login = async (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    let url = "http://127.0.0.1:8000/api/login";
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
    if (response && response.status === 200) {Swal.fire({
        title: "Go to dashboard",
        text: "You are successfuly loged in .",
        icon: "success",

        iconColor: "#3dc00c",
    }).then(async ()=>{
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user" , response.data.user.id);
      localStorage.setItem("role" , response.data.user.roles);
      let bodyElement = document.getElementsByTagName("body")[0];
      document. body. classList.remove("bg-image");
      

      history.push("/dashboard");
    });}
    } catch (error) {
      Swal.fire({
        title: "Bad credentials!",
        text: "You are not loged in .",
        icon: "error",
    });
    };
  };

  const Swal = require("sweetalert2");

  useEffect(() => {
      let token = localStorage.getItem("token");
      if (token!==null && token!=="undefined"){
          //alert("");
          let bodyElement = document.getElementsByTagName("body")[0];
            document. body. classList.remove("bg-image");
          history.push("/dashboard");
      }else{
      
    let bodyElement = document.getElementsByTagName("body")[0];
    document. body. classList. add( "bg-image");

      }
  }, []);
  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-lg-6 d-none d-lg-flex">
          <div className="flex-grow-1 bg-login-image">
            <img
              className="logo"
              src={window.location.origin + "/assets/img/EsiProject-logo.png"}
            />
          </div>
        </div>
        <div className="col-lg-6 bg-white content-center">
          <div className="p-5">
            <div className="text-center">
              <h4 className="text-dark mb-4">Get Started!</h4>
            </div>
            <form className="user" onSubmit={login}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control form-control-user"
                  type="email"
                  id="username-1"
                  placeholder="Enter Your Email..."
                  name="email"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  className="form-control form-control-user"
                  type="password"
                  id="exampleInputPassword-1"
                  placeholder="Enter Your Password..."
                  name="password"
                  required
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>

              <button
                className="btn btn-primary d-block btn-user"
                type="submit"
              >
                Login
              </button>
              <hr />
            </form>
            <div className="text-center">
              <Link className="small" to="/forgotpassword">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
