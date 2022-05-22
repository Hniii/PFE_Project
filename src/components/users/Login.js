import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [FrgPswdEmail, setFrgPswdEmail] = useState("");

  //handlers
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [FrgPswdEmailErr, setFrgPswdEmailErr] = useState(false);
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


  const forgotPassword = async (event) => {
    event.preventDefault();
    const data = {
      FrgPswdEmail,
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

      history.push("/dashboard");
    });}
    } catch (error) {
      Swal.fire({
        title: "Bad credentials!",
        text: "Aucun compte associé à l'adresse électronique saisie ",
        icon: "error",
    });
    };
  };

  const Swal = require("sweetalert2");

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
function passwordHandler(e) {
  let item = e.target.value;
  let pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;
  if (pattern.test(item)) {
      setPasswordErr(false);

      setPassword(e.target.value);
  } else {
      setPasswordErr(true);
  }
}


function FrgPswdEmailHandler(e) {
  let item = e.target.value;
  let pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z\-]{3,9}[\.][a-z]{2,5}/g;
  if (pattern.test(item)) {
      setFrgPswdEmailErr(false);

      setFrgPswdEmail(e.target.value);
  } else {
      setFrgPswdEmailErr(true);
  }
}
  useEffect(() => {
      let token = localStorage.getItem("token");
      if (token!==null && token!=="undefined"){
          //alert("");
          history.push("/dashboard");
      }else{
      
 

      }
    }, []);
  return (
    <div className="body-container">
    { /*  <div class="bubble x1"></div>
    <div class="bubble x2"></div>
    <div class="bubble x3"></div>
    <div class="bubble x4"></div>
    <div class="bubble x5"></div>
    <div class="bubble x6"></div>
    <div class="bubble x7"></div>
    <div class="bubble x8"></div>
    <div class="bubble x9"></div>
  <div class="bubble x10"></div>*/}
        <div className="main-container container bgc-transparent">
          <div className="main-content minh-100 justify-content-center">
            <div className="p-2 p-4">
              <div className="row" id="row-1">
                <div className="col-12 col-xl-10 offset-xl-1 bgc-white shadow radius-1 overflow-hidden">
                  <div className="row" id="row-2">
                    <div id="id-col-intro" className="col-lg-5 d-none d-lg-flex border-r-1 brc-default-l3 px-0">
                      {/* the left side section is carousel in this demo, to show some example variations */}
                      <div id="loginBgCarousel" className="carousel slide minw-100 h-100">
                        <ol className="d-none carousel-indicators">
                          <li data-target="#loginBgCarousel" data-slide-to={0} className="active" />
                          <li data-target="#loginBgCarousel" data-slide-to={1} />
                          <li data-target="#loginBgCarousel" data-slide-to={2} />
                          <li data-target="#loginBgCarousel" data-slide-to={3} />
                        </ol>
                        <div className="carousel-inner minw-100 h-100">
                          <div className="carousel-item active minw-100 h-100">
                            {/* default carousel section that you see when you open login page */}
                            <div style={{backgroundImage: 'url(assets/image/login-bg-1.svg)'}} className="px-3 bgc-blue-l4 d-flex flex-column align-items-center justify-content-center">
                              
                            <img className="mt-3 mb-2 "  height={150}  src={window.location.origin + "/assets/image/logo.png"}/>
                              <h2 className="text-d1 text-dark-l1">
                                ESI <span className="text-80 text-dark-l1">Projects</span>
                              </h2>
                             
                              <div className=" mx-5 text-dark-tp3">
                              <hr className="mb-3 mx-4  brc-black-tp10" />
                                <span className="text-120">
                                Application Full Web de gestion des projets
                                à l'École Supérieure en Informatique 
                                de Sidi Bel-Abbés
                                </span>
                              </div>
                              <div className="mt-auto mb-4 text-dark-tp2">
                                TeamDev Company © 2022
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="id-col-main" className="col-12 col-lg-7 py-lg-5 bgc-white px-0">
                      {/* you can also use these tab links */}
                      <ul className="d-none mt-n4 mb-4 nav nav-tabs nav-tabs-simple justify-content-end bgc-black-tp11" role="tablist">
                        <li className="nav-item mx-2">
                          <Link className="nav-link active px-2" data-toggle="tab" to="#id-tab-login" role="tab" aria-controls="id-tab-login" aria-selected="true">
                            Login
                          </Link>
                        </li>
                      </ul>
                      <div className="tab-content tab-sliding border-0 p-0" data-swipe="right">
                        <div className="tab-pane active show mh-100 px-3 px-lg-0 pb-3" id="id-tab-login">
                          {/* show this in desktop */}
                          <div className="d-none d-lg-block col-md-6 offset-md-3 mt-lg-4 px-0">
                            <h4 className="text-dark-tp4 border-b-1 brc-secondary-l2 pb-1 text-130">
                              {/*<FontAwesomeIcon icon="fa-solid fa-hand-wave" /> */} 
                              Welcome Back!
                            </h4>
                          </div>
                          {/* show this in mobile device */}
                          <div className="d-lg-none text-secondary-m1 my-4 text-center">
                          <img className="mt-auto mb-3 "  height={120}  src={window.location.origin + "/assets/image/logo.png"}/>
                           <h1 className="text-170"> Projects</h1>
                            Welcome back !
                          </div>
                          <form className="form-row mt-4" onSubmit={login}>
                            <div className="form-group col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                              <div className="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                <input placeholder="Email" 
                                type="email" 
                                className="form-control form-control-lg pr-4 shadow-none" 
                                id="id-login-email"
                                name="email"
                                required
                                onChange={emailHandler}
                                />
                                 <i className="fa fa-user text-grey-m2 ml-n4" /> 
                                <label className="floating-label text-grey-l1 ml-n3" htmlFor="id-login-Email">
                                  Email
                                </label>
                              </div> {" "}
                                {emailErr ? (
                                    <div className="msgerror">
                                        <span>
                                            It should be a valid
                                            email address!
                                        </span>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="form-group col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-2 mt-md-1">
                              <div className="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
                                <input 
                                placeholder="Password" 
                                type="password" 
                                className="form-control form-control-lg pr-4 shadow-none" 
                                id="id-login-password"
                                name="password"
                                required
                                onChange={passwordHandler} />
                                <i className="fa fa-key text-grey-m2 ml-n4" />
                                <label className="floating-label text-grey-l1 ml-n3" htmlFor="id-login-password">
                                  Password
                                </label>
                              </div> {" "}
                                {passwordErr ? (
                                    <div className="msgerror">
                                        <span>
                                           Invalid password! 
                                       </span>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-right text-md-right mt-n2 mb-2">
                              <Link to="#" className="text-primary-m1 text-95" data-toggle="tab" data-target="#id-tab-forgot">
                                Forgot Password?
                              </Link>
                            </div>
                            <div className="form-group col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                              <label className="d-inline-block mt-3 mb-0 text-dark-l1">
                                <input type="checkbox" className="mr-1" id="id-remember-me" />
                                Remember me
                              </label>
                              <button type="submit" className="btn btn-primary btn-block px-4 btn-bold mt-2 mb-4">
                                Sign In
                              </button>
                            </div>
                          </form>
                          <div className="form-row">
                            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 d-flex flex-column align-items-center justify-content-center">
                              <hr className="brc-default-l2 mt-0 mb-2 w-100" />
                             <br/>
                             <div className="mt-n4 bgc-white-tp2 px-3 py-1 text-secondary-d3 text-90">Or Get Started Using</div>
                              <div className="my-2">
                                <button type="button" className="btn btn-bgc-white btn-lighter-primary btn-h-primary btn-Link-primary border-2 radius-round btn-lg mx-1">
                                  <i className="fab fa-facebook-f text-110" />
                                </button>
                                <button type="button" className="btn btn-bgc-white btn-lighter-info btn-h-info btn-Link-info border-2 radius-round btn-lg px-25 mx-1">
                                  <i className="fab fa-twitter text-110" />
                                </button>
                                <button type="button" className="btn btn-bgc-white btn-lighter-red btn-h-red btn-Link-red border-2 radius-round btn-lg px-25 mx-1">
                                  <i className="fab fa-google text-110" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane mh-100 px-3 px-lg-0 pb-3" id="id-tab-forgot" data-swipe-prev="#id-tab-login">
                          <div className="position-tl ml-3 mt-2">
                            <Link to="#" className="btn btn-light-default btn-h-light-default btn-Link-light-default btn-bgc-tp" data-toggle="tab" data-target="#id-tab-login">
                              <i className="fa fa-arrow-left" />
                            </Link>
                          </div>
                          <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-5 px-0">
                            <h4 className="pt-4 pt-md-0 text-dark-tp4 border-b-1 brc-grey-l2 pb-1 text-130">
                              <i className="fa fa-key text-brown-m1 mr-1" />
                              Recover Password
                            </h4>
                          </div>
                          <form  className="form-row mt-4" onSubmit={forgotPassword}>
                            <div className="form-group col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                              <label className="text-secondary-d3 mb-3">
                                Enter your email address and we'll send you the instructions:
                              </label>
                              <div className="d-flex align-items-center">
                              <input placeholder="Email" 
                                type="email" 
                                className="form-control form-control-lg pr-4 shadow-none" 
                                id="id-login-email"
                                name="email"
                                required
                                onChange={FrgPswdEmailHandler}
                                  /><i className="fa fa-envelope text-grey-m2 ml-n4" />
                              </div>{" "}
                                {FrgPswdEmailErr ? (
                                    <div className="msgerror">
                                        <span>
                                            It should be a valid
                                            email address!
                                        </span>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="form-group col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-1">
                              <button type="submit" className="btn btn-orange btn-block px-4 btn-bold mt-2 mb-4">
                                Continue
                              </button>
                            </div>
                          </form>
                          <div className="form-row w-100">
                            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 d-flex flex-column align-items-center justify-content-center">
                              <hr className="brc-default-l2 mt-0 mb-2 w-100" />
                              <div className="p-0 px-md-2 text-dark-tp4 my-3">
                                <Link className="text-blue-d1 text-600 btn-text-slide-x" data-toggle="tab" data-target="#id-tab-login" to="#">
                                  <i className="btn-text-2 fa fa-arrow-left text-110 align-text-bottom mr-2" />Back to Login
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{/* .tab-content */}
                    </div>
                  </div>{/* /.row */}
                </div>{/* /.col */}
              </div>{/* /.row */}
              <div className="d-lg-none my-3 text-white-tp1 text-center">
                <i className="text-success-l3 mr-1 text-110" /> TeamDev Company © 2022
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
export default Login;
