import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import Switch from "@mui/material/Switch";
import axios from "axios";
import PageHeader from "../pageHeader/PageHeader";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "./task.css";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios("/sm/api/tasks");
        setTasks(res.data.docs);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchTasks();

    return () => {
      setTasks([]);
    };
  }, [refetch]);

  const handleUpdate = async (clientStatus, id) => {
    try {
      await axios.patch(`/sm/api/clients/${id}`, {
        status: !clientStatus,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/sm/api/tasks/${id}`);
      setRefetch(true);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <div className="taskManager">
      <PageHeader title="Task Manager" back />
      <Stepper title="Add New Task" icon="save" page="task" />

      <div className="table-container center">
        <Table hover size="sm" className="table center">
          <thead>
            {/* <tr> */}
            <th>Sr. No.</th>
            <th>Project</th>
            <th>Due Date</th>
            <th>Responsibility</th>
            <th>Min</th>
            <th>Max</th>
            <th>Category</th>
            <th>TT</th>
            <th>Status</th>
            <th>Action</th>
            {/* </tr> */}
          </thead>
          <tbody>
            {tasks &&
              tasks.map((task, i) => (
                <tr key={task.id}>
                  <td>{i + 1}</td>
                  <td>{task.project}</td>
                  <td>{moment(task.dueDate).format("Do MMM, YYYY")}</td>
                  <td>
                    <span>{task.responsibility}</span>{" "}
                    <span className="taskManager__icons">
                      <IoMdCall />
                      <FaWhatsapp />
                    </span>{" "}
                  </td>
                  <td>{task.minTime}</td>
                  <td>{task.maxTime}</td>
                  <td>{task.category}</td>
                  <td>{task.TT}</td>
                  <td>
                    <Switch
                      checked={task.status}
                      onChange={() => handleUpdate(task.status, task.id)}
                      inputProps={{ "aria-label": "controlled" }}
                      style={{ color: "#ec4154" }}
                    />
                  </td>
                  <td className="flex-center">
                    <div
                      className="flex-center"
                      onClick={() => handleDelete(task.id)}
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

export default TaskManager;
