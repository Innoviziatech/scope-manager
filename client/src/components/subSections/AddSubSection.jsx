import { useState } from "react";
import Stepper from "../stepper/Stepper";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";

const AddSubSection = () => {
  const [subSection, setSubSection] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { sectionId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (page) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://scope-manager.herokuapp.com/sm/api/sections/${sectionId}/subSections`,
        {
          subSection,
          description,
        }
      );
      if (res.data.status === "success") {
        setLoading(false);
      }
      if (!loading && page) {
        navigate(`/new-selector/subsection/${res.data.data._id}`);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

    setSubSection("");
    setDescription("");
  };
  return (
    <div className="addClient">
      <PageHeader title="Add Sub Section" back />
      <Stepper
        title="Save Changes"
        icon="add"
        page="section"
        submit={handleSubmit}
      />
      <div className="addClient-inputs">
        <div className="row flex-between">
          <div className="form-control">
            <label>Name of the Sub Section</label>
            <input
              type="text"
              value={subSection}
              onChange={(e) => setSubSection(e.target.value)}
            />
          </div>
        </div>
        <div className="row flex-between">
          <div className="form-control description">
            <label>Sub Section Description</label>
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
          <button
            disabled={!subSection && !description}
            className="btn saveChanges-btn flex-between"
            onClick={() => handleSubmit("subsection")}
          >
            <span className="saveChanges__title">
              {loading ? "Saving..." : "Save and Add Selector"}
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

export default AddSubSection;
