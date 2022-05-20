import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

function MyProjects() {
    const [posts, setPost] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const urls = "http://127.0.0.1:8000/api";

    let history = useHistory();
    const goTo = async (id) => {
        history.push("/projects/" + id);
    };

    const getMyProjects = async () => {
        let url = urls + "/projects/mine/" + localStorage.getItem("user");
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
        getMyProjects();
        AOS.init();
        AOS.refresh();
    }, []);

    return (
		<>

<h3 className="text-dark mb-4">My Projects</h3>
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
                                {post.state === "approved" ? (
                                    <label className="form-label approved">
                                        Approved
                                    </label>
                                ) : post.state === "rejected" ? (
                                    <label className="form-label rejected">
                                        Rejected
                                        <a className="rejected" href="#">
                                            ?
                                        </a>
                                    </label>
                                ) : (
                                    <label className="form-label pendding-approval">
                                        Pendidng Approval
                                    </label>
                                )}
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label title">
                                            Tools and Tags
                                        </label>
                                        <ul className="list-group keywords">
                                            {post.keywords.map(
                                                (keyword, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            className="list-group-item keyword"
                                                        >
                                                            <span>
                                                                {keyword}
                                                            </span>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
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
        </div></>
    );
}

export default MyProjects;
