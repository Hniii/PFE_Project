import { Link } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideNav() {
    const [role, setRole] = useState(localStorage.getItem("role"));
    return (
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-color p-0 side-nav-bare">
            <div className="container-fluid d-flex flex-column p-0">
                <Link
                    to={"/"}
                    className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
                >
                    <div className="sidebar-brand-icon ">
                        <img
                            src={
                                window.location.origin +
                                "/assets/img/logo_ESIprojects_white.png"
                            }
                            style={{ width: "150px", height: "50px" }}
                        />
                    </div>
                </Link>
                <hr className="sidebar-divider my-0" />
                <ul className="navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item">
                        <Link to={"/dashboard"} className="nav-link">
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={"/profile"}
                            className="nav-link"
                            href="profile.html"
                        >
                            <i className="fas fa-user"></i>
                            <span>Profile</span>
                        </Link>
                    </li>

                    {role === "teacher" ? (
                        <li className="nav-item">
                            <Link to={"/projects/mine"} className="nav-link">
                                <i className="fas fa-table"></i>
                                <span>My Projects</span>
                            </Link>
                        </li>
                    ) : (
                        ""
                    )}
                    {role === "teacher" ? (
                        <li className="nav-item">
                            <Link to={"/projects/add"} className="nav-link">
                                <i className="fas fa-folder-plus"></i>
                                <span>Propose Project</span>
                            </Link>
                        </li>
                    ) : (
                        ""
                    )}
                    {role === "admin" ? (
                        <li className="nav-item">
                            <Link
                                to={"/admin/settings"}
                                className="nav-link"
                                href="Users.html"
                            >
                                <i className="fas fa-cog"></i>
                                <span>Settings</span>
                            </Link>
                        </li>
                    ) : (
                        ""
                    )}
                    {role === "admin" ? (
                        <li className="nav-item">
                            <Link to={"/users"} className="nav-link">
                                <i className="fas fa-users"></i>
                                <span>Users</span>
                            </Link>
                        </li>
                    ) : (
                        ""
                    )}
                    <li className="nav-item">
                        <a
                            href="http://127.0.0.1:8000/is_chef"
                            className="nav-link"
                        >
                            <i className="fas fa-folder-plus"></i>
                            <span>select chef</span>
                        </a>
                    </li>
                </ul>
                {/* <div className="text-center d-none d-md-inline">
					<button
						className="btn rounded-circle border-0"
						id="sidebarToggle"
						type="button"
					></button>
				</div> */}
            </div>
        </nav>
    );
}

export default SideNav;
