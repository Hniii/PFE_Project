import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { Swal } from "sweetalert2";
import axios from "axios";
import AOS from "aos";
import AddUser from "./AddUser";
import  Cell from "./Cell";




function range(start, end) {
    return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
}

function Users() {
    const [users, setUsers] = useState([]);
    const [length, setLength] = useState(10);
    const [page, setPage] = useState([]);
    let numPage = 0;
    const [num, setNum] = useState(0);
    const [numbers, setNumbers] = useState([]);
    const [showForm, setShowForm] =useState(false);
    const [editing, setEditing] =useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const user = localStorage.getItem("user");
    const urls = "http://127.0.0.1:8000/api";


    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("student");
    const [status, setStatus] = useState("");

    const [firstnameErr, setfirstnameErr] = useState(false);
    const [lastnameErr, setlastnameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
 
    async function AddUser(event) {
        event.preventDefault();
        if (
            !(firstnameErr || lastnameErr || emailErr)
        ) {
            const data = {

                firstname,
                lastname,
                email,
                role,
                status,
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
    };
    let history = useHistory();

    const show= (event)=>{
        
             setLength(event.target.value);
            if (event.target.value > users.length) {
                
                setNum(0);
                numPage = 0;
                setPage(users);
            } else {
                setPage(users.slice(0, event.target.value));
                setNumbers(range(1, Math.ceil(users.length / event.target.value)));
                setNum(0);
                numPage =0 ;
            }
        
    }

    const minus = () => {

        setPage(users.slice((num-1) * length, (num) * length));
        setNum(num-1);

    };
    const plus = () => {

        setPage(users.slice((num+1) * length, (num + 2) *length));
        setNum(num+1);

    };

    const selectPage = (event) => {
        numPage = parseInt(event.target.value) - 1;
        setNum(numPage);
        setPage(users.slice(numPage * length, (numPage + 1) * length));
        console.log(users.slice(numPage * length, (numPage + 1) * length));
    };

    const getUsers = async () => {
        let url = urls + "/users/"+user;
        let options = {
            method: "get",
            url: url,
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        let response = await axios(options);
        let data = []
        for(var i in response.data)
                data.push(response.data[i]);
        setUsers(data);
        console.log(data);
        if (10 > data.length) {
            setPage(data);
        } else {
            setPage(data.slice(0, 10));
            setNumbers(range(1, Math.ceil(data.length / 10)));
        }
    };

    const deleteUser = async (userId) => {
        const Swal = require("sweetalert2");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#FFBB47",
            showCancelButton: true,
            confirmButtonColor: "#16537e",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
        }).then(async (result) => {
            if (result.isConfirmed) {
                let url = urls + "/deleteUser/" + userId;
                let options = {
                    method: "DELETE",
                    url: url,
                    headers: {
                        Authorization: "Bearer " + token,
                        Accept: "Application/json",
                    },
                };
                let response = await axios(options);
                if (response && response.status === 200) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        iconColor: "#3dc00c",
                    }).then(async () => getUsers());
                    
                }
            }
        });
    };
    function firstnameHandler(e) {
        let item = e.target.value;
        if (item.length < 2) {
            setfirstnameErr(true);
        } else {
            setfirstnameErr(false);
            setFirstname(e.target.value);
        }
    }
    const addUser = ()=>{
        setShowForm(!showForm);
    }
    
    useEffect(() => {
        AOS.init();
        AOS.refresh();
        getUsers();
    }, []);
    function firstnameHandler(e) {
        let item = e.target.value;
        if (item.length < 2) {
            setfirstnameErr(true);
        } else {
            setfirstnameErr(false);
            setFirstname(e.target.value);
        }
    }
    return (
        <>
        {showForm ? 
            <div className="AddUser" >
                <div className="row mb-3" style={{width:"80%"}}>
            
                <div className="col">
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">Add user</p>
                            <a href="#" data-action="close"  onClick={addUser} className="card-toolbar-btn text-danger">
                          <i class="fa fa-times"></i>
                        </a>
                        </div>
                        <div className="card-body"></div>
                <AddUser/>
                </div>
                    </div>
                    </div>
                </div>
            
          
            :""}
        <div className="container-fluid">
            
            <h3 className="text-dark mb-4">Users</h3>
            <div className="card shadow">
                <div className="card-header py-3 d-flex flex-row justify-content-between align-items-center">
                    <p className="text-primary m-0 fw-bold">User Info</p>
                    <Link onClick={addUser} className="btn btn-primary">
                        <i className="fas fa-user-plus"></i>
                    </Link>
                </div>
                <div className="card-body">
                    
                    <div
                        className="table-responsive table mt-2"
                        id="dataTable"
                        role="grid"
                        aria-describedby="dataTable_info"
                    >
                        <form>
                        <table id="simple-table" className="mb-0 table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden">
                <thead className="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
                    <tr>
                      <th>
                       First  Name
                      </th>
                      <th>
                        Last Name
                      </th>
                      <th className="d-none d-sm-table-cell">
                        Email
                      </th>
                      <th className="d-none d-sm-table-cell">
                        Role
                      </th>
                      <th className="d-none d-sm-table-cell">
                        Status
                      </th>
                      <th />
                      <th />
                    </tr>
                  </thead>
                   <tbody className="mt-1">
                        <tr className="bgc-h-yellow-l5 d-style">
                      <td className="text-center pr-0 pos-rel">
                      Ahmed
                      </td>
                      <td className="text-center pr-0 pos-rel">
                      
                      </td>
                      <td className="text-blue-d1 text-600 text-95">
                      a.benhmed@esi-sba.dz
                     </td>
                      <td className="text-600 text-orange-d2">
                       Teacher
                      </td>
                     
                      <td className="d-none d-sm-table-cell">
                        <span className="badge badge-sm bgc-warning-d1 text-white pb-1 px-25">Main Supervisor</span>
                      </td>
                      <td className="text-center pr-0">
                        <div>
                          <a href="#" data-toggle="collapse" data-target="#table-detail-0" className="d-style btn btn-outline-info text-90 text-600 border-0 px-2 collapsed" title="Show Details">
                            <span className="d-none d-md-inline mr-1">
                              Details
                            </span>
                            <i className="fa fa-angle-down toggle-icon opacity-1 text-90" />
                          </a>
                        </div>
                      </td>
                      <td>
                        {/* action buttons */}
                        <div className="d-none d-lg-flex">
                          <Link href="/profile"  className="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-success btn-a-lighter-success">
                            <i className="fa fa-pencil-alt" />
                          </Link>
                          <a href="#" className="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-danger btn-a-lighter-danger">
                            <i className="fa fa-trash-alt" />
                          </a>
                        </div>
                        {/* show a dropdown in mobile */}
                        <div className="dropdown d-inline-block d-lg-none dd-backdrop dd-backdrop-none-lg">
                          <a href="#" className="btn btn-default btn-xs py-15 radius-round dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-cog" />
                          </a>
                          <div className="dropdown-menu dd-slide-up dd-slide-none-lg">
                            <div className="dropdown-inner">
                              <div className="dropdown-header text-100 text-secondary-d1 border-b-1 brc-secondary-l2 text-600 mb-2">
                                Settings
                              </div>
                              <a href="/profile" className="dropdown-item">
                                <i className="fa fa-pencil-alt text-blue mr-1 p-2 w-4" />
                                Edit
                              </a>
                              <a href="#" className="dropdown-item">
                                <i className="fa fa-trash-alt text-danger-m1 mr-1 p-2 w-4" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* detail row */}
                    <tr className="border-0 detail-row bgc-white">
                      <td colSpan={8} className="p-0 border-none brc-secondary-l2">
                        <div className="table-detail collapse" id="table-detail-0">
                          <div className="row">
                            <div className="col-12 col-md-10 offset-md-1 p-4">
                              <div className="alert bgc-secondary-l4 text-dark-m2 border-none border-l-4 brc-primary-m1 radius-0 mb-0">
                                <h4 className="text-primary">
                                  Row Details
                                </h4>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo massa sed ipsum porttitor facilisis.
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                                {page.map((user, id) => {
                                    return (
                                        <tr key={id} className="bgc-h-yellow-l4 d-style">
                                            <td className="text-center pr-0 pos-rel">
                                                {user.firstName} 
                                                {user.name}
                                            </td>
                                            <td className="text-center pr-0 pos-rel">
                                                {user.lastName}{" "}
                                            </td>
                                            <td className="text-blue-d1 text-600 text-95">
                                                {user.email}
                                            </td>
                                            <td >
                                                {user.role === "teacher" ? (
                                                    <label className="text-600 text-orange-d2"> Teacher </label>

                                                ) : user.role === "student" ? (
                                                    <label className="text-600 text-green-d2"> Student </label>
                                                ) :  user.role === "company" ? (
                                                        <label className="text-600 text-yellow-d2"> Student </label>
                                                ) : (
                                                    <label className="text-600 text-danger"> Admin </label>
                                                )}
                                            </td>
                                            <td className="text-center pr-0">
                                                <div>
                                                <Link href="#" data-toggle="collapse" data-target="#table-detail-0" className="d-style btn btn-outline-info text-90 text-600 border-0 px-2 collapsed" title="Show Details">
                                                    <span className="d-none d-md-inline mr-1">
                                                    Details
                                                    </span>
                                                    <i className="fa fa-angle-down toggle-icon opacity-1 text-90" />
                                                </Link>
                                                </div>
                                            </td>
                                            <td>
                                                {/* action buttons */}
                                                <div className="d-none d-lg-flex">
                                                   <Link href="/profile" className="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-success btn-a-lighter-success">
                                                   <i className="fa fa-pencil-alt" />
                                                   </Link>
                                                    <Link
                                                        className="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-danger btn-a-lighter-danger"
                                                        role="button"
                                                        onClick={() =>
                                                            deleteUser(
                                                                user.user_id
                                                            )
                                                        }
                                                    >
                                                        <i className="fa fa-trash-alt"></i>
                                                    </Link>
                                                </div>
                                                 {/* show a dropdown in mobile */}
                                                    <div className="dropdown d-inline-block d-lg-none dd-backdrop dd-backdrop-none-lg">
                                                    <Link to="#" className="btn btn-default btn-xs py-15 radius-round dropdown-toggle" data-toggle="dropdown">
                                                        <i className="fa fa-cog" />
                                                    </Link>
                                                    <div className="dropdown-menu dd-slide-up dd-slide-none-lg">
                                                        <div className="dropdown-inner">
                                                        <div className="dropdown-header text-100 text-secondary-d1 border-b-1 brc-secondary-l2 text-600 mb-2">
                                                            Settings
                                                        </div>
                                                        <Link to="/profile" className="dropdown-item">
                                                            <i className="fa fa-pencil-alt text-blue mr-1 p-2 w-4" />
                                                            Edit
                                                        </Link>
                                                        <Link
                                                                                    className="dropdown-item"
                                                                                    role="button"
                                                                                    onClick={() =>
                                                                                        deleteUser(
                                                                                            user.user_id
                                                                                        )
                                                                                    }
                                                                                >
                                                            <i className="fa fa-trash-alt text-danger-m1 mr-1 p-2 w-4" />
                                                            Delete
                                                        </Link>
                                                        </div>
                                                    </div>
                                                    </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        </form>
                        {/* table footer */}
                <div className="d-flex pl-4 pr-3 pt-35 border-t-1 brc-secondary-l3 flex-column flex-sm-row mt-n1px">
                  <div className="text-nowrap align-self-center align-self-sm-start">
                        <span className="d-inline-block text-grey-d2">
                             Show
                         </span>
                            <select
                                className="ml-3 ace-select no-border angle-down brc-h-blue-m3 w-auto pr-45 text-secondary-d3"
                                onChange={(event) => show(event)}
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                  <div className="btn-group ml-sm-auto mt-3 mt-sm-0">
                    <a href="#" className="btn btn-lighter-default btn-bgc-white btn-a-secondary radius-l-1 px-3 border-2">
                      <i className="fa fa-caret-left mr-1" />
                      Prev
                    </a>
                    <a href="#" className="btn btn-lighter-default btn-bgc-white btn-a-secondary radius-r-1 px-3 border-2 ml-n2px">
                      Next
                      <i className="fa fa-caret-right ml-1" />
                    </a>
                  </div>
                </div>
                    </div>
                    {page.length < users.length ? (
                        <div className="row">
                            <div className="col-md-6 align-self-center">
                                <p
                                    id="dataTable_info"
                                    className="dataTables_info"
                                    role="status"
                                    aria-live="polite"
                                >
                                    Showing {num * length + 1} to{" "}
                                    {num * length + page.length} of {users.length}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                    <ul className="pagination">
                                        <li
                                            className={
                                                "page-item " +
                                                (num === 0 ? "disabled" : "")
                                            }
                                        >
                                            <button
                                                className={"page-link "}
                                                onClick={minus}
                                            >
                                                <span >
                                                    «
                                                </span>
                                            </button>
                                        </li>

                                        {numbers.map((number, id) => {
                                            return (
                                                <li
                                                    key={number}
                                                    className={
                                                        "page-item " +
                                                        (number === num + 1
                                                            ? "active"
                                                            : "")
                                                    }
                                                >
                                                    <button
                                                        value={number}
                                                        className="page-link"
                                                        onClick={(event) =>
                                                            selectPage(event)
                                                        }
                                                    >
                                                        {number}
                                                    </button>
                                                </li>
                                            );
                                        })}

                                        <li
                                            className={
                                                "page-item " +
                                                (num ===numbers.length-1
                                                    ? "disabled"
                                                    : "")
                                            }
                                        >
                                            <button
                                                className={"page-link "}
                                                onClick={plus}
                                            >
                                                <span >
                                                    »
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div></>
    );
}

export default Users;
