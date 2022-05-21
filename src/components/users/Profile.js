import react, { components } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Swal } from "sweetalert2";
import $ from "jquery";
import jQuery from "jquery";

function Profile() {
    const Swal = require("sweetalert2");
    const [loading, setLoading] = useState(true);
    const [fileSelected, setfileSelected] = useState(null);
    const history = useHistory();
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [userInput, setUser] = useState([]);
    const [error, setError] = useState([]);
    const [password, setPassword] = useState("");

    const [token, setToken] = useState(localStorage.getItem("token"));
    const SelectFile = (e) => {
        setfileSelected(e.target.files[0]);
    };
    const getprofile = async () => {
        const category_id = this.props.match.params.id;
        await axios.get("url").then((res) => {
            if (res.data.status === 200) {
                setUser(res.data.category);
            } else if (res.data.status === 404) {
                const Swal = require("sweetalert2");
                Swal.fire({
                    title: "ERROR",
                    text: "You won't be able to revert this!",
                    icon: "error",
                });
                history.push("/profile");
            }
        });
    };

    useEffect(() => {
        getprofile();
    }, []);

    var loadFile = function (event) {
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(event.target.files[0]);
      };
      
    const handleInput = (e) => {
        e.persists();
        setUser({ ...userInput, [e.target.name]: e.target.value });
    };
    /*function emailHandler(e) {
      let item = e.target.value;
      let pattern =
          /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z\-]{3,9}[\.][a-z]{2,5}/g;
      if (pattern.test(item)) {
          setEmailErr(false);
      } else {
          setEmailErr(true);
      }
  }*/
    function handlePassword(event) {
        let item = event.target.value;
        console.log(item);
        if (item.length > 8) {
            setPasswordErr(false);
            setPassword(event.target.value);
        } else {
            setPasswordErr(true);
        }
    }
    const changePassword = async (event) => {
        event.preventDefault();
        const data = {
            password,
        };
        let url =
            "http://127.0.0.1:8000/api/changepassword/" +
            localStorage.getItem("user");
        let options = {
            method: "POST",
            data,
            url: url,
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        try {
            let response = await axios(options);
            if (response && response.status === 200) {
                Swal.fire({
                    title: "Password changed",
                    icon: "success",
                    iconColor: "#3dc00c",
                }).then(async () => {
                    history.push("/profile");
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Oops somthing hapened!",
                text: "Please verify your input and try again",
                icon: "error",
            });
        }
    };
    const updateUser = (e) => {
        e.preventDefault();
        const category_id = this.props.match.params.id;
        /*axios.put(url,data).then(
      res=>{
          if (res.data.status===200){
              swal("Success",res.data.message,"success");
              setError([]);
          }

          else if(res.data.status===422){
              setError(response.data.errors);
              swal("All fields ar mandetory","error");
          }
          else if(res.data.status===404){
              swal("Error",res.data.message,"error");
              history.push('/pageerreur')
          }
      }
  );*/
    };
    if (false) {
        return <h4>Loading Edit Category...</h4>;
    }
      

    return (
        <div className="page-content container container-plus">
            <div className="row mt-2 mt-md-4">
                {/* the left side profile picture and other info */}
                <div className="col-12 col-md-4">
                    <div className="card acard">
                        <div className="card-body">
                            <span className="d-none position-tl mt-2 pt-3px">
                                <span className="text-white bgc-blue-d1 ml-2 radius-b-1 py-2 px-2">
                                    <i className="fa fa-star" />
                                </span>
                            </span>
                            <div className="d-flex flex-column py-3 px-lg-3 justify-content-center align-items-center">
                                <div className="pos-rel">
                                    <img
                                        alt="Profile image"
                                        src="assets/img/avatar/avatar5.png"
                                        className="radius-round bord1er-2 brc-warning-m1"
                                    />
                                    <span className=" position-tr bgc-success p-1 radius-round border-2 brc-white mt-2px mr-2px" />
                                </div>
                                <div className="text-center mt-2">
                                    a
                                    <h5 className="text-130 text-dark-m3">
                                        Amy Smith
                                    </h5>
                                    <span className="d-none badge bgc-orange-l3 text-orange-d3 pt-2px pb-1 text-85 radius-round px-25 border-1 brc-orange-m3">
                                        pro
                                    </span>
                                </div>
                            </div>
                            {/* /.d-flex */}
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
                {/* .col */}
                {/* the right side profile tabs */}
                <div className="col-12 col-md-8 mt-3 mt-md-0">
                    <div className="card dcard h-100">
                        <div className="card-body p-0">
                            <div className="sticky-nav">
                                <div className="position-tr w-100 border-t-4 brc-blue-m2 radius-2 d-md-none" />
                                <ul
                                    id="profile-tabs"
                                    className="nav nav-tabs-scroll is-scrollable nav-tabs nav-tabs-simple p-1px pl-25 bgc-secondary-l4 border-b-1 brc-dark-l3 radius-t-1"
                                    role="tablist"
                                >
                                    <li className="nav-item mr-2 mr-lg-3">
                                        <a
                                            className="d-style nav-link active px-2 py-35 brc-primary-tp1"
                                            data-toggle="tab"
                                            href="#profile-tab-overview"
                                            role="tab"
                                            aria-controls="profile-tab-overview"
                                            aria-selected="true"
                                        >
                                            <span className="d-n-active text-dark-l1">
                                                1. Overview
                                            </span>
                                            <span className="d-active text-dark-m3">
                                                1. Overview
                                            </span>
                                        </a>
                                    </li>
                                    <li className="nav-item mr-2 mr-lg-3">
                                        <a
                                            className="d-style nav-link px-2 py-35 brc-primary-tp1"
                                            data-toggle="tab"
                                            href="#profile-tab-edit"
                                            role="tab"
                                            aria-controls="profile-tab-edit"
                                            aria-selected="false"
                                        >
                                            <span className="d-n-active text-dark-l1">
                                                2. Edit Info
                                            </span>
                                            <span className="d-active text-dark-m3">
                                                2. Edit Info
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* /.sticky-nav-md */}
                            <div className="tab-content px-0 tab-sliding flex-grow-1 border-0">
                                {/* overview tab */}
                                <div
                                    className="tab-pane active show px-1 px-md-2 px-lg-4"
                                    id="profile-tab-overview"
                                >
                                    <div className="row mt-1">
                                        <div className="col-12 px-4">
                                            {/* infobox */}
                                            <div className="d-flex justify-content-center my-3 flex-wrap flex-equal"></div>
                                        </div>
                                        <div className="col-12 px-4 mt-3">
                                            <h4 className="mt-2 text-dark-m3 text-130">
                                                <i className="fa fa-pen-alt text-85 text-purple-d1 w-3" />
                                                About Me
                                            </h4>
                                            <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start mt-3 mb-2 text-95 pl-3">
                                                <div className="mt-2 mt-sm-0 flex-grow-1 text-dark-m2">
                                                    <p className="mb-1">
                                                        Hello, may name is
                                                        Youcef. I'm a
                                                        professional designer
                                                        based in Dublin.
                                                    </p>
                                                    <p className="mb-1">
                                                        My job is mostly lorem
                                                        ipsuming and dolor sit
                                                        ameting for clients!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-12 px-4 mb-3">
                                            <h4 className="text-dark-m3 text-140">
                                                <i className="fa fa-info text-blue mr-1 w-2" />
                                                Settings
                                            </h4>
                                            <hr className="w-100 mx-auto mb-0 brc-default-l2" />
                                            <div className="bgc-white radius-1">
                                                <table className="table table table-striped-default table-borderless">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <i className="far fa-user text-success" />
                                                            </td>
                                                            <td className="text-95 text-600 text-secondary-d2">
                                                                Username
                                                            </td>
                                                            <td className="text-dark-m3">
                                                                amy_smith
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i
                                                                    class="fa fa-graduation-cap"
                                                                    aria-hidden="true"
                                                                />
                                                            </td>
                                                            <td className="text-95 text-600 text-secondary-d2">
                                                                Role
                                                            </td>
                                                            <td className="text-dark-m3">
                                                                admin
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i className="far fa-envelope text-blue" />
                                                            </td>
                                                            <td className="text-95 text-600 text-secondary-d2">
                                                                Email
                                                            </td>
                                                            <td className="text-blue-d1 text-wrap">
                                                                amy.smith@inc.com
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i className="fa fa-phone text-purple" />
                                                            </td>
                                                            <td className="text-95 text-600 text-secondary-d2">
                                                                Phone
                                                            </td>
                                                            <td className="text-dark-m3">
                                                                +1128934218
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <i className="fa fa-map-marker text-orange-d1" />
                                                            </td>
                                                            <td className="text-95 text-600 text-secondary-d2">
                                                                Location
                                                            </td>
                                                            <td className="text-dark-m3">
                                                                Dublin
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <i
                                                                    className="fa fa-calendar text-success"
                                                                    aria-hidden="true"
                                                                />
                                                            </td>
                                                            <td
                                                                className="text-95 text-600 text-secondary-d2"
                                                                type="date"
                                                            >
                                                                Birthday
                                                            </td>
                                                            <td>12</td>
                                                        </tr>

                                                        <tr>
                                                            <td>
                                                                <i
                                                                    class="fa fa-venus-mars text-purple"
                                                                    aria-hidden="true"
                                                                />
                                                            </td>
                                                            <td className="text-95 text-600 text-secondary-d2">
                                                                Gender
                                                            </td>
                                                            <td className="text-dark-m3">
                                                                F
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.row */}
                                </div>
                                {/* /.tab-pane */}
                                {/* activity tab */}
                                {/* profile edit tab */}
                                <div
                                    className="tab-pane px-1 px-md-2 px-lg-4 active"
                                    id="profile-tab-edit"
                                >
                                    <h4 className="bgc-secondary-l4 text-dark-tp3 text-center text-140 mb-3 mx-3 py-25">
                                        Update profile info
                                    </h4>
                                    <div className="row">
                                        <div className="col-12 col-lg-10 offset-lg-1 mt-3">
                                            <form
                                                className="text-grey-d1 text-95"
                                                autoComplete="off"
                                            >
                                                 <div className="profile-pic">
        <label className="-label" htmlFor="file"><i class="fas fa-camera"></i>
          <span>Change Image</span>
        </label>
        <input id="file" type="file" onChange={(event)=>loadFile(event)} />
        <img src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg" id="output" width={200} />
      </div>
                                                <form onSubmit={changePassword}>
                                                    <div className="form-group row mx-0">
                                                        <label
                                                            htmlFor="id-field2"
                                                            className="col-sm-4 col-xl-3 col-form-label text-sm-right"
                                                        >
                                                            Password
                                                        </label>
                                                        <div className="col-sm-8 col-lg-6">
                                                            <input
                                                                type="password"
                                                                className="form-control brc-on-focus brc-success-m2"
                                                                id="id-field2"
                                                                placeholder="Enter your password here"
                                                                required="required"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    handlePassword(
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    {passwordErr ? (
                                                        <div className="error">
                                                            <span>
                                                                your password
                                                                should be higher
                                                                than 8
                                                                characters!
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </form>
                                                <div className="form-group row mt-45 mx-0">
                                                    <label
                                                        htmlFor="id-field3"
                                                        className="col-sm-4 col-xl-3 col-form-label text-sm-right"
                                                    >
                                                        Phone Number
                                                    </label>
                                                    <div className="col-sm-8 col-lg-6">
                                                        <input
                                                            type="text"
                                                            className="form-control brc-on-focus brc-success-m2"
                                                            id="id-field3"
                                                            placeholder="e.g. (+213) 70000000"
                                                            name="phone"
                                                            required="required"
                                                            onChange={
                                                                handleInput
                                                            }
                                                            value={
                                                                userInput.phone
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row mx-0">
                                                    <label
                                                        htmlFor="id-field4"
                                                        className="col-sm-4 col-xl-3 col-form-label text-sm-right"
                                                    >
                                                        Location
                                                    </label>
                                                    <div className="col-sm-8 col-lg-6">
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            className="form-control brc-on-focus brc-success-m2"
                                                            id="id-field4"
                                                            placeholder="constantine"
                                                            required="required"
                                                            onChange={
                                                                handleInput
                                                            }
                                                            value={
                                                                userInput.city
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-12">
                                            <hr className="border-double brc-dark-l3" />
                                            <div className="form-group text-center mt-4 mb-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary radius-1 px-3 mx-1"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-green radius-1 px-4 mx-1"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /.tab-pane */}
                            </div>
                            {/* /.tab-content */}
                        </div>
                    </div>
                    {/* /.card */}
                </div>
            </div>
        </div>
    );
}
export default Profile;
