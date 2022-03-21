import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import axios from "axios";
import PageHeader from "../pageHeader/PageHeader";
import Table from "react-bootstrap/Table";
import { MdModeEditOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

const SingleSection = () => {
  const [selectors, setSelectors] = useState([]);

  const { sectionName, sectionId } = useParams();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios(
          `https://scope-manager.herokuapp.com/sm/api/sections/${sectionId}`
        );
        setSelectors(res.data.doc.selectors);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchPage();
  }, [sectionId]);

  return (
    <div className="addClient">
      <PageHeader title={sectionName} back />
      <Stepper title="Add New Selector" icon="save" />
      <div className="flex-between">
        <span></span>
        <Link to={`/new-selector/${sectionId}`}>
          <button className="btn saveChanges-btn flex-between">
            <span className="saveChanges__title">Add New Selector</span>
            <span className="saveChanges-icon flex-center">
              <BsPlusLg />
            </span>
          </button>
        </Link>
      </div>

      <div className="table-container center">
        <Table hover size="sm" className="table center">
          <thead>
            {/* <tr> */}
            <th>Sr. No.</th>
            <th>Name of the Selector</th>
            <th>Preffered Input</th>
            <th>Preffered Output</th>
            <th>Action</th>
            {/* </tr> */}
          </thead>
          <tbody>
            {selectors &&
              selectors.map((selector, i) => (
                <tr key={selector.id}>
                  <td>{i + 1}</td>
                  <td>{selector.selectorName}</td>
                  <td>{selector.prefferedInput}</td>
                  <td>{selector.prefferedOutput}</td>

                  <td className="flex-center">
                    <Link to={`/update-selector/${selector.id}`}>
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

export default SingleSection;
