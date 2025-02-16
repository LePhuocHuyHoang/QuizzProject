import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuizz } from "../../services/apiService";

const DetailQuizz = (props) => {
  const params = useParams();
  const quizzId = params.id;
  useEffect(() => {
    fetchQuestions();
  }, [quizzId]);
  const fetchQuestions = async () => {
    let data = await getDataQuizz(quizzId);
    console.log("check list question", data);
  };
  return <div className="detail-quizz-container">Detail Quizz</div>;
};
export default DetailQuizz;
