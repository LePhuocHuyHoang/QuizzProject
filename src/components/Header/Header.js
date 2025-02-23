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

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          AQuiz
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("header.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              {t("header.users")}
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              {t("header.admin")}
            </NavLink>
          </Nav>
          <div style={{ marginRight: "10px" }}>
            <Language />
          </div>
          <Nav>
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
              <NavDropdown
                title={t("header.settings")}
                id="basic-nav-dropdown"
                className="custom-dropdown"
              >
                <NavDropdown.Item>{t("header.profile")}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>
                  {t("header.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
