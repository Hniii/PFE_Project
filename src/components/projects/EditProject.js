import React, { useEffect, useState,useParams } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import CloseButton from 'react-bootstrap/CloseButton'

function AddProject() {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [description, setDescription] = useState("");
	const [keywords, setKeywords] = useState([]);
	const [file, setFile] = useState(null);
	const [keyword, setKeyword] = useState("");
	const [level, setLevel] = useState("");
	const [levels, setLevels] = useState([]);

    const [project, setProject] = useState([]);

	const {projectId} = useParams();
	const addKeyword = async () => {
		let list = keywords;
		list.push(keyword);
		setKeywords(list);
		setKeyword("");
	};
    const deleteKeyword = async (keywordId)=>{
        const data = keywords.filter(i => i.id !== keywordId)
        setKeywords(data);
    }

	let history = useHistory();

	const editProject = async (projectId) => {
		const data = {
			title,
			summary,
			description,
			keywords,
			file,
			level,
		};
		let url = "http://127.0.0.1:8000/api/projects/edit/" + projectId;
		let options = {
			method: "post",
			url: url,
			data: data,
		};
		let response = await axios(options);
		if (response.status === 200) {
			history.replace("/projects");
		}
	};

    const getProject = async ()=>{
        let url = "http://127.0.0.1:8000/api/projects/" + projectId;
		let options = {
			method: "get",
			url: url,
		};
		await axios(options).then((res) => {
			let response = res.data;
			setProject(response.project);
			console.log(response);
		});
	};

	const getLevels = async () => {
		let url = "http://127.0.0.1:8000/api/levels/all";
		let options = {
			method: "get",
			url: url,
		};
		await axios(options).then((res) => {
			let response = res.data;
			setLevels(response.levels);
			console.log(response);
		});
	};

	useEffect(() => {
		let token = localStorage.getItem("token");
        if (token!==null ){
        getProject();
		getLevels();
		AOS.init();
		AOS.refresh();}else{
			history.push("/login")
		}
	}, []);

	return (
		<div class="card shadow-lg o-hidden border-0 my-5 margins">
			<div class="card-body p-0">
				<div class="row">
					<div class="col project-form">
						<div class="p-5">
							<div class="text-center">
								<h4 class="text-dark mb-4">Update Project!</h4>
								<form className="user" action={editProject}>
									<div className="row mb-3">
										<label className="form-label">Title</label>
										<input
											id="exampleFirstName-1"
											className="form-control form-control-user "
											type="text"
                                            
											placeholder="Enter the title of the project..."
											name="title"
                                            value = {project.title}
											onChange={(event) => {
												setTitle(event.target.value);
											}}
										/>
									</div>
									<div class="col">
										<div class="mb-3">
											<label className="form-label">Level</label>
											<select
												class="form-select"
                                                defaultValue={project.level.value}
												onChange={(event) => {
													setLevel(event.target.value);
												}}
											>
												<optgroup label="All levels">
													{levels.map((level, levelId) => {
														return (
															<option value={levelId}>
																{level.value}
															</option>
														);
													})}
												</optgroup>
											</select>
										</div>
									</div>
									<div className="row">
										<div className="col">
											<div className="row">
												<label className="form-label title">
													Keywords
												</label>
												<ul className="list-group keywords">
													{project.keywords.map((keyword, keywordId) => {
														return (
															<li
																key={keywordId}
																className="list-group-item keyword"
															>
																<span>{keyword}</span>
                                                                <CloseButton aria-label="Hide" onClick={deleteKeyword}/>
															</li>
														);
													})}
												</ul>
											</div>
											<div className="row">
												<input
													className="form-control form-control-user"
													type="text"
													placeholder="Add a tag"
													style={{
														width: " 100%",
														textAlign: "left",
														margin: " 10px",
														height: "60px",
														fontSize: "larger",
													}}
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
														height: "60px",
														margin: "10px",
													}}
													onClick={addKeyword}
												>
													Add
												</button>
											</div>
										</div>
									</div>
									<div className="row mb-3">
										<label className="form-label">summary</label>
										<textarea
											className="form-control form-control-user text-area"
											placeholder="Write here a short review..."
											name="summary"
											onChange={(event) => {
												setSummary(event.target.value);
											}}
										></textarea>
									</div>
									<div className="row mb-3">
										<label className="form-label">Description</label>
										<textarea
											className="form-control form-control-user text-area"
											placeholder="Write what is the project about..."
											name="description"
											onChange={(event) => {
												setDescription(event.target.value);
											}}
										></textarea>
									</div>
									<div className="row mb-3">
										<input
											className="form-control"
											type="file"
											onChange={(event) => {
												setFile(event.target.value);
											}}
										/>
									</div>
									<div
										className="row mb-3"
										style={{
											display: "flex",
											flexDirection: "row-reverse",
										}}
									>
										<button
											className="btn btn-primary d-block add-btn"
											type="submit"
											style={{
												textAlign: "center",
												fontSize: "larger",
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
			</div>
		</div>
	);
}

export default AddProject;
