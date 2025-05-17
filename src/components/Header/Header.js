import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation, Trans } from "react-i18next";
import { FaReact } from "react-icons/fa";
import ModalInfoUser from "./ModalInfoUser";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [showModalInfoUser, setShowModalInfoUser] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = async () => {
    let res = await logout("account.email", account.refresh_token);
    if (res && res.EC === 0) {
      //clear data redux
      dispatch(doLogout());

      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-2">
      <Container>
        <NavLink
          className="navbar-brand d-flex gap-2 align-items-center"
          to="/"
        >
          <span className="brand-icon">
            <FaReact />
          </span>
          CyberSoft
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              {t("header.home")}
            </NavLink>
            <NavLink className="nav-link" to="/users">
              {t("header.users")}
            </NavLink>
            <NavLink className="nav-link" to="/admins">
              {t("header.admins")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setShowModalInfoUser(true)}>
                  {account.username}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout()}>
                  {t("header.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <button
                  className="btn-login"
                  onClick={() => navigate("/login")}
                >
                  {t("header.login")}
                </button>
                <button
                  className="btn-dark mx-4"
                  onClick={() => navigate("/register")}
                >
                  {t("header.signup")}
                </button>
              </>
            )}
            <Language />
          </Nav>
          <ModalInfoUser
            show={showModalInfoUser}
            setShow={setShowModalInfoUser}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
