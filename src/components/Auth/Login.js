import { useNavigate, useSearchParams } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    //validate

    // submit api
    let data = await postLogin(email, password);
    console.log(data);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate('/')
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header d-flex justify-content-end align-items-center  mt-2 gap-2">
        <span>Dont' have an account yet?</span>
        <button>Sign up</button>
        <a href="">Need help?</a>
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
          />
        </div>
        <a className="forgot-password">Forgot password?</a>
        <div>
          <button
            className="btn-login btn btn-primary bg-black border-0 w-100"
            onClick={() => handleLogin()}
          >
            Login to CyberSoft
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
