import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import axios from "axios";
import PageHeader from "../pageHeader/PageHeader";
import Table from "react-bootstrap/Table";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const StaffManager = () => {
  const [staff, setStaff] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios("/sm/api/staff");
        setStaff(res.data.docs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStaff();
  }, [refetch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/sm/api/staff/${id}`);
      setRefetch(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addClient">
      <PageHeader title="Staff Manager" back />
      <Stepper title="Add New Staff" icon="save" page="staff" />

      <div className="table-container center">
        <Table hover size="sm" className="table center">
          <thead>
            {/* <tr> */}
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Position</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
            {/* </tr> */}
          </thead>
          <tbody>
            {staff &&
              staff.map((staff, i) => (
                <tr key={staff.id}>
                  <td>{i + 1}</td>
                  <td>{staff.name}</td>
                  <td>{staff.position}</td>
                  <td>{staff.role}</td>
                  <td>{staff.email}</td>
                  <td className="flex-center">
                    <Link to={`/update-staff/${staff.id}`}>
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
                      onClick={() => handleDelete(staff.id)}
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

export default StaffManager;
