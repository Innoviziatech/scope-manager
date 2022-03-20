import { RiDashboardFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
  useEffect(() => {
    const allLi = document
      .querySelector(".sidebar__links ul")
      .querySelectorAll("li");

    function changeMenuActive() {
      allLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    allLi.forEach((n) => n.addEventListener("click", changeMenuActive));
  }, []);
  return (
    <div className="sidebar flex-col-center">
      <Link to="/">
        <div className="sidebar__logo u-margin-bottom-small">
          <img
            src="https://s3-ap-southeast-1.amazonaws.com/letsintern.com/images-employer/595739988.png"
            alt="logo"
          />
        </div>
      </Link>
      <div className="sidebar__links">
        <h3 className="flex-center ">
          <RiDashboardFill /> Dashboard
        </h3>

        <ul className="sidebar__list">
          <Link to="/client-manager">
            <li>Client Manager</li>
          </Link>
          <Link to="/project-manager">
            <li>Project Manager</li>
          </Link>
          <Link to="/task-manager">
            <li>Task Table</li>
          </Link>
          <Link to="/staff-manager">
            <li>Staff Manager</li>
          </Link>
        </ul>
      </div>
      <div className="sidebar__logout flex-center">
        <FiLogOut /> Logout
      </div>
    </div>
  );
};

export default Sidebar;
