import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import Switch from "@mui/material/Switch";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";
import UploadScreenShot from "../custombuttons/UploadScreenShot";
import { useNavigate, useParams } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";

const UpdatePageForm = () => {
  const [status, setStatus] = useState(false);
  const [pageURL, setPageURL] = useState("");
  const [pageSequence, setPageSequence] = useState("");
  const [pageName, setPageName] = useState("");
  const [loading, setLoading] = useState(false);
  const { pageId } = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setStatus(event.target.checked);
  };

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios(`/sm/api/pages/${pageId}`);
        console.log(res);
        setPageName(res.data.doc.pageName);
        setPageURL(res.data.doc.pageURL);
        setStatus(res.data.doc.status);
        setPageSequence(res.data.doc.pageSequence);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPage();
  }, [pageId]);
  const handleSubmit = async (page) => {
    try {
      const res = await axios.patch(`/sm/api/pages/${pageId}`, {
        pageName,
        pageSequence,
        pageURL,
        status,
      });
      if (res.data.status === "success") {
        setLoading(false);
      }
      if (!loading && page) {
        navigate(`/new-section/${res.data.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }

    setPageURL("");
    setPageSequence("");
    setStatus(false);
    setPageName("");
  };
  return (
    <div className="addClient">
      <PageHeader title="Add Page" back />
      <Stepper
        title="Save Changes"
        icon="add"
        page="project"
        submit={handleSubmit}
        move="move"
      />
      <div className="addClient-inputs">
        <div className="row flex-between">
          <div className="form-control">
            <label>Name of the Page</label>
            <input
              type="text"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Page Sequence</label>
            <input
              type="text"
              value={pageSequence}
              onChange={(e) => setPageSequence(e.target.value)}
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
        <div className="row flex-between">
          <div className="form-control">
            <label>URL of the Page</label>
            <input
              type="text"
              value={pageURL}
              onChange={(e) => setPageURL(e.target.value)}
            />
          </div>
        </div>

        <div className="row flex-between">
          <UploadScreenShot
            title="Upload"
            onClick={() => console.log("screen shot")}
          />
        </div>
        <div className="row flex-between" style={{ marginTop: "6rem" }}>
          <span></span>
          <button
            disabled={!pageName}
            className="btn saveChanges-btn flex-between"
            onClick={() => handleSubmit("section")}
          >
            <span className="saveChanges__title">
              {loading ? "Saving..." : "Save and Add Section"}
            </span>
            <span className="saveChanges-icon flex-center">
              <BsCheckLg />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePageForm;
