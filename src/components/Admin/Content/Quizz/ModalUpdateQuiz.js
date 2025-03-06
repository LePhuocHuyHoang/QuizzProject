import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../../services/apiService";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const ModalUpdateQuiz = (props) => {
  const { t } = useTranslation();
  const { show, setShow, dataUpdate } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setDifficulty("EASY");
    setImage("");
    setPreviewImage("");
    props.setDataUpdate();
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name || "");
      setDescription(dataUpdate.description || "");
      setDifficulty(dataUpdate.difficulty || "Easy");
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleSubmitUpdateQuiz = async () => {
    if (!name || !description) {
      toast.error("Please enter quiz name and description!");
      return;
    }

    let data = await putUpdateQuiz(
      dataUpdate.id,
      name,
      description,
      difficulty,
      image
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz(); // Gọi lại danh sách quiz sau khi cập nhật
    } else {
      toast.error(data.EM);
    }
  };
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      //   setPreviewImage("");
    }
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{t("quiz.updateTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">{t("quiz.name")}</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t("quiz.difficulty")}</label>
            <select
              className="form-select"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>

          <div className="col-md-12">
            <label className="form-label">{t("quiz.description")}</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>

          <div className="col-md-12">
            <label className="form-label label-upload" htmlFor="labelUpload">
              <FcPlus /> {t("quiz.uploadImage")}
            </label>
            <input
              type="file"
              hidden
              id="labelUpload"
              onChange={(event) => handleUploadImage(event)}
            />
          </div>

          <div className="col-md-12 img-preview">
            {previewImage ? (
              <img src={previewImage} alt="Quiz Preview" />
            ) : (
              <span>{t("quiz.noImage")}</span>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("quiz.close")}
        </Button>
        <Button variant="primary" onClick={handleSubmitUpdateQuiz}>
          {t("quiz.save")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalUpdateQuiz;
