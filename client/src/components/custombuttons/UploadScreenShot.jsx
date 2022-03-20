import "./button.css";
import { BiUpload } from "react-icons/bi";

const UploadScreenShot = ({ title, submit }) => {
  return (
    <button
      className="btn saveChanges-btn flex-between"
      onClick={() => submit()}
    >
      <span className="saveChanges__title">{title}</span>
      <span className="saveChanges-icon flex-center">
        <BiUpload />
      </span>
    </button>
  );
};

export default UploadScreenShot;
