import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./ModalInfoUser.scss";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProfileUser from "./ProfileUSer";
import ChangePassword from "./ChangePassword";
import History from "./History";

const ModalInfoUser = (props) => {
  const { show, setShow } = props;
  const [key, setKey] = useState("home");

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      className="modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>Quản Lý Thông Tin Người Dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
          justify
        >
          <Tab eventKey="home" title="Main Info">
            <ProfileUser handleClose={handleClose}/>
          </Tab>
          <Tab eventKey="profile" title="Change Password">
            <ChangePassword handleClose={handleClose}/>
          </Tab>
          <Tab eventKey="contact" title="History">
            <History />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default ModalInfoUser;
