import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import axios from "axios";
import PageHeader from "../pageHeader/PageHeader";
import Table from "react-bootstrap/Table";
import { MdModeEditOutline } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

const SinglePage = () => {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  const { pageName, pageId } = useParams();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios(
          `https://scope-manager.herokuapp.com/sm/api/pages/${pageId}`
        );
        console.log(res);
        setSections(res.data.doc.sections);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPage();
  }, [pageId]);

  return (
    <div className="addClient">
      <PageHeader title={pageName} back />
      <Stepper title="Add New Section" icon="save" />
      <div className="flex-between">
        <span></span>
        <Link to={`/new-section/${pageId}`}>
          <button className="btn saveChanges-btn flex-between">
            <span className="saveChanges__title">Add New Section</span>
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
            <th>Name of the Section</th>
            <th>Discription</th>
            <th>Action</th>
            {/* </tr> */}
          </thead>
          <tbody>
            {sections &&
              sections.map((section, i) => (
                <tr key={section.id}>
                  <td>{i + 1}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/sections/${section.sectionName}/${section.id}`)
                    }
                  >
                    {section.sectionName}
                  </td>
                  <td>{section.description}</td>

                  <td className="flex-center">
                    <Link to={`/update-section/${section.id}`}>
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

export default SinglePage;
