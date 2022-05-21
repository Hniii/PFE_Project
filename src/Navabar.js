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
    const logout = () => {
        localStorage.clear();
        history.push("/login");
    };

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
        <nav className="navbar navbar-expand-lg navbar-fixed navbar-blue">
            <div className="navbar-inner">
                <div className="navbar-intro justify-content-xl-between">
                    <button
                        type="button"
                        className="btn btn-burger burger-arrowed static collapsed ml-2 d-flex d-xl-none"
                        data-toggle-mobile="sidebar"
                        data-target="#sidebar"
                        aria-controls="sidebar"
                        aria-expanded="false"
                        aria-label="Toggle sidebar"
                    >
                        <span className="bars" />
                    </button>
                    {/* mobile sidebar toggler button */}
                    <img
                            src={
                                window.location.origin +
                                "/assets/image/logo_ESIprojects_white.png"
                            }
                            style={{ width: "150px", height: "40px" }}
                        />
                    {/* /.navbar-brand */}
                    <button
                        type="button"
                        className="btn btn-burger mr-2 d-none d-xl-flex"
                        data-toggle="sidebar"
                        data-target="#sidebar"
                        aria-controls="sidebar"
                        aria-expanded="true"
                        aria-label="Toggle sidebar"
                    >
                        <span className="bars" />
                    </button>
                    {/* sidebar toggler button */}
                </div>
                {/* /.navbar-intro */}
                <div className="navbar-content">
                    <button
                        className="navbar-toggler py-2"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSearch"
                        aria-controls="navbarSearch"
                        aria-expanded="false"
                        aria-label="Toggle navbar search"
                    >
                        <i className="fa fa-search text-white text-90 py-1" />
                    </button>
                    {/* mobile #navbarSearch toggler */}
                    <div
                        className="collapse navbar-collapse navbar-backdrop"
                        id="navbarSearch"
                    >
                        <form
                            className="d-flex align-items-center ml-lg-4 py-1"
                            data-submit="dismiss"
                        >
                            <i className="fa fa-search text-white d-none d-lg-block pos-rel" />
                            <input
                                type="text"
                                className="navbar-input mx-3 flex-grow-1 mx-md-auto pr-1 pl-lg-4 ml-lg-n3 py-2 autofocus"
                                placeholder="SEARCH ..."
                                aria-label="Search"
                            />
                        </form>
                    </div>
                </div>
                {/* .navbar-content */}
                {/* mobile #navbarMenu toggler button */}
                <button
                    className="navbar-toggler ml-1 mr-2 px-1"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarMenu"
                    aria-controls="navbarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navbar menu"
                >
                    <span className="pos-rel">
                        <img
                            className="border-2 brc-white-tp1 radius-round"
                            width={36}
                            src={window.location.origin +"/assets/image/avatar/avatar2.jpeg"}
                            alt="Jason's Photo"
                        />
                        <span className="bgc-warning radius-round border-2 brc-white p-1 position-tr mr-n1px mt-n1px" />
                    </span>
                </button>
                <div
                    className="navbar-menu collapse navbar-collapse navbar-backdrop"
                    id="navbarMenu"
                >
                    <div className="navbar-nav">
                        <ul className="nav">
                            
                                        
                            <li className="nav-item dropdown dropdown-mega">
                                <a
                                    className="nav-link dropdown-toggle pl-lg-3 pr-lg-4"
                                    data-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-bell text-110 icon-animated-bell mr-lg-2" />
                                    <span className="d-inline-block d-lg-none ml-2">
                                        Notifications
                                    </span>
                                    {/* show only on mobile */}
                                    <span
                                        id="id-navbar-badge1"
                                        className="badge badge-sm bgc-warning-d2 text-white radius-round text-85 border-1 brc-white-tp5"
                                    >
                                        3
                                    </span>
                                    <i className="caret fa fa-angle-left d-block d-lg-none" />
                                    <div className="dropdown-caret brc-white" />
                                </a>
                                <div className="dropdown-menu dropdown-sm dropdown-animated p-0 bgc-white brc-primary-m3 border-b-2 shadow">
                                    <ul
                                        className="nav nav-tabs nav-tabs-simple w-100 nav-justified dropdown-clickable border-b-1 brc-secondary-l2"
                                        role="tablist"
                                    >
                                        <li className="nav-item">
                                            <a
                                                className="d-style px-0 mx-0 py-3 nav-link active text-600 brc-blue-m1 text-dark-tp5 bgc-h-blue-l4"
                                                data-toggle="tab"
                                                href="#navbar-notif-tab-1"
                                                role="tab"
                                            >
                                                <span className="d-active text-blue-d1 text-105">
                                                    Notifications
                                                </span>
                                            </a>
                                        </li>
                                        
                                    </ul>
                                    {/* .nav-tabs */}
                                    <div className="tab-content tab-sliding p-0">
                                        <div
                                            className="tab-pane mh-none show active px-md-1 pt-1"
                                            id="navbar-notif-tab-1"
                                            role="tabpanel"
                                        >
                                            <a
                                                href="#"
                                                className="mb-0 border-0 list-group-item list-group-item-action btn-h-lighter-secondary"
                                            >
                                                <i className="fab fa-twitter bgc-blue-tp1 text-white text-110 mr-15 p-2 radius-1" />
                                                <span className="text-muted">
                                                    Followers
                                                </span>
                                                <span className="float-right badge badge-danger radius-round text-80">
                                                    - 4
                                                </span>
                                            </a>
                                            <a
                                                href="#"
                                                className="mb-0 border-0 list-group-item list-group-item-action btn-h-lighter-secondary"
                                            >
                                                <i className="fa fa-comment bgc-pink-tp1 text-white text-110 mr-15 p-2 radius-1" />
                                                <span className="text-muted">
                                                    New Comments
                                                </span>
                                                <span className="float-right badge badge-info radius-round text-80">
                                                    +12
                                                </span>
                                            </a>
                                            <a
                                                href="#"
                                                className="mb-0 border-0 list-group-item list-group-item-action btn-h-lighter-secondary"
                                            >
                                                <i className="fa fa-shopping-cart bgc-success-tp1 text-white text-110 mr-15 p-2 radius-1" />
                                                <span className="text-muted">
                                                    New Orders
                                                </span>
                                                <span className="float-right badge badge-success radius-round text-80">
                                                    +8
                                                </span>
                                            </a>
                                            <a
                                                href="#"
                                                className="mb-0 border-0 list-group-item list-group-item-action btn-h-lighter-secondary"
                                            >
                                                <i className="far fa-clock bgc-purple-tp1 text-white text-110 mr-15 p-2 radius-1" />
                                                <span className="text-muted">
                                                    Finished processing data!
                                                </span>
                                            </a>
                                            <hr className="mt-1 mb-1px brc-secondary-l2" />
                                            <a
                                                href="#"
                                                className="mb-0 py-3 border-0 list-group-item text-blue text-uppercase text-center text-85 font-bolder"
                                            >
                                                See All Notifications
                                                <i className="ml-2 fa fa-arrow-right text-muted" />
                                            </a>
                                        </div>
                                        {/* .tab-pane : notifications */}
                                    </div>
                                </div>
                            </li>
                            
                            <li className="nav-item dropdown order-first order-lg-last">
                                <a
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img
                                        id="id-navbar-user-image"
                                        className="d-none d-lg-inline-block radius-round border-2 brc-white-tp1 mr-2 w-6"
                                        src={window.location.origin +"/assets/image/avatar/avatar2.jpeg"}
                                        alt="Jason's Photo"
                                    />
                                    <span className="d-inline-block d-lg-none d-xl-inline-block">
                                        <span
                                            className="text-90"
                                            id="id-user-welcome"
                                        >
                                            Welcome,
                                        </span>
                                        <span className="nav-user-name">
                                            Jason
                                        </span>
                                    </span>
                                    <i className="caret fa fa-angle-down d-none d-xl-block" />
                                    <i className="caret fa fa-angle-left d-block d-lg-none" />
                                </a>
                                <div className="dropdown-menu dropdown-caret dropdown-menu-right dropdown-animated brc-primary-m3 py-1">
                                    <div className="d-none d-lg-block d-xl-none">
                                        <div className="dropdown-header">
                                            Welcome, Jason
                                        </div>
                                        <div className="dropdown-divider" />
                                    </div>
                                   
                                    <a
                                        className="mt-1 dropdown-item btn btn-outline-grey bgc-h-primary-l3 btn-h-light-primary btn-a-light-primary"
                                        href="html/page-profile.html"
                                    >
                                        <i className="fa fa-user text-primary-m1 text-105 mr-1" />
                                        Profile
                                    </a>
                                    <a
                                        className="dropdown-item btn btn-outline-grey bgc-h-success-l3 btn-h-light-success btn-a-light-success"
                                        href="#"
                                        data-toggle="modal"
                                        data-target="#id-ace-settings-modal"
                                    >
                                        <i className="fa fa-cog text-success-m1 text-105 mr-1" />
                                        Settings
                                    </a>
                                    <div className="dropdown-divider brc-primary-l2" />
                                    <a
                                        className="dropdown-item btn btn-outline-grey bgc-h-secondary-l3 btn-h-light-secondary btn-a-light-secondary"
                                        onClick={logout}
                                    >
                                        <i className="fa fa-power-off text-warning-d1 text-105 mr-1" />
                                        Logout
                                    </a>
                                </div>
                            </li>
                            {/* /.nav-item:last */}
                        </ul>
                        {/* /.navbar-nav menu */}
                    </div>
                    {/* /.navbar-nav */}
                </div>
                {/* /#navbarMenu */}
            </div>
            {/* /.navbar-inner */}
        </nav>
    );
}

export default Navbar;
