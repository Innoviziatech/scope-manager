import { useEffect, useState } from "react";
import Stepper from "../stepper/Stepper";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import PageHeader from "../pageHeader/PageHeader";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const UpdateStaffForm = () => {
  const [role, setRole] = useState("Developer");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { staffId } = useParams();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const {
          data: { doc },
        } = await axios(`/sm/api/staff/${staffId}`);
        setName(doc.name);
        setEmail(doc.email);
        setPosition(doc.position);
        setRole(doc.role);
        setPassword(doc.password);
        setConfirmPassword(doc.passwordConfirm);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchStaff();
  }, [staffId]);
  const handleSubmit = async () => {
    try {
      const {
        data: { doc },
      } = await axios.patch(`/sm/api/staff/${staffId}`, {
        name,
        role,
        position,
        email,
        password,
        passwordConfirm: confirmPassword,
      });

      setRole(doc.role);
      setName(doc.name);
      setPassword(doc.password);
      setConfirmPassword(doc.passwordConfirm);
      setPosition(doc.position);
      setEmail(doc.position);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addClient">
      <PageHeader title="Add Staff" back />
      <Stepper
        title="Save Changes"
        icon="add"
        page="staff"
        submit={handleSubmit}
        move="move"
      />
      <div className="addClient-inputs">
        <div className="row flex-between">
          <div className="form-control">
            <label>Name of the Staff</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        </div>
        <div className="row flex-between">
          <form className="form-group">
            <label>Role</label>
            <div className="radio flex">
              <input
                type="radio"
                value="Super Admin"
                checked={role === "Super Admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>Super Admin</span>
            </div>

            <div className="radio flex">
              <input
                type="radio"
                value="Developer"
                checked={role === "Developer"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>Developer</span>
            </div>
            <div className="radio flex">
              <input
                type="radio"
                value="Manager"
                checked={role === "Manager"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span>Manager</span>
            </div>
          </form>
          <div className="form-control">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <AiOutlineEye
                className="showPassword"
                fontSize="large"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="showPassword"
                fontSize="large"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div className="form-control">
            <label>Confirm Password</label>
            <input
              type={showPasswordConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showPasswordConfirm ? (
              <AiOutlineEye
                className="showPassword"
                fontSize="large"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="showPassword"
                fontSize="large"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaffForm;
