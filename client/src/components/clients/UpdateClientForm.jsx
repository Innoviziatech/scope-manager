import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import "./client.css";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Switch from "@mui/material/Switch";
import { BsChevronDown } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageHeader from "../pageHeader/PageHeader";

const UpdateClientForm = () => {
  const [role, setRole] = useState("Employee");
  const [clientLevel, setClientLevel] = useState("A");
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState(true);

  const [projects, setProjects] = useState([]);

  const [projectState, setProjectState] = useState([]);
  const [clientProjects, setClientProjects] = useState([]);

  const [clientName, setClientName] = useState("");
  const [nationality, setNationality] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(0);

  const [client, setClient] = useState(null);

  const { clientId } = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      const res = await axios(`/sm/api/clients/${clientId}`);

      setClient(res.data.doc);
      setClientName(res.data.doc.clientName);
      setNationality(res.data.doc.nationality);
      setRole(res.data.doc.role);
      setStatus(res.data.doc.status);
      setEmail(res.data.doc.email);
      setMobile(res.data.doc.mobile);
      setCompanyName(res.data.doc.companyName);
      setClientLevel(res.data.doc.clientLevel);
    };
    fetchClient();
  }, [clientId]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios("/sm/api/projects");
      setProjects(res.data.docs);
      const projectArray = res.data.docs.map((project) => ({
        [project.projectName]: false,
        projectId: project.id,
      }));

      setProjectState(projectArray);
    };
    fetchProjects();
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
    client.projects.forEach((item) => {
      if (clientProjects.includes(item.id)) {
        const index = clientProjects.indexOf(item.id);
        if (index > -1) {
          clientProjects.splice(index, 1);
        }
      }
    });
    try {
      const res = await axios.patch(`/sm/api/clients/${clientId}`, {
        clientName,
        projects: clientProjects,
        status,
        companyName,
        nationality,
        role,
        clientLevel,
        mobile,
        email,
      });
      setClientName(res.data.doc.clientName);
      setNationality(res.data.doc.nationality);
      setRole(res.data.doc.role);
      setStatus(res.data.doc.status);
      setEmail(res.data.doc.email);
      setMobile(res.data.doc.mobile);
      setCompanyName(res.data.doc.companyName);
      setClientLevel(res.data.doc.clientLevel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addClient">
      <PageHeader title="Update Client" back />
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
              onChange={(event) => setStatus(event.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
              style={{ color: "#ec4154" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateClientForm;
