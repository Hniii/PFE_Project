import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Users from "./components/admin/Users";
import AddProject from "./components/projects/AddProject";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Navbar from "./Navabar";
import Dashboard from "./Dashboard";
import Login from "./components/users/Login";
import Settings from "./components/admin/Settings";
import MyProjects from "./components/projects/MyProjects";
import AddUser from "./components/admin/AddUser";
import Profile from "./components/users/Profile";
import Project from "./components/projects/Project";
import Error404 from "./components/errors/404";
import EditProject from "./components/projects/EditProject";
import Home from "./Home";

ReactDOM.render(
    <div id="wrapper">
        <BrowserRouter>
            <Switch>
                <Route exact path="/dashboard">
                    <div className="body-container">
                        <Navbar />
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <Dashboard />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/admin/settings">
                    <div className="body-container">
                        <Navbar />
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <Settings />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/users">
                    <div className="body-container">
                        <Navbar />
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <Users />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/profile">
                    <div className="body-container">
                        <Navbar />
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <Profile />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/users/add">
                    <div className="body-container">
                        <Navbar />
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <AddUser />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/projects/add">
                    <div className="body-container">
                        <Navbar />
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <AddProject />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/projects/mine">
                    <div className="body-container">
                        <Navbar />
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <MyProjects />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path="/projects/:id">
                    <div className="body-container">
                        <Navbar />
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <Project />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path="/projects/edit/:id">
                    <div className="body-container">
                        <Navbar />
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <EditProject />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path={"/"}>
                    <Home />
                </Route>
                <Route path="/*">
                    <div className="body-container">
                        <Navbar></Navbar>
                        <div className="main-container bgc-white">
                            <SideNav />
                            <div className="main-content" role={"main"}>
                                <Error404 />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>,
    document.getElementById("root")
);
