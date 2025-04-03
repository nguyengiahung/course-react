import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FaMinusCircle } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import {
  BsFillPatchMinusFill,
  BsFillPatchPlusFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((question) => question.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex(item => item.id === questionId)
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    
    if (type === "REMOVE") {
      let index = questionsClone.findIndex(item => item.id === questionId)
      questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
      setQuestions(questionsClone);
    }
  };

  return (
    <div className="question-container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-4 mb-2">Add Questions:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-3">
                <div className="questions-content d-flex gap-4 align-items-center">
                  <div className="form-floating w-50">
                    <input
                      type="type"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                    />
                    <label>Question {index + 1} 's Description</label>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <span className="image-question d-flex align-items-center">
                      <RiImageAddFill />
                    </span>
                    <input type="file" hidden />
                    <span>0 file is upload</span>
                  </div>
                  <div className="btn-add d-flex">
                    <span
                      onClick={() => handleAddRemoveQuestion("ADD", "")}
                      className="icon-add d-flex align-items-center"
                    >
                      <BsFillPlusCircleFill />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                        className="icon-remove d-flex align-items-center"
                      >
                        <FaMinusCircle />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
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
                            value={answer.description}
                          />
                          <label>Answer {index + 1}</label>
                        </div>
                        <div className="btn-group d-flex">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id)
                            }
                            className="icon-add d-flex align-items-center"
                          >
                            <BsFillPatchPlusFill />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                              className="icon-remove d-flex align-items-center"
                            >
                              <BsFillPatchMinusFill />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
