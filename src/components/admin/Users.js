import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { Swal } from "sweetalert2";
import axios from "axios";
import AOS from "aos";




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

    const [token, setToken] = useState(localStorage.getItem("token"));
    const user = localStorage.getItem("user");
    const urls = "http://127.0.0.1:8000/api";

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

    useEffect(() => {
        AOS.init();
        AOS.refresh();
        getUsers();
    }, []);

    return (
        <div className="container-fluid">
            <h3 className="text-dark mb-4">Users</h3>
            <div className="card shadow">
                <div className="card-header py-3 d-flex flex-row justify-content-between align-items-center">
                    <p className="text-primary m-0 fw-bold">User Info</p>
                    <Link to={"/users/add"} className="btn btn-primary">
                        <i className="fas fa-user-plus"></i>
                    </Link>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <label className="form-label">
                                Show&nbsp;&nbsp;
                            </label>
                            <select
                                className="d-inline-block form-select form-select-s selector"
                                onChange={(event) => show(event)}
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                    <div
                        className="table-responsive table mt-2"
                        id="dataTable"
                        role="grid"
                        aria-describedby="dataTable_info"
                    >
                        <table className="table my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {page.map((user, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>
                                                <img
                                                    className="rounded-circle me-2"
                                                    width="30"
                                                    height="30"
                                                    src="assets/img/avatars/avatar1.jpeg"
                                                />
                                                {user.firstName} {user.lastName}{" "}
                                                {user.name}
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td style={{ width: "50px" }}>
                                                <div className="col">
                                                    <a
                                                        className="btn btn-danger btn-circle"
                                                        role="button"
                                                        onClick={() =>
                                                            deleteUser(
                                                                user.user_id
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-trash text-white"></i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <strong>Name</strong>
                                    </td>
                                    <td>
                                        <strong>Email</strong>
                                    </td>
                                    <td>
                                        <strong>Role</strong>
                                    </td>
                                    <td>
                                        <strong>Action</strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
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
        </div>
    );
}

export default Users;
