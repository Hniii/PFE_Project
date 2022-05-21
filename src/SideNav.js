import { Link } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideNav() {
    const [role, setRole] = useState(localStorage.getItem("role"));
    return (
        <div
            id="sidebar"
            className="sidebar sidebar-fixed expandable sidebar-light has-open"
        >
            <div className="sidebar-inner">
                <div className="flex-grow-1 ace-scroll" data-ace-scroll="{}">
                    <ul className="nav has-active-border active-on-right">
                        <li className="nav-item">
                            <Link
                                to={"/dashboard"}
                                className="nav-link"
                            >
                                <i className="fas fa-tachometer-alt nav-icon"></i>
                                <span className="nav-text fadeable">
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to={"/profile"}
                                className="nav-link "
                            >
                                <i className="fas fa-user nav-icon"></i>
                                <span className="nav-text fadeable">
                                    Profile
                                </span>
                            </Link>
                        </li>

                        {role === "teacher" ? (
                            <li className="nav-item">
                                <Link
                                    to={"/projects/mine"}
                                    className="nav-link"
                                >
                                    <i className="fas fa-table nav-icon"></i>
                                    <span className="nav-text fadeable">
                                        My Projects
                                    </span>
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                        {role === "teacher" ? (
                            <li className="nav-item">
                                <Link
                                    to={"/projects/add"}
                                    className="nav-link "
                                >
                                    <i className="fas fa-folder-plus nav-icon"></i>
                                    <span className="nav-text fadeable">
                                        Propose Project
                                    </span>
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                        {role === "admin" ? (
                            <li className="nav-item">
                                <Link
                                    to={"/admin/settings"}
                                    className="nav-link "
                                >
                                    <i className="fas fa-cog nav-icon"></i>
                                    <span className="nav-text fadeable">
                                        Settings
                                    </span>
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                        {role === "admin" ? (
                            <li className="nav-item">
                                <Link
                                    to={"/users"}
                                    className="nav-link  "
                                >
                                    <i className="fas fa-users nav-icon"></i>
                                    <span className="nav-text fadeable">
                                        Users
                                    </span>
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                    </ul>
                </div>
                {/* /.sidebar scroll */}
            </div>
        </div>
    );
}

export default SideNav;
