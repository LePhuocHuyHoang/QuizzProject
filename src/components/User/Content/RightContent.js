import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuizz } = props;
  const onTimeUp = () => {
    props.handleFinishQUizz();
  };
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuizz &&
          dataQuizz.length > 0 &&
          dataQuizz.map((item, index) => {
            return (
              <div key={`question-abc-${index}`} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
