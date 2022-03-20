import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BsMoon } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="header flex-between">
      <div className="header__menu-icon">
        <HiOutlineMenuAlt2 />
      </div>
      <div className="header__search-box flex">
        <input placeholder="Search for results" type="text" />{" "}
        <span className="flex-center">
          <IoSearch />
        </span>
      </div>
      <div className="header__options flex">
        <div className="header__options-icons flex-between">
          <BsMoon />
          <IoIosNotificationsOutline style={{ fontSize: "2rem" }} />
          <FiMessageSquare />
        </div>
        <div className="header__options-user flex">
          <div className="header__options-user--info">
            <p className="header__options-user--name">Mrudang Mathuria</p>
            <p className="header__options-user--role">Super Admin</p>
          </div>
          <div className="header__options-user--image">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="user"
            />
          </div>
        </div>
        <IoSettingsOutline />
      </div>
    </div>
  );
};

export default Header;
