import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuizz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQizz.scss";

const DetailQuizz = (props) => {
  const params = useParams();
  const quizzId = params.id;
  const location = useLocation();

  useEffect(() => {
    fetchQuestions();
  }, [quizzId]);
  const fetchQuestions = async () => {
    let data = await getDataQuizz(quizzId);
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
      console.log(res);
    }
  };
  return (
    <div className="detail-quizz-container">
      <div className="left-content">
        <div className="title">
          Quizz {quizzId}: {location?.state?.quizzTitle}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <div className="question">Question 1: Ai đẹp trai nhất ?</div>
          <div className="answer">
            <div className="answer-child">Câu 1</div>
            <div className="answer-child">Câu 1</div>
            <div className="answer-child">Câu 1</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};
export default DetailQuizz;
