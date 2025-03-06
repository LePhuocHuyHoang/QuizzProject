import { useState } from "react";
import "./ManageQuiz.scss";

import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import { Accordion } from "react-bootstrap";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
import { useTranslation } from "react-i18next";
import { FcPlus } from "react-icons/fc";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(options[0]);
  const [image, setImage] = useState(null);

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType(options[0]);
      setImage(null);
      document.querySelector('input[type="file"]').value = "";
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <div className="quiz-container">
        {" "}
        <Tabs
          defaultActiveKey="home"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="home" title={t("quiz.manageQuizzes")}>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  {t("quiz.addNewQuiz")}
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Quiz Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label>{t("quiz.quizName")}</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label>{t("quiz.description")}</label>
                </div>
                <div className="my-3">
                  <Select
                    value={type}
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder={"Quiz type..."}
                  />
                </div>
                <div className="more-actions form-group">
                  <label className="label-upload" htmlFor="quizImageUpload">
                    <FcPlus /> {t("quiz.uploadImage")}
                  </label>
                  <input
                    type="file"
                    id="quizImageUpload"
                    hidden
                    onChange={handleChangeFile}
                  />
                </div>
                <div className="img-preview">
                  {image ? (
                    <img src={URL.createObjectURL(image)} alt="Preview" />
                  ) : (
                    <span>{t("quiz.previewImage")}</span>
                  )}
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmitQuiz()}
                  >
                    {t("quiz.save")}
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-detail">
              <TableQuiz />
            </div>
          </Tab>
          <Tab eventKey="profile" title={t("quiz.updateQA")}>
            <QuizQA />
          </Tab>
          <Tab eventKey="longer-tab" title={t("quiz.assignUsers")}>
            <AssignQuiz />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ManageQuiz;
