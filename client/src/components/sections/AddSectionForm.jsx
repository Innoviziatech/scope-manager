import { useState } from "react";
import Stepper from "../stepper/Stepper";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";

const AddSectionForm = () => {
  const [sectionName, setSectionName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectorloading, setSelectorloading] = useState(false);

  const { pageId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (page) => {
    if (page === "subsection") setLoading(true);
    else if (page === "selector") setSelectorloading(true);
    try {
      const res = await axios.post(
        `https://scope-manager.herokuapp.com/sm/api/pages/${pageId}/sections`,
        {
          sectionName,
          description,
        }
      );
      if (res.data.status === "success" && page === "subsection") {
        setLoading(false);
      } else if (res.data.status === "success" && page === "selector") {
        setSelectorloading(false);
      }
      if (!selectorloading && page === "selector") {
        navigate(`/new-selector/${res.data.data._id}`);
      } else if (!loading && page === "subsection") {
        navigate(`/new-subsection/${res.data.data._id}`);
      }
    } catch (err) {
      console.log(err.response.data.message);
      setLoading(false);
    }

    setSectionName("");
    setDescription("");
  };
  return (
    <div className="addClient">
      <PageHeader title="Add Section" back />
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
            <label>Name of the Section</label>
            <input
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
            />
          </div>
        </div>
        <div className="row flex-between">
          <div className="form-control description">
            <label>Section Description</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=""
            />
          </div>
        </div>

        <div className="row flex-between" style={{ marginTop: "6rem" }}>
          <span></span>
          {/* <button
            disabled={!sectionName && !description}
            className="btn saveChanges-btn flex-between"
            onClick={() => handleSubmit("subsection")}
          >
            <span className="saveChanges__title">
              {loading ? "Saving..." : "Save and Add Sub Section"}
            </span>
            <span className="saveChanges-icon flex-center">
              <BsCheckLg />
            </span>
          </button> */}
          <button
            disabled={!sectionName && !description}
            className="btn saveChanges-btn flex-between"
            onClick={() => handleSubmit("selector")}
          >
            <span className="saveChanges__title">
              {selectorloading ? "Saving..." : "Save and Add Selector"}
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

export default AddSectionForm;
