import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation } from "react-i18next";
import logoSideBar from "../../assets/logo.png";
import Profile from "./Profile";
import { useState } from "react";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogOut = async () => {
    let res = await logOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  const userRole = account?.role;

  const imageSrc = account?.image?.startsWith("data:image")
    ? account.image
    : account?.image
    ? `data:image/jpeg;base64,${account.image}`
    : null;

  return (
    <>
      <style>
        {`
          .no-arrow .dropdown-toggle::after {
            display: none !important;
          }
        `}
      </style>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/">
            <img
              src={logoSideBar}
              alt="AQuiz Logo"
              className="logo"
              style={{
                cursor: "pointer",
                marginTop: "-50px",
                marginBottom: "-55px",
              }}
            />
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                {t("header.home")}
              </NavLink>
              {(isAuthenticated === false ||
                userRole === "USER" ||
                userRole === "ADMIN") && (
                <NavLink to="/users" className="nav-link">
                  {t("header.users")}
                </NavLink>
              )}
              {(isAuthenticated === false || userRole === "ADMIN") && (
                <NavLink to="/admin" className="nav-link">
                  {t("header.admin")}
                </NavLink>
              )}
            </Nav>
            <div style={{ marginRight: "10px" }}>
              <Language />
            </div>
            <Nav className="align-items-center">
              {isAuthenticated === false ? (
                <>
                  <button className="btn-login" onClick={handleLogin}>
                    {t("header.login")}
                  </button>
                  <button className="btn-signup" onClick={handleRegister}>
                    {t("header.signup")}
                  </button>
                </>
              ) : (
                <>
                  {/* Thay chữ Settings bằng avatar và ẩn mũi tên */}
                  {imageSrc && (
                    <NavDropdown
                      title={
                        <img
                          src={imageSrc}
                          alt="User Avatar"
                          className="user-avatar"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      }
                      id="basic-nav-dropdown"
                      className="custom-dropdown no-arrow" // Thêm class no-arrow
                    >
                      <NavDropdown.Item onClick={() => setShowProfile(true)}>
                        {t("header.profile")}
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogOut}>
                        {t("header.logout")}
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={showProfile} setShow={setShowProfile} account={account} />
    </>
  );
};

export default Header;
