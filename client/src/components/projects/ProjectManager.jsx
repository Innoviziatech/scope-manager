import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import Switch from "@mui/material/Switch";
import axios from "axios";
import PageHeader from "../pageHeader/PageHeader";
import Table from "react-bootstrap/Table";
import { MdModeEditOutline } from "react-icons/md";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_URL}/sm/api/projects`
        );
        setProjects(res.data.docs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();

    return () => {
      setProjects([]);
    };
  }, [refetch]);

  const handleUpdate = async (projectStatus, id) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/sm/api/projects/${id}`,
        {
          status: !projectStatus,
        }
      );
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/sm/api/projects/${id}`
      );
      setRefetch(true);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <div className="addClient">
      <PageHeader title="Project Manager" back />
      <Stepper title="Add New Project" icon="save" page="project" />

      <div className="table-container center">
        <Table hover size="sm" className="table center">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name of the Project</th>
              <th>Date Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects &&
              projects.map((project, i) => (
                <tr key={project.id}>
                  <td>{i + 1}</td>

                  <td
                    onClick={() =>
                      navigate(`/projects/${project.projectName}/${project.id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {project.projectName}
                  </td>

                  <td>{moment(project.createdAt).format("Do MMM, YYYY")}</td>

                  <td>
                    <Switch
                      checked={project.status}
                      onChange={() => handleUpdate(project.status, project.id)}
                      inputProps={{ "aria-label": "controlled" }}
                      style={{ color: "#ec4154" }}
                    />
                  </td>
                  <td className="flex-center">
                    <Link to={`/update-project/${project.id}`}>
                      <div
                        className="flex-center"
                        style={{
                          backgroundColor: "#ec4154",
                          borderRadius: "50%",
                          width: "2.5rem",
                          height: "2.5rem",
                          cursor: "pointer",
                          marginRight: "1rem",
                        }}
                      >
                        <MdModeEditOutline color="#fff" />
                      </div>
                    </Link>
                    <div
                      className="flex-center"
                      onClick={() => handleDelete(project.id)}
                      style={{
                        backgroundColor: "#ec4154",
                        borderRadius: "50%",
                        width: "2.5rem",
                        height: "2.5rem",
                        cursor: "pointer",
                      }}
                    >
                      <AiOutlineDelete color="#fff" />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectManager;
