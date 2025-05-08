import { useNavigate, useSearchParams } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
import Language from "../Header/Language";
import NavDropdown from "react-bootstrap/NavDropdown";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
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

    setIsLoading(true);

    // submit api
    let data = await postLogin(email, password);

    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="header d-flex justify-content-end align-items-center  mt-2 gap-2">
        <span>Dont' have an account yet?</span>
        <button onClick={() => navigate("/register")}>Sign up</button>
        <Language />        
      </div>
      <div className="title mx-auto col-3 text-center">CyberSoft</div>
      <div className="welcome mx-auto col-3 text-center">
        Hello, who's this?
      </div>
      <div className="content-form mx-auto col-3">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(event) => handleKeyDown(event)}
          />
        </div>
        <a className="forgot-password">Forgot password?</a>
        <div>
          <button
            className="btn-login btn btn-primary border-0 w-100 d-flex align-items-center justify-content-center"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            <span>Login to CyberSoft</span>
            {isLoading === true && <ImSpinner10 className="loader-icon" />}
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

export default Login;
