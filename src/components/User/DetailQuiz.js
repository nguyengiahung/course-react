import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getQuizById } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const handlePrev = () => {
    if (index - 1 < 0) {
      return;
    }
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers && question.answers.length > 0) {
      let b = question.answers.map(item => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      })
      console.log(b);
      question.answers = b;
    }

    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }

  };



  const handleFinish = () => {};

  const fetchQuestions = async () => {
    let res = await getQuizById(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      console.log(data);
      setDataQuiz(data);
    }
  };

  return (
    <div className="detail-quiz-container d-flex">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr></hr>
        {/* <div className="question-body">
          <img src="../../../logo.png" />
        </div> */}
        <div className="question-content">
          <Question
            handleCheckBox={handleCheckBox}
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer text-center d-flex gap-2 justify-content-center">
          <button
            onClick={() => handlePrev()}
            className={index === 0 ? "btn btn-read" : "btn btn-primary"}
          >
            Prev
          </button>
          <button
            onClick={() => handleNext()}
            className={
              dataQuiz && dataQuiz.length < index + 1
                ? "btn btn-none"
                : "btn btn-success"
            }
          >
            Next
          </button>
          <button onClick={() => handleFinish()} className="btn btn-warning">
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">Countdown</div>
    </div>
  );
};

export default DetailQuiz;
