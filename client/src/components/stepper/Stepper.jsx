import "./stepper.css";
import SaveChanges from "../custombuttons/SaveChanges";

const Stepper = ({ title, icon, page, submit, move }) => {
  return (
    <div className="stepper flex-between">
      <div className="stepper__steps"></div>

      {page && (
        <SaveChanges
          title={title}
          icon={icon}
          page={page}
          submit={submit}
          move={move}
        />
      )}
    </div>
  );
};

export default Stepper;
