import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import TableUser from "./TableUser";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title my-3">Manage User</div>
      <div className="users-content">
        <ModalCreateUser />

        {/* <div className="btn-add-new">
          <button className="btn btn-primary d-flex align-items-center gap-1"> <FcPlus /> Add new users</button>
        </div> */}
        <div className="table-users-container my-4">
          <TableUser />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
