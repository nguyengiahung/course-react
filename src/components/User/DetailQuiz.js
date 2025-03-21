import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuizById } from "../../services/apiService";
import _ from "lodash";
import './DetailQuiz.scss'

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

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
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      console.log(data);
    }
  };

  return (
    <div className="detail-quiz-container d-flex">
      <div className="left-content">
        <div className="title">Quiz {quizId}: {location?.state?.quizTitle}</div>
        <hr></hr>
        <div className="question-body">
            <img src="../../../logo.png"/>
        </div>
        <div className="question-content">
            <div className="question">Question 1: How are you?</div>
            <div className="answer">
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
        </div>
        <div className="footer text-center d-flex gap-2 justify-content-center">
            <button className="btn btn-primary">Prev</button>
            <button className="btn btn-success">Next</button>
        </div>
      </div>
      <div className="right-content">Countdown</div>
    </div>
  );
};

export default DetailQuiz;
