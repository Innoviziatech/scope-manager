import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import Switch from "@mui/material/Switch";
import { BsChevronDown } from "react-icons/bs";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";
import moment from "moment";

const AddTaskForm = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [status, setStatus] = useState(false);
  const [openProject, setOpenProject] = useState(true);
  const [openResponsibility, setOpenResponsibility] = useState(true);
  const [projects, setProjects] = useState([]);
  const [staff, setStaff] = useState([]);
  const [task, setTask] = useState("");
  const [minTime, setMinTime] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [TT, setTT] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState(
    moment(new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)).format(
      "YYYY-MM-DD"
    )
  );

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios("/sm/api/projects");
      setProjects(res.data.docs);
      setSelectedProject(res.data.docs[0].projectName);
    };

    fetchProjects();
    return () => {
      setProjects([]);
    };
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      const res = await axios("/sm/api/staff");
      setStaff(res.data.docs);
      setSelectedStaff(res.data.docs[0].name);
    };
    fetchStaff();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/sm/api/tasks", {
        task,
        project: selectedProject,
        status,
        minTime,
        maxTime,
        TT,
        dueDate,
        category,
        responsibility: selectedStaff,
      });
      console.log(res);
    } catch (err) {
      console.log(err.response.data.message);
    }

    setTask("");
    setMinTime("");
    setMaxTime("");
    setStatus(false);
    setTT("");
    setCategory("");
  };
  return (
    <div className="addTask">
      <PageHeader title="Add Task" back />
      <Stepper
        title="Save Changes"
        icon="add"
        page="task"
        submit={handleSubmit}
        move="move"
      />
      <div className="addClient-inputs">
        <div className="row flex-between">
          <div className="form-group">
            <label> Project</label>
            <div className="checkbox-select">
              <div className="checkbox-container">
                <div className="select-checkbox">
                  <span
                    className="flex-between select-title"
                    onClick={() => setOpenProject(!openProject)}
                  >
                    <span>{selectedProject}</span> <BsChevronDown />
                  </span>
                  {openProject && (
                    <div className="checkboxes">
                      {projects &&
                        projects.map((project) => (
                          <div key={project.id} className="checkbox">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setSelectedProject(project.projectName)
                              }
                            >
                              {project.projectName}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label> Responsibility</label>
            <div className="checkbox-select">
              <div className="checkbox-container">
                <div className="select-checkbox">
                  <span
                    className="flex-between select-title"
                    onClick={() => setOpenResponsibility(!openResponsibility)}
                  >
                    <span>{selectedStaff}</span> <BsChevronDown />
                  </span>
                  {openProject && (
                    <div className="checkboxes">
                      {staff &&
                        staff.map((staff) => (
                          <div key={staff.id} className="checkbox">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => setSelectedStaff(staff.name)}
                            >
                              {staff.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-control description">
            <label>Task</label>
            <textarea
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={moment(new Date()).format("YYYY-MM-DD")}
            />
          </div>
        </div>
        <div className="row flex-between">
          <div className="form-control">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>MinTime</label>
            <input
              type="text"
              value={minTime}
              onChange={(e) => setMinTime(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Max Time</label>
            <input
              type="text"
              value={maxTime}
              onChange={(e) => setMaxTime(e.target.value)}
            />
          </div>
          <span>
            <label>Status</label>
            <Switch
              checked={status}
              onChange={(event) => setStatus(event.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
              style={{ color: "#ec4154" }}
            />
          </span>
        </div>
        <div className="row">
          <div className="form-control">
            <label>TT</label>
            <input
              type="text"
              value={TT}
              onChange={(e) => setTT(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
