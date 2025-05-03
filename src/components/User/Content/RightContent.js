import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const refDiv = useRef([]);
  const { dataQuiz, handleFinish } = props;
  const onTimeUp = () => {
    handleFinish();
  };

  const getClassQuestion = (index, question) => {
    // check answered
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (index, question) => {
    props.setIndex(index);

    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }

    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return;
      }
    }

    refDiv.current[index].className = "question clicked";
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((quiz, index) => {
            return (
              <div
                key={`question-abc-${index}`}
                className={getClassQuestion(index, quiz)}
                onClick={() => handleClickQuestion(index, quiz)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
