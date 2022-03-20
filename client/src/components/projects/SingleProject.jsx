import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import Switch from "@mui/material/Switch";
import axios from "axios";
import PageHeader from "../pageHeader/PageHeader";
import Table from "react-bootstrap/Table";
import { MdModeEditOutline } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsImage } from "react-icons/bs";
import { BiUpload } from "react-icons/bi";

const SingleProject = () => {
  const [pages, setPages] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [status, setStatus] = useState(false);
  const { projectName, projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios(`/sm/api/projects/${projectId}`);
        setStatus(res.data.doc.status);
        setPages(res.data.doc.pages);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchProject();
  }, [projectId, refetch]);

  const handleUpdate = async () => {
    setStatus(!status);
    try {
      await axios.patch(`/sm/api/projects/${projectId}`, {
        status: !status,
      });
      setRefetch(true);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="addClient">
      <PageHeader title={projectName} back />
      <Stepper title="Add New Page" icon="save" page={`page/${projectId}`} />

      <div className="table-container center">
        <Table hover size="sm" className="table center">
          <thead>
            {/* <tr> */}
            <th>Sr. No.</th>
            <th>Name of the Page</th>
            <th>ScreenShot</th>
            <th>Status</th>
            <th>Action</th>
            {/* </tr> */}
          </thead>
          <tbody>
            {pages &&
              pages.map((page, i) => (
                <tr key={page.id}>
                  <td>{i + 1}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/pages/${page.pageName}/${page.id}`)
                    }
                  >
                    {page.pageName}
                  </td>
                  <td>
                    <span
                      style={{ padding: "6px 10px" }}
                      className="taskManager__icons"
                    >
                      <BsImage
                        fontSize="large"
                        style={{ marginRight: "10px" }}
                      />
                      <BiUpload fontSize="large" />
                    </span>{" "}
                  </td>

                  <td>
                    <Switch
                      checked={status}
                      onChange={handleUpdate}
                      inputProps={{ "aria-label": "controlled" }}
                      style={{ color: "#ec4154" }}
                    />
                  </td>
                  <td className="flex-center">
                    <Link to={`/update-page/${page.id}`}>
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
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SingleProject;
