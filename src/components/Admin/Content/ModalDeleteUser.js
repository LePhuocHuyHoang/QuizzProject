import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalDeleteUser = (props) => {
  const { t } = useTranslation();
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("modal.confirmDelete")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("modal.confirmDeleteMessage")}{" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("modal.cancel")}
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            {t("modal.delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
