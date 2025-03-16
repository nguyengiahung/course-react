import { useNavigate, useSearchParams } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";
import { postLogin, postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
const Register = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email!");
      return;
    }

    if (!password) {
      toast.error("Invalid Password!");
      return;
    }

    // submit api
    let data = await postRegister(email, username, password);
    console.log(data);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header d-flex justify-content-end align-items-center  mt-2 gap-2">
        <span>Already have an account?</span>
        <button onClick={() => navigate("/login")}>Log in</button>
      </div>
      <div className="title mx-auto col-3 text-center">CyberSoft</div>
      <div className="welcome mx-auto col-3 text-center">
        Start your journey?
      </div>
      <div className="content-form mx-auto col-3">
        <div className="form-group">
          <label>
            Email <span className="text-danger">(*)</span>
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            Password <span className="text-danger">(*)</span>
          </label>
          <div className="d-flex position-relative align-items-center">
            <input
              type={isShowPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPassword ? (
              <span
                onClick={() => setIsShowPassword(false)}
                className="position-absolute top-50 end-0 translate-middle-y me-3"
              >
                <IoEyeOutline />
              </span>
            ) : (
              <span
                onClick={() => setIsShowPassword(true)}
                className="position-absolute top-50 end-0 translate-middle-y me-3"
              >
                <IoEyeOffOutline />
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <button
            className="btn-login btn btn-primary bg-black border-0 w-100 mt-3"
            onClick={() => handleRegister()}
          >
            Create an account
          </button>
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            &#60; &#60; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
