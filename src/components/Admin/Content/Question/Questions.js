import { useState } from "react";
import Select from "react-select";
import "./Question.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [
        { id: uuidv4(), description: "answer 1", isCorrect: false },
        { id: uuidv4(), description: "answer 2", isCorrect: false },
      ],
    },
    {
      id: uuidv4(),
      description: "question 2",
      imageFile: "",
      imageName: "",
      answers: [
        { id: uuidv4(), description: "answer 1", isCorrect: false },
        { id: uuidv4(), description: "answer 2", isCorrect: false },
      ],
    },
  ]);
  console.log("question", questions);
  return (
    <div className="questions-container">
      <div className="title"> Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 from-group">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">Add questions: </div>
        <div className="q-main mb-5">
          <div className="questions-content">
            <div className="form-floating description">
              <input
                type="type"
                className="form-control"
                placeholder="name@example.com"
              />
              <label>Question's Description</label>
            </div>
            <div className="group-upload">
              <label>
                <RiImageAddFill className="label-upload" />
              </label>
              <input type={"file"} hidden />
              <span>0 file is uploaded</span>
            </div>
            <div className="btn-add">
              <span>
                <AiFillPlusCircle className="icon-add" />
              </span>
              <span>
                <FaMinusCircle className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input className="form-check-input iscorrect" type="checkbox" />
            <div className="form-floating answer-name">
              <input
                type="type"
                className="form-control"
                placeholder="name@example.com"
              />
              <label>Answer 1</label>
            </div>
            <div className="btn-group">
              <span>
                <FaPlus className="icon-add" />
              </span>
              <span>
                <FaMinus className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input className="form-check-input iscorrect" type="checkbox" />
            <div className="form-floating answer-name">
              <input
                type="type"
                className="form-control"
                placeholder="name@example.com"
              />
              <label>Answer 1</label>
            </div>
            <div className="btn-group">
              <span>
                <FaPlus className="icon-add" />
              </span>
              <span>
                <FaMinus className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
