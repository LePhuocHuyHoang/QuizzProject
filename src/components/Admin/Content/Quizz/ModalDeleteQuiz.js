import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalDeleteQuiz = (props) => {
  const { t } = useTranslation();
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteQuiz = async () => {
    if (!dataDelete?.id) {
      toast.error("Quiz data is missing!");
      return;
    }

    let data = await deleteQuiz(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{t("quiz.confirmDelete")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t("quiz.confirmDeleteMessage")}: <b>{dataDelete?.name}</b>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("quiz.cancel")}
        </Button>
        <Button variant="danger" onClick={handleSubmitDeleteQuiz}>
          {t("quiz.delete")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteQuiz;
