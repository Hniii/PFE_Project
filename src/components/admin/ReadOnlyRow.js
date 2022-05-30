import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import Details from "./Details";

const ReadOnlyRow = ({user, handleEditClick, handleDeleteClick }) => {
  const [showDetails, setDetails] =useState(false);
   
 
  return (
    <>
    
    <tr className="bgc-h-blue-l5 d-style">
      <td className="text-center pr-0 pos-rel">{user.firstName}</td>
      <td className="text-center pr-0 pos-rel">{user.lastName} </td>
      <td className="text-blue-d1 text-600 text-95">{user.email}</td>
      <td >
        {user.role === "teacher" ? (
           <label className="m-1 badge bgc-orange-l2 radius-round text-dark-tp4 px-4 text-90">
              Teacher </label>
            ) : user.role === "student" ? (

             <label className="m-1 badge bgc-green-l2 radius-round text-dark-tp4 px-4 text-90">
              Student </label>
            ) :  user.role === "company" ? (

              <label className="m-1 badge bgc-yellow-l2 radius-round text-dark-tp4 px-3 text-90">
               Company </label>
            ) : (
              <label className="m-1 badge bgc-red-l2 radius-round text-dark-tp4 px-3 text-90"> Admin </label>
            )}
      </td>
     
     
        <div className="mt-3 d-none d-lg-flex">
          <Link type="button" onClick={(event) => handleEditClick(event, user)} className="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-success btn-a-lighter-success">
            <i className="fa fa-pencil-alt" />
          </Link>
          <Link
            className="mx-2px btn radius-1 border-2 btn-xs btn-brc-tp btn-light-secondary btn-h-lighter-danger btn-a-lighter-danger"
            role="button"
            onClick={() => handleDeleteClick(user.id)}
          >
            <i className=" fa fa-trash-alt"></i>
          </Link>
        </div>
      
    </tr>
   
    </>
  );
};

export default ReadOnlyRow;

