import "./button.css";
import { BsCheckLg, BsPlusLg } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const SaveChanges = ({ title, icon, page, submit, move }) => {
  const navigate = useNavigate();
  return submit ? (
    <button
      className="btn saveChanges-btn flex-between"
      onClick={() => {
        submit();
        if (move) navigate(`/${page}-manager`);
      }}
    >
      <span className="saveChanges__title">{title}</span>
      <span className="saveChanges-icon flex-center">
        {icon === "add" ? <BsCheckLg /> : <BsPlusLg />}
      </span>
    </button>
  ) : (
    <Link to={`/new-${page}`}>
      <button className="btn saveChanges-btn flex-between">
        <span className="saveChanges__title">{title}</span>
        <span className="saveChanges-icon flex-center">
          {icon === "add" ? <BsCheckLg /> : <BsPlusLg />}
        </span>
      </button>
    </Link>
  );
};

export default SaveChanges;
