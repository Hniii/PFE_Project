import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";

function AddProject() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [file, setFile] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [level, setLevel] = useState(1);
    const [levels, setLevels] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    var user = localStorage.getItem("user");
    const urls = "http://127.0.0.1:8000/api";

    const addKeyword = async () => {
        if (keyword !== "" && !keywords.includes(keyword)) {
            let list = keywords;
            list.push(keyword);
            setKeywords(list);
            setKeyword("");
        } else if (keywords.includes(keyword)) {
            alert("Alerady exists, try another keyword");
        }
    };

    let history = useHistory();

    const addProject = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("title", title);
        data.append("description", description);
        keywords.forEach(keyword =>data.append("keywords[]",keyword));
        data.append("user", user);
        console.log(keywords);
        data.append("summary", summary);
        data.append("niveau", level);
        let url = urls + "/projects/add";
        let options = {
            method: "POST",
            url: url,
            data,

            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        };
        let response = await axios(options);
        console.log(response.status);
        if (response.status === 500) {
            history.push("/aa");
        }
    };

    const getLevels = async () => {
        const data = { user };
        let url = urls + "/levels";
        let options = {
            method: "get",
            url: url,
            data,
            headers: {
                Authorization: "Bearer " + token,
                Accept: "Application/json",
            },
        };
        await axios(options).then((res) => {
            let data = res.data;
            setLevels(data);
        });
    };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token!==null ){
           
        getLevels();
        AOS.init();
        AOS.refresh();
        }else{
 history.push("/login");
        }

    }, []);

    return (
        <div
            className="card shadow-lg o-hidden border-0 my-5 "
            style={{ margin: "50px" }}
        >
            <div className="card-body p-0">
                <div className="col project-form">
                    <div className="p-5">
                        <h4 className="text-dark mb-4">Add New Project!</h4>
                        <form className="user" onSubmit={addProject}>
                            <div className="row mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    id="exampleFirstName-1"
                                    className="form-control form-control-user "
                                    type="text"
                                    placeholder="Enter the title of the project..."
                                    name="title"
                                    onChange={(event) => {
                                        setTitle(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="row mb-3 flex-column">
                                <label className="form-label">Level</label>
                                <select
                                    className="form-control form-control-user"
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        setLevel(event.target.value);
                                    }}
                                >
                                    <optgroup label="All levels">
                                        {levels.map((level, levelId) => {
                                            return (
                                                <option value={level.id}>
                                                    {level.name}
                                                </option>
                                            );
                                        })}
                                    </optgroup>
                                </select>
                            </div>

                            <div className="row mb-3">
                                <label className="form-label">
                                    Add new keyword{" "}
                                </label>
                                <input
                                    className="form-control form-control-user"
                                    type="text"
                                    placeholder="Add a tag or keyword related to this theme project"
                                    name="keyword"
                                    onChange={(event) => {
                                        setKeyword(event.target.value);
                                    }}
                                />
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    style={{
                                        width: "100px",
                                        borderRadius: "50px",
                                        marginTop: "10px",
                                    }}
                                    onClick={addKeyword}
                                >
                                    Add
                                </button>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                <label className="form-label ">
                                    Tools and Tags
                                </label>
                                {keywords.length === 0 ? (
                                    <span
                                        style={{
                                            fontSize: ".8rem",
                                            color: "black",
                                        }}
                                    >
                                        There is no keyword added yet
                                    </span>
                                ) : (
                                    <ul className=" keywords">
                                        {keywords.map((keyword, keywordId) => {
                                            return (
                                                <li
                                                    key={keywordId}
                                                    className="keyword"
                                                >
                                                    <span>{keyword}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
</div>
                            <div className="row mb-3">
                                <label className="form-label">summary</label>
                                <textarea
                                    className="form-control  text-area"
                                    placeholder="Write here a short review..."
                                    name="summary"
                                    onChange={(event) => {
                                        setSummary(event.target.value);
                                    }}
                                ></textarea>
                            </div>
                            <div className="row mb-3">
                                <label className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control text-area"
                                    placeholder="Write what is the project about..."
                                    name="description"
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                    }}
                                ></textarea>
                            </div>
                            <div className="row mb-3 ">
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        setFile(event.target.files[0]);
                                    }}
                                />
                            </div>
                            <div className="row mb-3">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    style={{
                                        textAlign: "center",
                                        borderRadius: "50px",
                                        width: "180px",
                                    }}
                                >
                                    Create new project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProject;
