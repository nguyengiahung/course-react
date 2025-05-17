import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllListUsers, getAllQuizForAdmin, postAssignQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetchListQuiz();
    fetchUser();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });

      setListQuiz(newQuiz);
    }
  };

  const fetchUser = async () => {
    let res = await getAllListUsers();
    if (res && res.EC === 0) {
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });

      setListUser(newUser);
    }
  };

  const handleAssign = async() => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
    if (res && res.EC === 0) {
        toast.success(res.EM)
    } else {
        toast.error(res.EM)
    }
  }

  return (
    <div className="assign-quiz-container row p-5">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>

      <div className="col-6 form-group">
        <label className="mb-2">Select User:</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button onClick={() => handleAssign()} className="btn btn-warning mt-3">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
