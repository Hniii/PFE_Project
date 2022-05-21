import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

function Dashboard() {
    const [posts, setPost] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const urls = "http://127.0.0.1:8000/api";

    let history = useHistory();
    const goTo = async (id) => {
        history.push("/projects/" + id);
    };

    const getAll = async () => {
        let url = urls + "/all";
        let options = {
            method: "get",
            url: url,
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        console.log("options");
        await axios(options).then((res) => {
            let data = res.data;
            setPost(data);
        });
    };
    const getProjects = async () => {
        let url = urls + "/projects/";
        let options = {
            method: "get",
            url: url,
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        console.log("options");
        await axios(options).then((res) => {
            let data = res.data;
            setPost(data);
        });
    };
    useEffect(() => {
        if (token !== null) {
            if (role === "admin") {
                getAll();
            } else {
                getProjects();
            }
            AOS.init();
            AOS.refresh();
        } else {
            history.push("/login");
        }
    }, []);

    return (
        <div className="page-content container container-plus">
            <h1 class="page-title text-primary-d2 text-150">Dashboard</h1>
            <div className="col">
                {() => {
                    if (posts.length === 0) {
                        return <h1>Oops! there is no project to display</h1>;
                    }
                }}
                {posts.map((post, id) => {
                    return (
                        <div key={id} className="row">
                            <div className="col">
                                <div className="project shadow-lg">
                                    <label className="form-label project-title">
                                        {post.title}
                                    </label>
                                    {role === "admin" ? (
                                        post.state === "approved" ? (
                                            <label className="form-label approved">
                                                Approved
                                            </label>
                                        ) : post.state === "rejected" ? (
                                            <label className="form-label rejected">
                                                Rejected
                                                <a
                                                    className="rejected"
                                                    href="#"
                                                >
                                                    ?
                                                </a>
                                            </label>
                                        ) : (
                                            <label className="form-label pendding-approval">
                                                Pendidng Approval
                                            </label>
                                        )
                                    ) : (
                                        ""
                                    )}

                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label title">
                                                keywords
                                            </label>
                                            <ul className=" keywords">
                                                {post.keywords.map(
                                                    (keyword, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                className="keyword"
                                                            >
                                                                <span>
                                                                    {keyword}
                                                                </span>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-between">
                                            <label>author</label>
                                            <button
                                                className="btn btn-primary more-details-btn"
                                                type="button"
                                                onClick={() => {
                                                    goTo(post.id);
                                                }}
                                            >
                                                More details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Dashboard;
