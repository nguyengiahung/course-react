import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('EASY');
  const [image, setImage] = useState(null);

  const handleChangeFile = (event) => {
    
  }


  return (
    <div className="quiz-container p-4">
      <div className="title">Manage Quizzes</div>
      <div className="add-new py-4">
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
            <label for="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label for="floatingDescription">Description</label>
          </div>
          <div className="my-3">
            <Select
                value={type}
                // onChange={this.handleChange}
              options={options}
              placeholder={'Quiz type...'}
            />
          </div>
          <div className="more-actions">
            <label className="mb-1">Upload Image</label>
            <input 
            type="file" 
            className="form-control"
            onChange={(event) => handleChangeFile(event)}
            />
          </div>
        </fieldset>
      </div>
      <div className="list-detail">Table</div>
    </div>
  );
};

export default ManageQuiz;
