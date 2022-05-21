import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

function Settings() {
  const [year, setYear] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [domaine, setDomaine] = useState("");
  const [type, setType] = useState("");
  const [levels, setLevels] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const urls = "http://127.0.0.1:8000/api";

  let history = useHistory();

  const addLevel = async (event) => {
    event.preventDefault();
    const data = {
      year,
      speciality,
      domaine,
      type,
    };
    let url = urls + "/levels/add";
    let options = {
      method: "POST",
      url: url,
      data,
      headers: {
        Authorization: "Bearer " + token,
        Accept: "Application/json",
      },
    };

    console.log(options);
    console.log(token);
    let response = await axios(options);
    console.log(response);
    if (response.status === 200) {
      history.push("/");
    }
    console.log("dsdasdaslogin");
  };

  const deleteLevel = async (levelId) => {
    let url = urls + "/levels/delete/" + levelId;
    let options = {
      method: "DELETE",
      url: url,
    };
    let response = await axios(options);
    if (response && response.status === 200) {
      history.push("/admin/settings");
    }
  };

  const editLevel = async (levelId) => {
    const data = {
      year,
      speciality,
      domaine,
      type,
    };
    let url = "http://127.0.0.1:8000/api/levels/edit" + levelId;
    let options = {
      method: "post",
      url: url,
      data: data,
    };
    let response = await axios(options);
    if (response.status === 200) {
      history.push("/");
    }
  };

  const getLevels = async () => {
    let url = urls + "/levels";
    let options = {
      method: "get",
      url: url,
      headers: {
        Authorization: "Bearer " + token,
        Accept: "Application/json",
      },
    };
    await axios(options).then((res) => {
      let response = res.data;
      setLevels(response.levels);
      console.log(response);
    });
  };

  useEffect(() => {
    getLevels();
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      className="card shadow-lg o-hidden border-0 my-5 "
      style={{ margin: "50px" }}
    >
      <div className="card-body p-0">
        <div className="col project-form">
          <div className="p-5">
              <h4 className="text-dark mb-4">Add New Level!</h4>
              <form className="user" onSubmit={addLevel}>
                <div className="row mb-3">
                  <label className="form-label">Year</label>
                  <input
                    id="exampleFirstName-1"
                    className="form-control form-control-user "
                    type="text"
                    placeholder="Enter the year..."
                    name="year"
                    onChange={(event) => {
                      setYear(event.target.value);
                    }}
                  />
                </div>
                <div className="row mb-3">
                  <label className="form-label">Speciality</label>
                  <input
                    id="exampleFirstName-1"
                    className="form-control form-control-user "
                    type="text"
                    placeholder="Enter the specialty..."
                    name="specialty"
                    onChange={(event) => {
                      setSpeciality(event.target.value);
                    }}
                  />
                </div>
                <div className="row mb-3">
                  <label className="form-label">Domaine</label>
                  <input
                    id="exampleFirstName-1"
                    className="form-control form-control-user "
                    type="text"
                    placeholder="Enter the year..."
                    name="domaine"
                    onChange={(event) => {
                      setDomaine(event.target.value);
                    }}
                  />
                </div>
                <div className="row mb-3">
                  <label className="form-label">type</label>
                  <input
                    id="exampleFirstName-1"
                    className="form-control form-control-user "
                    type="text"
                    placeholder="Enter the type..."
                    name="type"
                    onChange={(event) => {
                      setType(event.target.value);
                    }}
                  />
                </div>
                <div className="row mb-3">
                  <button
                    className="btn btn-primary d-block add-btn"
                    type="submit"
                    style={{
                      textAlign: "center",
                      fontSize: "larger",
                      width: "180px",
                      borderRadius: "50px",
                    }}
                  >
                    Create new level
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
