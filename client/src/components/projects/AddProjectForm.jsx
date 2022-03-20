import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import Switch from "@mui/material/Switch";
import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";
import "./project.css";
import { useNavigate } from "react-router-dom";

const AddProjectForm = () => {
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await axios("/sm/api/clients");
      setClients(res.data.docs);

      const clientObj = res.data.docs.map((client) => ({
        [client.clientName]: false,
        clientId: client.id,
      }));

      setClientState(clientObj);
    };
    fetchClients();

    return () => {
      setClients([]);
    };
  }, []);
  useEffect(() => {
    const fetchStaff = async () => {
      const res = await axios("/sm/api/staff");
      setStaff(res.data.docs);
      const staffObj = res.data.docs.map((staff) => ({
        [staff.name]: false,
        staffId: staff.id,
      }));

      setStaffState(staffObj);
    };

    fetchStaff();
    return () => {
      setStaff([]);
    };
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

  const handleSubmit = async (page) => {
    setLoading(true);
    try {
      const res = await axios.post("/sm/api/projects", {
        projectName,
        description,
        clients: projectClients,
        staff: staffs,
        status,
      });
      if (res.data.status === "success") {
        setLoading(false);
      }
      if (!loading && page) {
        navigate(`/new-page/${res.data.data._id}`);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

    setProjectName("");
    setDescription("");
    setStatus(false);
  };
  return (
    <div className="addProject">
      <PageHeader title="Add Project" back />
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
        <span></span>

        <button
          className="btn saveChanges-btn flex-between"
          onClick={() => handleSubmit("page")}
        >
          <span className="saveChanges__title">
            {loading ? "Saving..." : "Save and Add Page"}
          </span>
          <span className="saveChanges-icon flex-center">
            <BsCheckLg />
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddProjectForm;
