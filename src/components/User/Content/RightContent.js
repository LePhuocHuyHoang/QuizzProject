import CountDown from "./CountDown";
import { find } from "lodash";
import { useRef } from "react";

const RightContent = (props) => {
  const { dataQuizz, handleFinishQuizz, setIndex, isQuizFinished } = props;
  const refDiv = useRef([]);

  const onTimeUp = () => {
    handleFinishQuizz();
  };

  const getClassQuestion = (index, question) => {
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (index, question) => {
    setIndex(index);
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
        <CountDown onTimeUp={onTimeUp} isQuizFinished={isQuizFinished} />
      </div>
      <div className="main-question">
        {dataQuizz &&
          dataQuizz.length > 0 &&
          dataQuizz.map((item, index) => (
            <div
              key={`question-abc-${index}`}
              className={getClassQuestion(index, item)}
              onClick={() => handleClickQuestion(index, item)}
              ref={(element) => (refDiv.current[index] = element)}
            >
              {index + 1}
            </div>
          ))}
      </div>
    </>
  );
};

export default RightContent;
