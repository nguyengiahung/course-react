import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import sidebarBg from "../../assets/background-sidebar.jpg";
import logo from "../../assets/logo.png";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const { image, collapsed, rtl, toggled, handleToggleSidebar } = props;
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
          style={{
            padding: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="logo-sidebar"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">New</span>}
          >
            Dashboard
            <Link to="/admins" />
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu title={"Features"} icon={<FaRegLaughWink />}>
            <MenuItem>
              Quản lý Users
              <Link to="/admins/manage-users" />
            </MenuItem>
            <MenuItem>
              Quản lý Bài Quiz
              <Link to="/admins/manage-quizzes" />
            </MenuItem>
            <MenuItem>
              Quản lý Câu hỏi
              <Link to="/admins/manage-questions" />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          CyberSoft
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
