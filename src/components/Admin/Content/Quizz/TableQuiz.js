import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState();
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    setDataUpdate({});
    setDataDelete({});
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  const handleUpdateQuiz = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdate(quiz);
  };
  const handleDeleteQuiz = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataDelete(quiz);
  };
  return (
    <>
      <div className="title-list-quiz">List Quizzes: </div>
      <div>
        <table className="table table-hover table-bordered mt-2">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listQuiz &&
              listQuiz.map((item, index) => {
                return (
                  <tr key={`table-quiz-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.difficulty}</td>
                    <td style={{ display: "flex", gap: "15px" }}>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleUpdateQuiz(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteQuiz(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <ModalDeleteQuiz
          show={showModalDeleteQuiz}
          setShow={setShowModalDeleteQuiz}
          dataDelete={dataDelete}
          fetchQuiz={fetchQuiz}
        />
        <ModalUpdateQuiz
          show={showModalUpdateQuiz}
          setShow={setShowModalUpdateQuiz}
          dataUpdate={dataUpdate}
          fetchQuiz={fetchQuiz}
          setDataUpdate={setDataUpdate}
        />
      </div>
    </>
  );
};

export default TableQuiz;
