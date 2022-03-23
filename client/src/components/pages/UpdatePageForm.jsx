import { useEffect, useState } from "react";
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
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UpdatePageForm = () => {
  const [status, setStatus] = useState(false);
  const [pageURL, setPageURL] = useState("");
  const [pageSequence, setPageSequence] = useState("");
  const [pageName, setPageName] = useState("");
  const [loading, setLoading] = useState(false);
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [previewImg, setPreviewImg] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [pageScreenShots, setPageScreenshots] = useState([]);

  const handleChange = (event) => {
    setStatus(event.target.checked);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_URL}/sm/api/pages/${pageId}`
        );
        console.log(res);
        setPageName(res.data.doc.pageName);
        setPageURL(res.data.doc.pageURL);
        setStatus(res.data.doc.status);
        setPageSequence(res.data.doc.pageSequence);
        setPageScreenshots(res.data.doc.screenShots);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPage();
  }, [pageId]);

  const handlePictureSelection = (e) => {
    const files = Array.from(e.target.files);

    setPreviewImg([]);
    setScreenshots([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImg((oldArray) => [...oldArray, reader.result]);
          setScreenshots((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (page) => {
    const formData = new FormData();

    formData.set("pageName", pageName);
    formData.set("pageSequence", pageSequence);
    formData.set("pageURL", pageURL);
    formData.set("status", status);

    screenshots.forEach((image) => {
      formData.set("screenShots", image);
    });
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/sm/api/pages/${pageId}`,
        formData
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
      <PageHeader title={`Update ${pageName}`} back />
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
                  name="screenShots"
                  id="upload-screenshot"
                  style={{ display: "none" }}
                  onChange={handlePictureSelection}
                  multiple
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
                <div className="preview__images flex">
                  {previewImg.map((preview) => (
                    <img key={preview} src={preview} alt="" />
                  ))}
                </div>
              </Box>
            </Fade>
          </Modal>
        </div>

        <div className="row flex-between" style={{ marginTop: "6rem" }}>
          <div className="preview__images-2 flex">
            {pageScreenShots.map((preview) => (
              <img key={preview.public_id} src={preview.url} alt="" />
            ))}
          </div>
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
