import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Switch from "@mui/material/Switch";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";
import "./project.css";
import SaveChanges from "../custombuttons/SaveChanges";
import { Link, useParams } from "react-router-dom";

const UpdateProjectForm = () => {
  const [clients, setClients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [staffState, setStaffState] = useState([]);
  const [clientState, setClientState] = useState([]);
  const [openClients, setOpenClients] = useState(true);
  const [openStaff, setOpenStaff] = useState(true);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [projectClients, setProjectClients] = useState([]);
  const [status, setStatus] = useState(false);
  const [project, setProject] = useState(null);

  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const res = await axios(
        `https://scope-manager.herokuapp.com/sm/api/projects/${projectId}`
      );
      console.log(res);
      setProject(res.data.doc);
      setProjectName(res.data.doc.projectName);
      setDescription(res.data.doc.description);
      setStatus(res.data.doc.status);
    };
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await axios(
        "https://scope-manager.herokuapp.com/sm/api/clients"
      );
      setClients(res.data.docs);

      const clientObj = res.data.docs.map((client) => ({
        [client.clientName]: false,
        clientId: client.id,
      }));

      setClientState(clientObj);
    };
    fetchClients();
  }, []);
  useEffect(() => {
    const fetchStaff = async () => {
      const res = await axios(
        "https://scope-manager.herokuapp.com/sm/api/staff"
      );
      setStaff(res.data.docs);
      const staffObj = res.data.docs.map((staff) => ({
        [staff.name]: false,
        staffId: staff.id,
      }));

      setStaffState(staffObj);
    };

    fetchStaff();
  }, []);

  const handleChangeStaff = (event) => {
    staffState.forEach((staff) => {
      if (Object.keys(staff)[0] === event.target.name) {
        staff[event.target.name] = event.target.checked;
      }
    });

    const selectedStaff = staffState.filter(
      (staff) => staff[Object.keys(staff)[0]] === true
    );
    const staffIds = selectedStaff.map((staff) => staff.staffId);

    setStaffs(staffIds);
  };
  const handleChangeClients = (event) => {
    clientState.forEach((client) => {
      if (Object.keys(client)[0] === event.target.name) {
        client[event.target.name] = event.target.checked;
      }
    });

    const selectedClients = clientState.filter(
      (client) => client[Object.keys(client)[0]] === true
    );
    const clientIds = selectedClients.map((client) => client.clientId);

    setProjectClients(clientIds);
  };

  const handleSubmit = async () => {
    project.staff.forEach((item) => {
      if (staffs.includes(item.id)) {
        const index = staffs.indexOf(item.id);
        if (index > -1) {
          staffs.splice(index, 1);
        }
      }
    });

    project.clients.forEach((item) => {
      if (projectClients.includes(item.id)) {
        const index = projectClients.indexOf(item.id);
        if (index > -1) {
          projectClients.splice(index, 1);
        }
      }
    });

    try {
      const res = await axios.patch(
        `https://scope-manager.herokuapp.com/sm/api/projects/${projectId}`,
        {
          projectName,
          clients: projectClients,
          staff: staffs,
          status,
        }
      );
      setProject(res.data.doc);
      setProjectName(res.data.data.projectName);
      setStatus(res.data.data.status);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addProject">
      <PageHeader title="Update Project" back />
      <Stepper
        title="Save Changes"
        icon="add"
        page="project"
        submit={handleSubmit}
        move="move"
      />
      <div className="addClient-inputs">
        <div className="addproject-input-container flex-center">
          <div className="col flex-col">
            <div className="form-control">
              <label>Name of the Project</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="form-control description">
              <label>Project Description</label>
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className=""
              />
            </div>
          </div>

          <div className="form-group">
            <label>Staff on the Project</label>
            <div className="checkbox-select">
              <div className="checkbox-container">
                <div className="select-checkbox">
                  <span
                    className="flex-between select-title"
                    onClick={() => setOpenStaff(!openStaff)}
                  >
                    Select <BsChevronDown />
                  </span>
                  {openStaff && (
                    <div className="checkboxes">
                      {staff &&
                        staff.map((staff) => (
                          <div key={staff.id} className="checkbox">
                            <input
                              type="checkbox"
                              onChange={handleChangeStaff}
                              name={staff.name}
                            />
                            <span htmlFor={staff.name}>{staff.name}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="form-group special-case">
            <label>Clients</label>
            <div className="checkbox-select ">
              <div className="checkbox-container">
                <div className="select-checkbox">
                  <span
                    className="flex-between select-title"
                    onClick={() => setOpenClients(!openClients)}
                  >
                    Select <BsChevronDown />
                  </span>
                  {openClients && (
                    <div className="checkboxes">
                      {clients &&
                        clients.map((client) => (
                          <div key={client.id} className="checkbox">
                            <input
                              type="checkbox"
                              onChange={handleChangeClients}
                              name={client.clientName}
                            />
                            <span htmlFor={client.clientName}>
                              {client.clientName}
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

      <div className="row flex-between">
        <Link to={`/new-page/${projectId}`}>
          <button className="btn saveChanges-btn flex-between">
            <span className="saveChanges__title">Add Page</span>
            <span className="saveChanges-icon flex-center">
              <BsPlusLg />
            </span>
          </button>
        </Link>
        <SaveChanges
          page="project"
          icon="add"
          title="Save And Add New"
          submit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default UpdateProjectForm;
