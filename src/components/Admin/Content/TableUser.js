import { useEffect, useState } from "react";
import { getAllListUsers } from "../../../services/apiService";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const TableUser = () => {
  const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async() => {
       let res = await getAllListUsers();
       if (res.EC === 0) {
        setListUsers(res.DT)
       }
    }


  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary"><IoEyeSharp /></button>
                    <button className="btn btn-primary mx-2"><FaRegEdit /></button>
                    <button className="btn btn-danger"><MdDelete /></button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={'4'}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
