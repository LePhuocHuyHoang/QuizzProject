import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQizz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";

const DetailQuizz = (props) => {
  const params = useParams();
  const quizzId = params.id;
  const location = useLocation();
  const [dataQuizz, setDataQuizz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizzId]);
  const fetchQuestions = async () => {
    let data = await getDataQuiz(quizzId);
    if (data && data.EC === 0) {
      let raw = data.DT;
      let res = _.chain(raw)
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
          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();
      setDataQuizz(res);
    }
  };
  const handlePrev = () => {
    if (index - 1 < 0) {
      return;
    }
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuizz && dataQuizz.length > index + 1) {
      setIndex(index + 1);
    }
  };
  const handleCheckbox = (answerId, questionId) => {
    let dataQuizzClone = _.cloneDeep(dataQuizz);
    let question = dataQuizz.find((item) => +item.questionId === +questionId);
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizzClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizzClone[index] = question;
      setDataQuizz(dataQuizzClone);
    }
  };
  const handleFinishQUizz = async () => {
    let payload = { quizId: +quizzId, answers: [] };
    let answers = [];
    if (dataQuizz && dataQuizz.length > 0) {
      dataQuizz.forEach((question) => {
        let questionId = +question.questionId;
        let userAnswerId = [];
        question.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(+a.id);
          }
        });
        answers.push({ questionId: +questionId, userAnswerId: userAnswerId });
      });
      payload.answers = answers;
      let res = await postSubmitQuiz(payload);
      console.log("check res", res);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("Something wrongs...");
      }
    }
  };
  return (
    <div className="detail-quizz-container">
      <div className="left-content">
        <div className="title">
          Quizz {quizzId}: {location?.state?.quizzTitle}
        </div>
        <hr />
        <div className="q-content">
          <Question
            index={index}
            handleCheckbox={handleCheckbox}
            data={dataQuizz && dataQuizz.length > 0 ? dataQuizz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQUizz()}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};
export default DetailQuizz;
