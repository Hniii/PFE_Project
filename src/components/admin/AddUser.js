import React, { useEffect, useState, useCallback } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

function AddUser() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("student");
    const [birthday, setBirthday] = useState("");
    const [birthplace, setBirthplace] = useState("");
    const [gender, setGender] = useState("");

    const [firstnameErr, setfirstnameErr] = useState(false);
    const [lastnameErr, setlastnameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [addressErr, setAddressErr] = useState(false);
    const [phoneErr, setPhoneErr] = useState(false);

    const urls = "http://127.0.0.1:8000/api";
    const [token, setToken] = useState(localStorage.getItem("token"));
    var user = localStorage.getItem("user");

    let history = useHistory();

    async function addUser(event) {
        event.preventDefault();
        if (
            !(firstnameErr || lastnameErr || emailErr || addressErr || phoneErr)
        ) {
            const data = {
                email,
                firstname,
                lastname,
                address,
                phone,
                birthday,
                birthplace,
                gender,
                role,
            };
            console.log(data);
            let url = urls + "/register";
            let options = {
                method: "POST",
                url: url,
                data,

                headers: {
                    Accept: "application/json",
                },
            };
            let response = await axios(options);
            console.log(response);
            if (response) {
                if (response.status === 200) {
                    history.push("/users");
                }
            }
        }
    }
    function firstnameHandler(e) {
        let item = e.target.value;
        if (item.length < 2) {
            setfirstnameErr(true);
        } else {
            setfirstnameErr(false);
            setFirstname(e.target.value);
        }
    }
    function lastnameHandler(e) {
        let item = e.target.value;
        if (item.length < 2) {
            setlastnameErr(true);
        } else {
            setlastnameErr(false);
            setLastname(e.target.value);
        }
    }

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
    function phoneHandler(e) {
        let item = e.target.value;
        let pattern = /^(00213|\+213|0)(5|6|7)[0-9]{8}$/g;
        if (pattern.test(item)) {
            setPhoneErr(false);
            setPhone(e.target.value);
        } else {
            setPhoneErr(true);
        }
    }
    function addressHandler(e) {
        let item = e.target.value;
        //let pattern = /^([^,]+),([^,]+),[^(]*/;
        if (true) {
            setAddressErr(false);
            setAddress(e.target.value);
        } else {
            setAddressErr(true);
        }
    }
    useEffect(() => {
       /* let token = localStorage.getItem("token");
        console.log(token);
        if (token === null) {
            history.push("/login");
        }*/
    }, []);

    return (
        
                            <form onSubmit={addUser}className="m-3">
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>First Name</strong>
                                            </label>
                                            <input
                                                name="firstName"
                                                className="form-control form-control-user"
                                                type="text"
                                                placeholder="Type first name"
                                                required
                                                pattern="^[A-Za-z0-9]{3,16}$"
                                                //value={firstname}
                                                onChange={firstnameHandler}
                                            />{" "}
                                            {firstnameErr ? (
                                                <div className="error">
                                                    <span>Invalid name!</span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
        
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Last Name</strong>
                                            </label>
                                            <input
                                                name="lastName"
                                                className="form-control form-control-user"
                                                type="text"
                                                placeholder="Type last name"
                                                required
                                                // value={lastname}
                                                onChange={lastnameHandler}
                                            />{" "}
                                            {lastnameErr ? (
                                                <div className="error">
                                                    <span>Invalid name!</span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Email </strong>
                                            </label>
                                            <input
                                                name="email"
                                                className="form-control form-control-user"
                                                type="email"
                                                placeholder="x.lastname@esi-sba.dz"
                                                required
                                                // value={email}
                                                onChange={emailHandler}
                                            />{" "}
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
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Role</strong>
                                            </label>
                                            <select
                                                className="mt-4 ace-select no-border text-dark-tp2 radius-round border-2 angle-down"
                                                onChange={(e) =>
                                                    setRole(e.target.value)
                                                }
                                                defaultValue={role}
                                            >
                                                <optgroup
                                                    id="role"
                                                    label="Add a new :"
                                                >
                                                    <option value={"student"}>
                                                        Student
                                                    </option>
                                                    <option value={"company"}>
                                                        Company
                                                    </option>
                                                    <option value={"teacher"}>
                                                        Teacher
                                                    </option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Address</strong>
                                            </label>
                                            <input
                                                name="address"
                                                className="form-control form-control-user"
                                                type="text"
                                                placeholder="eg:123 Main Street, Algiers, Algeria"
                                                // value={address}
                                                onChange={addressHandler}
                                            />{" "}
                                            {addressErr ? (
                                                <div className="error">
                                                    <span>
                                                        Invalid address!
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Phone</strong>
                                            </label>
                                            <input
                                                name="phone"
                                                className="form-control form-control-user"
                                                type="text"
                                                placeholder="Format eg: 0213/+213/0--------"
                                                //value={phone}
                                                onChange={phoneHandler}
                                            />{" "}
                                            {phoneErr ? (
                                                <div className="error">
                                                    <span>
                                                        Invalid phone number,
                                                        please try again!
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Birthday</strong>
                                            </label>
                                            <input
                                                name="birthday"
                                                className="form-control form-control-user"
                                                type="date"
                                                required
                                                value={birthday}
                                                onChange={(e) =>
                                                    setBirthday(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Place of birth</strong>
                                            </label>
                                            <input
                                                name="Place of birth "
                                                className="form-control form-control-user"
                                                type="text"
                                                placeholder="Mohammadia, Algiers, Algeria"
                                                //value={placeOfBirth}
                                                onChange={(e) =>
                                                    setBirthplace(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                <strong>Gender</strong>
                                            </label>
                                            <select
                                                className="mt-4 ace-select  text-dark-tp2 radius-round border-2 angle-down"
                                                type="text"
                                                onChange={(e) =>
                                                    setGender(e.target.value)
                                                }
                                                defaultValue={role}
                                            >
                                                <optgroup id="role">
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col d-flex flex-row-reverse">
                                        <button
                                            className="btn btn-primary "
                                            type="submit"
                                            style={{
                                                width: "80px",
                                                borderRadius: "50px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                            
                        
    );
}
export default AddUser;
