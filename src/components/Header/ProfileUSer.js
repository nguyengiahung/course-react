import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { useSelector } from "react-redux";
import { updateProfile } from "../../services/apiService";
import _ from "lodash";
import { toast } from "react-toastify";


const ProfileUser = (props) => {
  const account = useSelector((state) => state.user.account);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (!_.isEmpty(account)) {
      // update state
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage("");
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleUpdateUser = async () => {
    let res = await updateProfile(username, image);
    console.log(res);

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
        <div className="col-md-4">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            value={account.email}
            disabled
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Role</label>
          <input
            type="text"
            className="form-control"
            value={account.role}
            disabled
          />
        </div>
        <div className="col-md-12">
          <label className="form-label label-upload" htmlFor="labelUpload">
            <FcPlus />
            Upload File Image
          </label>
          <input
            type="file"
            hidden
            id="labelUpload"
            onChange={(event) => handleUploadImage(event)}
          />
        </div>
        <div className="col-md-12 img-preview">
          {previewImage ? (
            <img src={previewImage} />
          ) : (
            <span>Preview Image</span>
          )}
        </div>
      </form>
      <div className="mt-3 ">
        <button onClick={() => handleUpdateUser()} className="btn btn-warning">
          Update
        </button>
      </div>
    </>
  );
};

export default ProfileUser;
