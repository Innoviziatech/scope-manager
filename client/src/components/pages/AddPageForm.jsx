import { useState } from "react";
import Stepper from "../stepper/Stepper";
import Switch from "@mui/material/Switch";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";
import { BiUpload } from "react-icons/bi";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddPageForm = () => {
  const [status, setStatus] = useState(false);
  const [pageURL, setPageURL] = useState("");
  const [pageSequence, setPageSequence] = useState("");
  const [pageName, setPageName] = useState("");
  const [previewImgs, setPreviewImgs] = useState([]);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   if (selectedImg) formData.append("screenShots", selectedImg);
  // };
  const previewFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImgs(reader.result);
      };
    }
  };

  const handlePictureSelection = (e) => {
    const file = e.target.files[0];
    setPreviewImgs(file);

    previewFile(file);

    // setSelectedImg(file);
  };
  console.log(selectedImgs);
  const handleChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleSubmit = async (page) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/sm/api/projects/${projectId}/pages`,
        {
          pageName,
          pageSequence,
          pageURL,
          status,
        }
      );
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
          <div
            className="btn saveChanges-btn flex-between"
            onClick={handleOpen}
          >
            <span className="uploadScreenshot__title">Upload ScreenShot</span>
            <span className="saveChanges-icon flex-center">
              <BiUpload />
            </span>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <input
                  type="file"
                  id="upload-screenshot"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePictureSelection}
                />
                <div className="row flex-between">
                  <label htmlFor="upload-screenshot">
                    <div className="btn saveChanges-btn flex-between">
                      <span className="uploadScreenshot__title">
                        Upload ScreenShot
                      </span>
                      <span className="saveChanges-icon flex-center">
                        <BiUpload />
                      </span>
                    </div>
                  </label>
                </div>
                <div className="preview__images">
                  {/* {selectedImgs?.map((previewImg) => ( */}
                  <img src={previewImgs} alt="" />
                  {/* ))} */}
                </div>
              </Box>
            </Fade>
          </Modal>
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

export default AddPageForm;
