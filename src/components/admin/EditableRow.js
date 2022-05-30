import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr className="bgc-h-yellow-l5 d-style">
      <td className="text-center pr-0 pos-rel" >
        <input
          className="form-control form-control-user "
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="firstName"
          value={editFormData.firstName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="text-center pr-0 pos-rel">
        <input
          className="form-control form-control-user "
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="lastName"
          value={editFormData.lastName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="text-blue-d1 text-600 text-95">
        <input
          className="form-control form-control-user "
          type="email"
          required="required"
          placeholder="Enter an address..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="text-600 text-orange-d2">
        <select
            className="mt-3 ace-select no-border text-dark-tp2 radius-round border-2 angle-down"
            onChange={handleEditFormChange}
            defaultValue={editFormData.role}
            name="role"
            >
            <optgroup
            id="role"
            label="Change role to:"
            >
                <option value={"student"}>Student</option>
                <option value={"company"}>Company</option>
                <option value={"teacher"}>Teacher</option>
            </optgroup>
            </select>
      </td>
      <td>
        <div className="d-none d-lg-flex">
           <button type="submit"  className="mx-3px btn btn-outline btn-h-outline-green btn-a-outline-green border-b-2 px-2  ">
                <i className="fa fa-check  text-110 text-success-m1 mr-1"></i> Save
           </button>
           <button type="button" onClick={handleCancelClick} className="mx-2px btn btn-outline btn-h-outline-red btn-a-outline-red border-b-2 px-2 ">
                <i className="fa fa-times text-110 text-danger-m1 mr-1"></i> Cancel
           </button>
        </div>
      </td>
      <td/>
    </tr>
  );
};

export default EditableRow;