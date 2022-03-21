import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import "./client.css";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Switch from "@mui/material/Switch";
import { BsChevronDown } from "react-icons/bs";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";

const AddClientForm = () => {
  const [role, setRole] = useState("Employee");
  const [clientLevel, setClientLevel] = useState("A");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);

  const [projects, setProjects] = useState([]);
  const [projectState, setProjectState] = useState([]);
  const [clientProjects, setClientProjects] = useState([]);
  const [clientName, setClientName] = useState("");
  const [nationality, setNationality] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.checked);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios(
        "https://scope-manager.herokuapp.com/sm/api/projects"
      );
      setProjects(res.data.docs);
      const projectArray = res.data.docs.map((project) => ({
        [project.projectName]: false,
        projectId: project.id,
      }));

      setProjectState(projectArray);
    };
    fetchProjects();

    return () => {
      setProjects([]);
    };
  }, []);

  const handleChangeProject = (event) => {
    projectState.forEach((project) => {
      if (Object.keys(project)[0] === event.target.name) {
        project[event.target.name] = event.target.checked;
      }
    });

    const selectedproject = projectState.filter(
      (project) => project[Object.keys(project)[0]] === true
    );
    const projectIds = selectedproject.map((project) => project.projectId);

    setClientProjects(projectIds);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://scope-manager.herokuapp.com/sm/api/clients",
        {
          clientName,
          projects: clientProjects,
          status,
          companyName,
          nationality,
          role,
          clientLevel,
          mobile,
          email,
        }
      );
    } catch (err) {
      console.log(err.response.data.message);
    }

    setClientName("");
    setCompanyName("");
    setClientLevel("");
    setRole("Employee");
    setNationality("");
    setMobile("");
    setEmail("");
    setStatus(false);
  };
  return (
    <div className="addClient">
      <PageHeader title="Add Client" back />
      <Stepper
        title="Save Changes"
        icon="add"
        page="client"
        submit={handleSubmit}
        move="move"
      />
      <div className="addClient-inputs">
        <div className="row flex-between">
          <div className="form-control">
            <label>Name of the Client</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Nationality</label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        <div className="row flex-between">
          <form className="form-group">
            <label>Role</label>
            <div className="radio flex">
              <input
                type="radio"
                value="Boss"
                checked={role === "Boss"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>Boss</span>
            </div>

            <div className="radio flex">
              <input
                type="radio"
                value="Employee"
                checked={role === "Employee"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>Employee</span>
            </div>

            <div className="radio flex">
              <input
                type="radio"
                value="3rd Party"
                checked={role === "3rd Party"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>3rd Party</span>
            </div>
          </form>

          <form className="form-group">
            <label>Client Level</label>

            <div className="radio flex">
              {" "}
              <input
                type="radio"
                value="A"
                checked={clientLevel === "A"}
                onChange={(e) => setClientLevel(e.target.value)}
              />
              <span>A</span>
            </div>
            <div className=" radio flex">
              {" "}
              <input
                type="radio"
                value="B"
                checked={clientLevel === "B"}
                onChange={(e) => setClientLevel(e.target.value)}
              />
              <span>B</span>
            </div>
            <div className="radio flex">
              {" "}
              <input
                type="radio"
                value="C"
                checked={clientLevel === "C"}
                onChange={(e) => setClientLevel(e.target.value)}
              />
              <span>C</span>
            </div>
          </form>

          <div className="form-group">
            <label>Projects</label>
            <div className="checkbox-select">
              <div className="checkbox-container">
                <div className="select-checkbox">
                  <span
                    className="flex-between select-title"
                    onClick={() => setOpen(!open)}
                  >
                    Projects <BsChevronDown />
                  </span>
                  {open && (
                    <div className="checkboxes">
                      {projects &&
                        projects.map((project) => (
                          <div key={project.id} className="checkbox">
                            <input
                              type="checkbox"
                              onChange={handleChangeProject}
                              name={project.projectName}
                            />
                            <span htmlFor={project.projectName}>
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
        </div>

        <div className="row flex-between">
          <div className="form-control">
            <label>Client Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Phone</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Status</label>
            <Switch
              checked={status}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              style={{ color: "#ec4154" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientForm;
