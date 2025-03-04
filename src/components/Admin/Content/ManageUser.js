import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllListUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import { FcPlus } from "react-icons/fc";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllListUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user)
  }

  return (
    <div className="manage-user-container">
      <div className="title my-3">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary d-flex align-items-center gap-1" onClick={() => setShowModalCreateUser(true)}> <FcPlus /> Add new users</button>
        </div>
        <div className="table-users-container my-4">
          <TableUser listUsers={listUsers} 
          handleClickBtnUpdate={handleClickBtnUpdate}/>
        </div>
        <ModalCreateUser 
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUsers={fetchListUsers} />
        <ModalUpdateUser
        dataUpdate={dataUpdate}
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        fetchListUsers={fetchListUsers}
        setDataUpdate={setDataUpdate}
        />
      </div>
    </div>
  );
};

export default ManageUser;
