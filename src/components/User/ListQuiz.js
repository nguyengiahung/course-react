import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";
const ListQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  return (
    <div className="list-quiz-container container">
      {listQuiz &&
        listQuiz.length > 0 &&
        listQuiz.map((quiz, index) => {
          return (
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64,${quiz.image}`}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button onClick={() => navigate(`/quiz/${quiz.id}`)} className="btn btn-primary">Start Now</button>
              </div>
            </div>
          );
        })}

      {listQuiz && listQuiz.length === 0 &&
        <div>
            You don't have any quiz now...
         </div>   
      }
    </div>
  );
};

export default ListQuiz;
