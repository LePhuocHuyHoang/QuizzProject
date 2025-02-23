import { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/apiService";
import { useTranslation } from "react-i18next";

const ModalCreateUser = ({
  show,
  setShow,
  fetchListUsersWithPaginate,
  setCurrentPage,
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage(null);
    setPreviewImage("");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleUploadImage = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
          toast.error(t("modal.invalidImage"));
          return;
        }
        setPreviewImage(URL.createObjectURL(file));
        setImage(file);
      }
    },
    [t]
  );

  const handleSubmitCreateUser = async () => {
    if (!validateEmail(email)) {
      toast.error(t("modal.invalidEmail"));
      return;
    }
    if (!password) {
      toast.error(t("modal.invalidPassword"));
      return;
    }

    const data = await postCreateNewUser(
      email,
      password,
      username,
      role,
      image
    );
    if (data?.EC === 0) {
      toast.success(data.EM);
      handleClose();
      setCurrentPage(1);
      await fetchListUsersWithPaginate(1);
    } else {
      toast.error(data?.EM);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      className="modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.addUser")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label">{t("modal.email")}</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("modal.enterEmail")}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">{t("modal.password")}</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("modal.enterPassword")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">{t("modal.username")}</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder={t("modal.enterUsername")}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">{t("modal.role")}</label>
            <select
              className="form-select"
              onChange={(event) => setRole(event.target.value)}
              value={role}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label label-upload" htmlFor="labelUpload">
              <FcPlus /> {t("modal.uploadImage")}
            </label>
            <input
              type="file"
              hidden
              id="labelUpload"
              onChange={handleUploadImage}
            />
          </div>
          <div className="col-md-12 img-preview">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <span>{t("modal.previewImage")}</span>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("modal.close")}
        </Button>
        <Button variant="primary" onClick={handleSubmitCreateUser}>
          {t("modal.save")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateUser;
