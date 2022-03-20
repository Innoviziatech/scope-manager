import BackButton from "../custombuttons/BackButton";
import "./pageHeader.css";

const PageHeader = ({ title, back }) => {
  return (
    <div className="pageHeader">
      <div className="pageHeader__content flex-between">
        {back && <BackButton />}
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
