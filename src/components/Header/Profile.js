import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  updateProfile,
  changePassword,
  getHistory,
} from "../../services/apiService";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/action/userAction";
import _ from "lodash";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Profile = (props) => {
  const { t } = useTranslation();
  const { show, setShow, account } = props;
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [originalData, setOriginalData] = useState({});

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(account)) {
      const initialData = {
        username: account.username || "",
        email: account.email || "",
        role: account.role || "",
        previewImage: account.image
          ? `data:image/jpeg;base64,${account.image}`
          : "",
      };
      setOriginalData(initialData);
      setUsername(initialData.username);
      setEmail(initialData.email);
      setRole(initialData.role);
      setPreviewImage(initialData.previewImage);
      setImage("");
      console.log("Account updated in useEffect:", account);
    }
    if (show) {
      fetchHistory();
    }
  }, [account, show]);

  const fetchHistory = async () => {
    try {
      let response = await getHistory();
      console.log("History raw response:", response);
      const data = response.data || response;
      console.log("Processed history data:", data);

      if (data && data.EC === 0) {
        setHistoryData(data.DT.data || []);
      } else {
        toast.error(data.EM || t("modal.fetchHistoryError"));
        setHistoryData([]);
      }
    } catch (error) {
      toast.error(t("modal.fetchHistoryError"));
      console.error("Fetch history error:", error);
      setHistoryData([]);
    }
  };

  const handleClose = () => {
    setShow(false);
    setUsername(originalData.username);
    setEmail(originalData.email);
    setRole(originalData.role);
    setImage("");
    setPreviewImage(originalData.previewImage);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      let data = await updateProfile(username, image);
      console.log("API response:", data);
      if (data && data.EC === 0) {
        toast.success(data.EM);
        const updatedData = {
          ...originalData,
          username: username,
          previewImage: image
            ? URL.createObjectURL(image)
            : originalData.previewImage,
          image:
            data.DT?.image ||
            (image ? await convertFileToBase64(image) : account.image),
        };
        setOriginalData(updatedData);
        const updatedProfile = {
          username: username,
          image:
            data.DT?.image ||
            (image ? await convertFileToBase64(image) : account.image),
        };
        dispatch(updateUserProfile(updatedProfile));
        console.log("Dispatched profile update:", updatedProfile);
        setShow(false);
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      toast.error(t("modal.updateError"));
      console.error("Update profile error:", error);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChangePassword = async () => {
    if (newPassword === currentPassword) {
      toast.error(t("modal.passwordSameAsOld"));
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t("modal.passwordMismatch"));
      return;
    }
    try {
      let response = await changePassword(currentPassword, newPassword);
      console.log("Change password raw response:", response);
      const data = response.data || response;
      console.log("Processed data:", data);

      if (data && data.EC === 0) {
        toast.success(data.EM || t("modal.changePasswordSuccess"));
        setShow(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.EM || t("modal.changePasswordError"));
      }
    } catch (error) {
      toast.error(t("modal.changePasswordError"));
      console.error("Change password error:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      className="modal-profile"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("modal.userProfile")}</Modal.Title>
      </Modal.Header>

      <Tabs
        defaultActiveKey="home"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="home" title={t("modal.updateProfile")}>
          <Modal.Body>
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">{t("modal.username")}</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t("modal.email")}</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t("modal.role")}</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label
                  className="form-label label-upload"
                  htmlFor="labelUpload"
                  style={{ marginBottom: "-10px" }}
                >
                  <FcPlus /> {t("modal.uploadImage")}
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
                  <img src={previewImage} alt="Profile" />
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
            <Button variant="primary" onClick={handleUpdateProfile}>
              {t("modal.update")}
            </Button>
          </Modal.Footer>
        </Tab>
        <Tab eventKey="profile" title={t("modal.changePassword")}>
          <Modal.Body>
            <form className="row g-3">
              <div className="col-md-12">
                <label className="form-label">
                  {t("modal.currentPassword")}
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder={t("modal.enterCurrentPassword")}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">{t("modal.newPassword")}</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder={t("modal.enterNewPassword")}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">
                  {t("modal.confirmPassword")}
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder={t("modal.enterConfirmPassword")}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("modal.close")}
            </Button>
            <Button variant="primary" onClick={handleChangePassword}>
              {t("modal.change")}
            </Button>
          </Modal.Footer>
        </Tab>
        <Tab eventKey="longer-tab" title={t("modal.history")}>
          <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">{t("modal.historyId")}</th>
                  <th scope="col">{t("modal.quizName")}</th>
                  <th scope="col">{t("modal.totalQuestions")}</th>
                  <th scope="col">{t("modal.totalCorrect")}</th>
                  <th scope="col">{t("modal.date")}</th>
                </tr>
              </thead>
              <tbody>
                {historyData.length > 0 ? (
                  historyData.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{item.id}</th>
                      <td>{item.quizHistory?.name || "Unknown Quiz"}</td>
                      <td>{item.total_questions}</td>
                      <td>{item.total_correct}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      {t("modal.noHistory")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("modal.close")}
            </Button>
          </Modal.Footer>
        </Tab>
      </Tabs>
    </Modal>
  );
};

export default Profile;
