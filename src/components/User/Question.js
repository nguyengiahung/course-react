import _ from "lodash";

const Question = (props) => {
  const { data, index, handleCheckBox } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckBox1 = (event, aId, qId) => {
    // console.log('check' , event.target.checked);
    console.log(aId, qId);
    handleCheckBox(aId, qId);
  };

  return (
    <>
      {data.image ? (
        <div className="q-image text-center">
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question my-2 text-center">
        Question {index + 1}: {data.questionDescription}?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={a.isSelected}
                    onChange={(event) =>
                      handleCheckBox1(event, a.id, +data.questionId)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {a.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
