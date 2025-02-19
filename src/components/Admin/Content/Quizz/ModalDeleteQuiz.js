import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteQuiz = (props) => {
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
        <Modal.Title>Confirm Delete This Quiz?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this quiz: <b>{dataDelete?.name}</b>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmitDeleteQuiz}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteQuiz;
