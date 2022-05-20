import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Swal } from "sweetalert2";
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

    const handleInput = (e) => {
        e.persists();
        setUser({ ...userInput, [e.target.name]: e.target.value });
    };
    function emailHandler(e) {
        let item = e.target.value;
        let pattern =
            /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z\-]{3,9}[\.][a-z]{2,5}/g;
        if (pattern.test(item)) {
            setEmailErr(false);
        } else {
            setEmailErr(true);
        }
    }
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
        <>
            <h3 className="text-dark mb-4">My Profile</h3>
            <div f="container rounded bg-white">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center ">
                            <img
                                className="rounded-circle mt-5"
                                width="150px"
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            />
                            <span className="font-weight-bold">Edogaru</span>
                            <span className="text-black-50">
                                edogaru@mail.com.my
                            </span>
                            <span> </span>
                        </div>
                        <div className="file-inputs">
                            <input
                                type="file"
                                className="profil-pic"
                                onChange={SelectFile}
                            />
                            <button className="Upload-button">
                                Upload new image
                            </button>
                        </div>
                    </div>

                    <div className="col-md-8 border-right">
                        <div className="row">
                            <div className=" card shadow  card-header py-10">
                                <p className="text-primary m-0 fw-bold">
                                    User Settings
                                </p>
                                <div className="card-body">
                                    <form onSubmit={updateUser}>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Role</strong>
                                            </label>
                                            <select
                                                className="form-select"
                                                name="role"
                                                type="radio"
                                                onChange={handleInput}
                                                value={userInput.role}
                                            >
                                                <optgroup id="role">
                                                    <option>Student</option>
                                                    <option>Company</option>
                                                    <option>Admin</option>
                                                    <option>Teacher</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                        <div className="col mb-3">
                                            <label
                                                className="form-label"
                                                for="email"
                                            >
                                                <strong>Email Address</strong>
                                            </label>
                                            <input
                                                className="form-control form-control-user"
                                                type="email"
                                                id="email"
                                                placeholder="user@example.com"
                                                name="email"
                                                required="required"
                                                onChange={emailHandler}
                                            />
                                            {emailErr ? (
                                                <div className="error">
                                                    <span>
                                                        It should be a valid
                                                        email address!
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col mb-3">
                                            <label
                                                className="form-label"
                                                for="first_name"
                                            >
                                                <strong>First Name</strong>
                                            </label>
                                            <input
                                                className="form-control form-control-user"
                                                type="text"
                                                id="first_name"
                                                placeholder="John"
                                                name="first_name"
                                                required="required"
                                                onChange={handleInput}
                                                value={userInput.first_name}
                                            />
                                        </div>
                                        <div className="col mb-3">
                                            <label
                                                className="form-label"
                                                for="last_name"
                                            >
                                                <strong>Last Name</strong>
                                            </label>
                                            <input
                                                className="form-control form-control-user"
                                                type="text"
                                                id="last_name-1"
                                                placeholder="Doe"
                                                name="last_name"
                                                required="required"
                                                onChange={handleInput}
                                                value={userInput.last_name}
                                            />
                                        </div>
                                        <div className="col mb-3">
                                            <label
                                                className="form-label"
                                                for="password"
                                            >
                                                <strong>Birthday</strong>
                                            </label>
                                            <input
                                                name="birthday"
                                                className="form-control form-control-user"
                                                type="date"
                                                required="required"
                                                onChange={handleInput}
                                                value={userInput.birthday}
                                            />
                                        </div>
                                        <div className="col mb-3">
                                            <label
                                                className="form-label"
                                                for="placepfborth"
                                            >
                                                <strong>Place of birth</strong>
                                            </label>
                                            <input
                                                name="placeofbirth"
                                                className="form-control form-control-user"
                                                type="text"
                                                required="required"
                                                placeholder="constantine"
                                                onChange={handleInput}
                                                value={userInput.placeofbirth}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Gender</strong>
                                            </label>
                                            <select
                                                className="form-select"
                                                name="gender"
                                                type="radio"
                                                onChange={handleInput}
                                                value={userInput.gender}
                                            >
                                                <optgroup id="role">
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </form>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        type="submit"
                                    >
                                        Save Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" card shadow card-header py-10">
                                <p className="text-primary m-0 fw-bold">
                                    Contact Settings
                                </p>
                                <div className="card-body">
                                    <form onSubmit={updateUser}>
                                        <div className="mb-3">
                                            <label
                                                className="form-label"
                                                for="address"
                                            >
                                                <strong>Phone number</strong>
                                            </label>
                                            <input
                                                className="form-control form-control-user"
                                                type="text"
                                                id="address"
                                                placeholder="Sunset Blvd, 38"
                                                name="phone"
                                                required="required"
                                                onChange={handleInput}
                                                value={userInput.phone}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                className="form-label"
                                                for="address"
                                            >
                                                <strong>Address</strong>
                                            </label>
                                            <input
                                                className="form-control form-control-user"
                                                type="text"
                                                id="address-1"
                                                placeholder="Sunset Blvd, 38"
                                                name="address"
                                                required="required"
                                                onChange={handleInput}
                                                value={userInput.address}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                className="form-label"
                                                for="city"
                                            >
                                                <strong>City</strong>
                                            </label>
                                            <input
                                                className="form-control form-control-user"
                                                type="text"
                                                id="city"
                                                placeholder="Los Angeles"
                                                name="city"
                                                required="required"
                                                onChange={handleInput}
                                                value={userInput.city}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                className="form-label"
                                                for="country"
                                            >
                                                <strong>Country</strong>
                                            </label>
                                            <input
                                                className="form-control form-control-user"
                                                type="text"
                                                id="country"
                                                placeholder="USA"
                                                name="country"
                                                required="required"
                                                onChange={handleInput}
                                                value={userInput.phone}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                type="submit"
                                            >
                                                change password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className=" card shadow card-header py-10">
                                <p className="text-primary m-0 fw-bold">
                                    Contact Settings
                                </p>
                                <div className="card-body">
                                    <form onSubmit={changePassword}>
                                        <div className="col mb-3">
                                            <label
                                                className="form-label"
                                                for="password"
                                            >
                                                <strong>Password</strong>
                                            </label>
                                            <input
                                                className="form-control form-control-user"
                                                type="password"
                                                id="exampleInputPassword-1"
                                                placeholder="Enter Your Password..."
                                                name="password"
                                                required="required"
                                                onChange={(event) =>
                                                    handlePassword(event)
                                                }
                                            />
                                        </div>
                                        {passwordErr ? (
                                            <div className="error">
                                                <span>
                                                    your password should be
                                                    higher than 8 characters!
                                                </span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="mb-3">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                type="submit"
                                            >
                                                Save Settings
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;
