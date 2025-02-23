import "./Register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      toast.error("Invalid email or password");
      return;
    }

    let data = await postRegister(email, password, username);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span>{t("register.haveAccount")}</span>
        <button onClick={() => navigate("/login")}>
          {t("register.login")}
        </button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">AQuiz</div>
      <div className="welcome col-4 mx-auto">{t("register.welcome")}</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>{t("register.email")}</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>{t("register.password")}</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <span
            className="icons-eye"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <VscEye /> : <VscEyeClosed />}
          </span>
        </div>
        <div className="form-group">
          <label>{t("register.username")}</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <button className="btn-submit" onClick={handleRegister}>
            {t("register.registerButton")}
          </button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            &#60;&#60; {t("register.goHome")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
