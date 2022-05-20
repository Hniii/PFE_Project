import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [searchfield, setField] = useState("");
  let selected = false;
  let data = {
    searchfield,
  };

  let history = useHistory();
  const logout = ()=>{
	  localStorage.clear();
	  history.push("/login");
  }

  const search = async () => {
    let url = "http://127.0.0.1:8000/api/projects/search";
    let options = {
      method: "get",
      url: url,
      data: data,
    };

    let response = await axios(options);
    if (response.status === 200) {
      history.go("/search/results");
    }
  };

  const getNotifications = async () => {
    let url = "http://127.0.0.1:8000/api/users/notifications";
    let options = {
      method: "get",
      url: url,
    };
    await axios(options).then((res) => {
      let data = res.data;
      setNotifications(data);
    });
  };
  useEffect(() => {
    //getNotifications();
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
      <div className="container-fluid">
        <button
          className="btn btn-link d-md-none rounded-circle me-3"
          id="sidebarToggleTop"
          type="button"
        >
          <i className="fas fa-bars"></i>
        </button>
        <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              className="bg-light form-control border-0 small"
              type="text"
              placeholder="Search for ..."
              onChange={(event) => {
                setField(event.target.value);
              }}
            />
            <button
              className="btn btn-primary py-0"
              type="button"
              onClick={search}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <ul className="navbar-nav flex-nowrap ms-auto">
          <li className="nav-item dropdown no-arrow mx-1">
            <div className="nav-item dropdown no-arrow">
              <a
                className="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                href="#"
              >
                <span className="badge bg-danger badge-counter">
                  {notifications.length}+
                </span>
                <i className="fas fa-bell fa-fw"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                <h6 className="dropdown-header">alerts center</h6>
                {notifications.map((notification) => {
                  return (
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                      key={notification.id}
                    >
                      <div className="me-3">
                        <div className="bg-primary icon-circle">
                          <i className="fas fa-file-alt text-white"></i>
                        </div>
                      </div>
                      <div>
                        <span className="small text-gray-500">
                          {notification.created_at}
                        </span>
                        <p>notification.content</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </li>
          <div className="d-none d-sm-block topbar-divider"></div>
          <li className="nav-item dropdown no-arrow mx-1 d-flex align-items-center"  >
            <div className="nav-item no-arrow d-flex align-items-center">
              <button className="dropdown-item" onClick={logout}  >
                <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                &nbsp;Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
