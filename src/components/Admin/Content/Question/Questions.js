import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FaMinusCircle } from "react-icons/fa";
import { BsFillPatchMinusFill, BsFillPatchPlusFill,BsFillPlusCircleFill  } from "react-icons/bs";
const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  return (
    <div className="question-container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <span>Select Quiz:</span>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add Questions:</div>
        <div>
          <div className="questions-content d-flex gap-4 align-items-center">
            <div class="form-floating w-50">
              <input
                type="type"
                class="form-control"
                placeholder="name@example.com"
              />
              <label>Description</label>
            </div>
            <div className="d-flex align-items-center gap-4">
              <label className="label-up">Upload Image</label>
              <input type="file" hidden />
              <span>0 file is upload</span>
            </div>
            <div className="btn-add">
              <span className="icon-add">
                <BsFillPlusCircleFill />
              </span>
              <span className="icon-remove">
                <FaMinusCircle />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input
              className="form-check-input isCorrect"
              type="checkbox"
              id="flexCheckDefault"
            />
            <div className="form-floating w-50 answer-name">
              <input
                type="type"
                className="form-control"
                placeholder="name@example.com"
              />
              <label>Answer 1</label>
            </div>
            <div className="btn-group">
              <span className="icon-add">
              <BsFillPatchPlusFill />
              </span>
              <span className="icon-remove">
              <BsFillPatchMinusFill />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
