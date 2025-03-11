import { useSearchParams } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        alert('me')
        console.log(email ,password);
    }

  return (
    <div className="login-container">
      <div className="header">Dont' have an account yet?</div>
      <div className="title mx-auto col-4 text-center">CyberSoft</div>
      <div className="welcome mx-auto col-4 text-center">Hello, who's this?</div>
      <div className="content-form mx-auto col-4">
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}  
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        </div>
        <a className="forgot-password">Forgot password?</a>
        <div>
          <button className="btn-login btn btn-primary bg-black border-0 w-100"
          onClick={() => handleLogin()}
          >Login to CyberSoft</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
