import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaTachometerAlt, FaGem, FaGithub } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import sidebarBg from "../../assets/bg2.jpg";
import logoSideBar from "../../assets/logo.png";
import "./SideBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ProSidebar
      image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          className={`sidebar-header-wrapper ${collapsed ? "collapsed" : ""}`}
          style={{
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <img
            src={logoSideBar}
            alt="AQuiz Logo"
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaTachometerAlt />}>
            {t("sidebar.dashboard")}
            <Link to="/admin" />
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu icon={<FaGem />} title={t("sidebar.features")}>
            <MenuItem>
              {t("sidebar.users")}
              <Link to="/admin/manage-users" />
            </MenuItem>
            <MenuItem>
              {t("sidebar.quizzes")}
              <Link to="/admin/manage-quizzes" />
            </MenuItem>
            <MenuItem>
              {t("sidebar.questions")}
              <Link to="/admin/manage-questions" />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className={`sidebar-btn-wrapper ${collapsed ? "collapsed" : ""}`}
          style={{ padding: "20px 24px" }}
        >
          <a
            href="https://github.com/LePhuocHuyHoang"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span>{t("sidebar.profile")}</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideBar;
