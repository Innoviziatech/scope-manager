import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import "./client.css";
import Switch from "@mui/material/Switch";
import axios from "axios";
import PageHeader from "../pageHeader/PageHeader";
import Table from "react-bootstrap/Table";
import { MdModeEditOutline } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_URL}/sm/api/clients`
        );
        setClients(res.data.docs);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchClients();
    return () => {
      setClients([]);
    };
  }, [refetch]);

  const handleUpdate = async (clientStatus, id) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/sm/api/clients/${id}`,
        {
          status: !clientStatus,
        }
      );
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/sm/api/clients/${id}`
      );
      setRefetch(true);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <div className="addClient">
      <PageHeader title="Client Manager" back />
      <Stepper title="Add New Client" icon="save" page="client" />

      <div className="table-container center">
        <Table hover size="sm" className="table center">
          <thead>
            {/* <tr> */}
            <th>Sr. No.</th>
            <th>Name of the Client</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Action</th>
            {/* </tr> */}
          </thead>
          <tbody>
            {clients &&
              clients.map((client, i) => (
                <tr key={client.id}>
                  <td>{i + 1}</td>
                  <td>{client.clientName}</td>
                  <td>{moment(client.createdAt).format("Do MMM, YYYY")}</td>

                  <td>
                    <Switch
                      checked={client.status}
                      onChange={() => handleUpdate(client.status, client.id)}
                      inputProps={{ "aria-label": "controlled" }}
                      style={{ color: "#ec4154" }}
                    />
                  </td>
                  <td className="flex-center">
                    <Link to={`/update-client/${client.id}`}>
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
                      onClick={() => handleDelete(client.id)}
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

export default ClientManager;
