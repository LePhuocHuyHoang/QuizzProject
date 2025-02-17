import { useEffect, useState } from "react";
import { getQuizzByUser } from "../../services/apiService";
import "./ListQuizz.scss";
import { useNavigate } from "react-router-dom";

const ListQuizz = (props) => {
  const navigate = useNavigate();
  const [arrQuizz, setArrQuizz] = useState([]);
  useEffect(() => {
    getQuizzData();
  }, []);
  const getQuizzData = async () => {
    const data = await getQuizzByUser();
    if (data && data.EC === 0) {
      setArrQuizz(data.DT);
      console.log(data);
    }
  };
  return (
    <div className="list-quizz-container container">
      {arrQuizz &&
        arrQuizz.length > 0 &&
        arrQuizz.map((quizz, index) => {
          return (
            <div
              key={`${index}-quizz`}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                src={`data:image/jpeg;base64,${quizz.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quizz {index + 1}</h5>
                <p className="card-text">{quizz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quizz/${quizz.id}`, {
                      state: { quizzTitle: quizz.description },
                    })
                  }
                >
                  Start Now
                </button>
              </div>
            </div>
          );
        })}
      {arrQuizz && arrQuizz.length === 0 && (
        <div>You don't have any quizz now...</div>
      )}
    </div>
  );
};
export default ListQuizz;
