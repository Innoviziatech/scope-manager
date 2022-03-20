import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";
import { useParams } from "react-router-dom";
import SaveChanges from "../custombuttons/SaveChanges";

const UpdateSelectorForm = ({ section }) => {
  const [selectorName, setSelectorName] = useState("");
  const [prefferedInput, setPrefferedInput] = useState("");
  const [prefferedOutput, setPrefferedOutput] = useState("");
  const { subSectionId } = useParams();
  const { selectorId } = useParams();

  useEffect(() => {
    const fetchSection = async () => {
      const res = await axios(`/sm/api/selectors/${selectorId}`);
      console.log(res);
      setSelectorName(res.data.doc.selectorName);
      setPrefferedInput(res.data.doc.prefferedInput);
      setPrefferedOutput(res.data.doc.prefferedOutput);
    };
    fetchSection();
  }, [selectorId]);

  const handleSubmitSection = async (page) => {
    try {
      const res = await axios.patch(`/sm/api/selectors/${selectorId}`, {
        prefferedInput,
        prefferedOutput,
        selectorName,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    setPrefferedOutput("");
    setPrefferedInput("");
    setSelectorName("");
  };
  // const handleSubmitSubSection = async (page) => {
  //   try {
  //     const res = await axios.post(
  //       `/sm/api/subSections/${subSectionId}/selectors`,
  //       {
  //         prefferedInput,
  //         prefferedOutput,
  //         selectorName,
  //       }
  //     );
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   setPrefferedOutput("");
  //   setPrefferedInput("");
  //   setSelectorName("");
  // };
  return (
    <div className="addSelctor">
      <PageHeader title="Update Selector" back />
      <Stepper
        title="Save Changes"
        icon="add"
        page="project"
        submit={handleSubmitSection}
        move="move"
      />
      <div className="addClient-inputs">
        <div className="row flex">
          <div className="form-control" style={{ marginRight: "10%" }}>
            <label>Preffered Input</label>
            <input
              type="text"
              value={prefferedInput}
              onChange={(e) => setPrefferedInput(e.target.value)}
            />
          </div>
          <div className="form-control ">
            <label>Preffered Output</label>
            <input
              type="text"
              value={prefferedOutput}
              onChange={(e) => setPrefferedOutput(e.target.value)}
            />
          </div>
        </div>
        <div className="row flex-between">
          <div className="form-control">
            <label>Selector Name</label>
            <input
              type="text"
              value={selectorName}
              onChange={(e) => setSelectorName(e.target.value)}
            />
          </div>
        </div>

        <div className="row flex-between" style={{ marginTop: "6rem" }}>
          <span></span>
          <SaveChanges
            title="Save and Add New"
            icon="save"
            page="selector"
            submit={handleSubmitSection}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateSelectorForm;
