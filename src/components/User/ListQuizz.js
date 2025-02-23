import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuizz.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListQuizz = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [arrQuizz, setArrQuizz] = useState([]);

  useEffect(() => {
    getQuizzData();
  }, []);

  const getQuizzData = async () => {
    const data = await getQuizByUser();
    if (data && data.EC === 0) {
      setArrQuizz(data.DT);
    }
  };

  return (
    <div className="list-quizz-container container">
      {arrQuizz.length > 0 ? (
        arrQuizz.map((quizz, index) => (
          <div
            key={`${index}-quizz`}
            className="card"
            style={{ width: "18rem" }}
          >
            <img
              src={`data:image/jpeg;base64,${quizz.image}`}
              className="card-img-top"
              alt="quiz"
            />
            <div className="card-body">
              <h5 className="card-title">
                {t("listQuizz.quizTitle", { index: index + 1 })}
              </h5>
              <p className="card-text">{quizz.description}</p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate(`/quizz/${quizz.id}`, {
                    state: { quizzTitle: quizz.description },
                  })
                }
              >
                {t("listQuizz.startNow")}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>{t("listQuizz.noQuizz")}</div>
      )}
    </div>
  );
};

export default ListQuizz;
