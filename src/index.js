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
import ForgotPassword from "./components/users/ForgotPassword";

ReactDOM.render(
    <div id="wrapper">
        <BrowserRouter>
            <Switch>
                <Route exact path={"/forgotpassword"}>
                    <ForgotPassword></ForgotPassword>
                </Route>
                <Route exact path="/dashboard">
                <SideNav />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Navbar />
                    <Dashboard />
                        </div>
                        <Footer />
                    </div>
                </Route>
                <Route exact path="/admin/settings">
                    <SideNav />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Navbar />
                            <Settings />
                        </div>
                        <Footer />
                    </div>
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/users">
                    <SideNav />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Navbar />
                            <Users />
                        </div>
                        <Footer />
                    </div>
                </Route>
                <Route exact path="/profile">
                    <SideNav />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Navbar />
                            <Profile />
                        </div>
                        <Footer />
                    </div>
                </Route>
                <Route exact path="/users/add">
                    <SideNav />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Navbar />
                            <AddUser />
                        </div>
                        <Footer />
                    </div>
                </Route>
                <Route exact path="/projects/add">
                    <SideNav />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Navbar />
                            <AddProject />
                        </div>
                        <Footer />
                    </div>
                </Route>
                <Route exact path="/projects/mine">
                    <SideNav />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Navbar />
                            <MyProjects />
                        </div>
                        <Footer />
                    </div>
                </Route>
                <Route path="/projects/:id">
                    <SideNav />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Navbar />
                            <Project />
                        </div>
                        <Footer />
                    </div>
                </Route>
                <Route path="/projects/edit/:id">
                    <SideNav />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <Navbar />
                            <EditProject />
                        </div>
                        <Footer />
                    </div>
                </Route>
                <Route path="/*">
                    
                            <Error404 />
                        
                </Route>
            </Switch>
        </BrowserRouter>
    </div>,
    document.getElementById("root")
);
