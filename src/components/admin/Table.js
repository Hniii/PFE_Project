import React, { useState, Fragment,useEffect,useCallback } from  "react";
import { nanoid } from "nanoid";
import { Link, useHistory,useParams } from "react-router-dom";
import { Swal } from "sweetalert2";
import axios from "axios";
import AOS from "aos";

import AddUser from "./AddUser";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}
 

const Table = () => {
 const [length, setLength] = useState(10);
  const [page, setPage] = useState([{'name':'fsdhfdfs','email':'qsddqs','role':'sqfdqsd'}]);
  let numPage = 0;
  const [num, setNum] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [showForm, setShowForm] =useState(false);
  const [users, setUsers] = useState(data);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const urls = "http://127.0.0.1:8000/api";
  let history = useHistory();
  const { id } = useParams();
  const minus = () => {
    setPage(users.slice((num - 1) * length, num * length));
    setNum(num - 1);
  };
  const plus = () => {
    setPage(users.slice((num + 1) * length, (num + 2) * length));
    setNum(num + 1);
  };

  const selectPage = (event) => {
    numPage = parseInt(event.target.value) - 1;
    setNum(numPage);
    setPage(users.slice(numPage * length, (numPage + 1) * length));
    console.log(users.slice(numPage * length, (numPage + 1) * length));
  };

  const getUsers = async () => {
    let url = urls + "/users";
    let options = {
      method: "get",
      url: url,
      headers: {
        Authorization: "Bearer " + token,
        Accept: "Application/json",
      },
    };
    let response = await axios(options);
    let data = response.data;
    setUsers(data);
    if (10 > data.length) {
      setPage(data);
    } else {
      setPage(data.slice(0, 10));
      setNumbers(range(1, Math.ceil(data.length / 10)));
    }
  };
  const filter= ( input)=> { 
    if (input===""){
        //getUsers();
    }
    var result = [];

    for( var i= 0, len = users.length; i < len; i++) {
        var el = users[i];

        if( el.name === input || el.email === input || el.role=== input ) {
            result.push( el );
        }
    }

    numPage=0;
    setNum(0);
    setPage(result.slice(numPage * length, (numPage + 1) * length));
}

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    //getUsers();
  }, []);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName:"",
    email: "",
    role: "",
    status:"",
  });

  const [editUserId, setEditUserId] = useState(null);


  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedUser = {
      id: editUserId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      email: editFormData.email,
      role: editFormData.role,
      status: editFormData.status,
    };

    const newUsers = [...users];

    const index = users.findIndex((user) => user.id === editUserId);

    newUsers[index] = editedUser;

    setUsers(newUsers);
    setEditUserId(null);
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);

    const formValues = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  

  const handleDeleteClick = async (userId) => {
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


  const addUser = ()=>{
    setShowForm(!showForm);
  }
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
                <form onSubmit={handleEditFormSubmit}>
                <table id="simple-table" className="mb-0 table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden">
                <thead className="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
                      <tr>
                        <th>
                          First Name</th>
                        <th>
                          Last Name</th>
                        <th className="d-none d-sm-table-cell">
                          Email</th>
                        <th className="d-none d-sm-table-cell">
                          Role</th>
                        <th className="d-none d-sm-table-cell">
                          Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="mt-1">
                      {users.map((user) => (
                        <Fragment>
                          {editUserId === user.id ? (
                            <EditableRow
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                              
                            />
                          ) : (
                            <ReadOnlyRow
                              user={user}
                              handleEditClick={handleEditClick}
                              handleDeleteClick={handleDeleteClick}
                            />
                          )}
                          
                        </Fragment>
                      ))}
                      
                    </tbody> 
                  </table>
                </form>
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
   </>
  );
};

export default Table;