import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log(account, isAuthenticated);
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-5">
      <Container>
        <NavLink className="navbar-brand" to="/">
          CyberSoft
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/admins">
              Admins
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>{account.username}</NavDropdown.Item>
                <NavDropdown.Item>Log out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <button
                  className="btn-login"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button
                  className="btn-dark mx-4"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
