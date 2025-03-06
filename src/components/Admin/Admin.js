import React, { useState } from "react";
import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import Language from "../Header/Language";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Profile from "../Header/Profile";

const Admin = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogOut = async () => {
    try {
      let res = await logOut(account.email, account.refresh_token);
      if (res && res.EC === 0) {
        dispatch(doLogout());
        navigate("/login");
        toast.success(t("admin.logoutSuccess"));
      } else {
        toast.error(res.EM || t("admin.logoutError"));
      }
    } catch (error) {
      toast.error(t("admin.logoutError"));
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars className="left-side" />{" "}
          </span>
          <div className="right-side">
            <div style={{ marginRight: "10px" }}>
              <Language />
            </div>
            <NavDropdown
              title={t("admin.settings")}
              id="basic-nav-dropdown"
              className="custom-dropdown"
              style={{ marginRight: "20px" }}
            >
              <NavDropdown.Item onClick={() => setShowProfile(true)}>
                {t("admin.profile")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogOut}>
                {t("admin.logout")}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>

        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
      <Profile show={showProfile} setShow={setShowProfile} account={account} />
    </div>
  );
};

export default Admin;
