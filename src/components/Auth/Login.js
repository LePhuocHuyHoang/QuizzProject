import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner2 } from "react-icons/im";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error(t("login.invalidEmail"));
      return;
    }
    if (!password) {
      toast.error(t("login.invalidPassword"));
      return;
    }
    setIsLoading(true);

    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(@.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>{t("login.noAccount")}</span>
        <button onClick={() => navigate("/register")}>
          {t("login.signUp")}
        </button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">AQuiz</div>
      <div className="welcome col-4 mx-auto">{t("login.welcome")}</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>{t("login.email")}</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>{t("login.password")}</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          {isShowPassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        <span className="forgot-password">{t("login.forgotPassword")}</span>
        <div>
          <button
            className="btn-submit"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading && <ImSpinner2 className="loader-icon" />}
            <span>{t("login.loginButton")}</span>
          </button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            &#60;&#60; {t("login.goHome")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
