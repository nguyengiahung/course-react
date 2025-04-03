import { useEffect, useRef, useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const inputRef = useRef();
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataQuizUpdate, setDataQuizUpdate] = useState([]);
  const [dataQuizDelete, setDataQuizDelete] = useState([]);

  useEffect(() => {
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name or Description is required!!");
      return;
    }

    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      inputRef.current.value = "";
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };

  const handleClickBtnUpdate = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataQuizUpdate(quiz);
  };

  const handleClickBtnDelete = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataQuizDelete(quiz);
  };

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add New Quiz</legend>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label htmlFor="floatingDescription">Description</label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder={"Quiz type..."}
                  />
                </div>
                <div className="more-actions">
                  <label className="mb-1">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => handleChangeFile(event)}
                    ref={inputRef}
                  />
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleSubmitQuiz()}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="list-detail mt-4 mx-4">
        <TableQuiz
          listQuiz={listQuiz}
          handleClickBtnUpdate={handleClickBtnUpdate}
          handleClickBtnDelete={handleClickBtnDelete}
          fetchListQuiz={fetchListQuiz}
        />
        <ModalUpdateQuiz
          show={showModalUpdateQuiz}
          setShow={setShowModalUpdateQuiz}
          dataQuizUpdate={dataQuizUpdate}
          fetchListQuiz={fetchListQuiz}
        />
        <ModalDeleteQuiz
          show={showModalDeleteQuiz}
          setShow={setShowModalDeleteQuiz}
          dataQuizDelete={dataQuizDelete}
          fetchListQuiz={fetchListQuiz}
        />
      </div>
    </div>
  );
};

export default ManageQuiz;
