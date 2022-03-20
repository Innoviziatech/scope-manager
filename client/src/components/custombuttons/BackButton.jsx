import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "./button.css";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="btn back-btn flex-between" onClick={() => navigate(-1)}>
      <IoMdArrowBack fontSize="large" /> <span>Back</span>
    </button>
  );
};

export default BackButton;
