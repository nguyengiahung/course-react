import { useState } from "react";
import { changePassword } from "../../services/apiService";
import { toast } from "react-toastify";

const ChangePassword = (props) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePassword = async () => {
    let res = await changePassword(password, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      props.handleClose();
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
          />
        </div>
        <div className="mt-3 ">
          <button
            onClick={() => handleUpdatePassword()}
            className="btn btn-warning"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
