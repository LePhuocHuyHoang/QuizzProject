import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQizz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";

const DetailQuizz = () => {
  const { t } = useTranslation();
  const params = useParams();
  const quizzId = params.id;
  const location = useLocation();
  const [dataQuizz, setDataQuizz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [quizzId]);

  const fetchQuestions = async () => {
    let data = await getDataQuiz(quizzId);
    if (data && data.EC === 0) {
      let raw = data.DT;
      let res = _.chain(raw)
        .groupBy("id")
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
          answers = _.orderBy(answers, ["id"], ["asc"]);
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
    if (index - 1 >= 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (dataQuizz.length > index + 1) {
      setIndex(index + 1);
    }
  };

  const handleCheckbox = (answerId, questionId) => {
    if (isQuizFinished) return;
    let dataQuizzClone = _.cloneDeep(dataQuizz);
    let question = dataQuizzClone.find(
      (item) => +item.questionId === +questionId
    );
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

  const handleFinishQuizz = async () => {
    let payload = { quizId: +quizzId, answers: [] };
    let answers = [];

    if (dataQuizz.length > 0) {
      dataQuizz.forEach((question) => {
        let questionId = +question.questionId;
        let userAnswerId = [];
        question.answers.forEach((a) => {
          if (a.isSelected) {
            userAnswerId.push(+a.id);
          }
        });
        answers.push({ questionId, userAnswerId });
      });

      payload.answers = answers;
      console.log("Payload sent to API:", payload);
      let res = await postSubmitQuiz(payload);
      console.log("API response:", res);

      if (res && res.EC === 0) {
        const resultData = {
          countCorrect: res.DT.countCorrect || 0,
          countTotal: res.DT.countTotal || 0,
          quizData: res.DT.quizData || [],
        };
        setDataModalResult(resultData);
        console.log("Data stored in dataModalResult:", resultData);
        setIsShowModalResult(true);
        setIsQuizFinished(true);
      } else {
        alert(t("quiz.errorMessage"));
      }
    }
  };

  useEffect(() => {
    console.log("isQuizFinished in DetailQuizz:", isQuizFinished);
  }, [isQuizFinished]);

  // Log để kiểm tra dataModalResult mỗi khi nó thay đổi
  useEffect(() => {
    console.log("dataModalResult updated:", dataModalResult);
  }, [dataModalResult]);

  return (
    <>
      <div style={{ marginTop: "15px" }}>
        <Header />
      </div>
      <div className="detail-quizz-container">
        <div className="left-content">
          <div className="title">
            {t("quiz.title", { id: quizzId })}: {location?.state?.quizzTitle}
          </div>
          <hr />
          <div className="q-content">
            <Question
              index={index}
              handleCheckbox={handleCheckbox}
              data={dataQuizz.length > 0 ? dataQuizz[index] : []}
              isQuizFinished={isQuizFinished}
            />
          </div>
          <div className="footer">
            <button className="btn btn-secondary" onClick={handlePrev}>
              {t("quiz.prev")}
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              {t("quiz.next")}
            </button>
            <button
              className="btn btn-warning"
              onClick={handleFinishQuizz}
              disabled={isQuizFinished}
            >
              {t("quiz.finish")}
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            dataQuizz={dataQuizz}
            handleFinishQuizz={handleFinishQuizz}
            setIndex={setIndex}
            isQuizFinished={isQuizFinished}
          />
        </div>
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
        />
      </div>
    </>
  );
};

export default DetailQuizz;
