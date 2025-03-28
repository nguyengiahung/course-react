import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  console.log(listQuiz);

  return (
    <>
    <div className="">List Quizzes:</div>
    <table className="table table-hover table-bordered mt-2">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Type</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {listQuiz &&
          listQuiz.length > 0 &&
          listQuiz.map((quiz, index) => {
            return (
              <tr key={`table-quiz-${index}`}>
                <td>{quiz.id}</td>
                <td>{quiz.name}</td>
                <td>{quiz.description}</td>
                <td>{quiz.difficulty}</td>
                <td>
                  <button className="btn btn-secondary">
                    <IoEyeSharp />
                  </button>
                  <button className="btn btn-primary mx-2">
                    <FaRegEdit />
                  </button>
                  <button className="btn btn-danger">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
    </>
  );
};

export default TableQuiz;
