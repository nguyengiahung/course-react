import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiService";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataQuizDelete, fetchListQuiz } = props;

  const handleClose = () => setShow(false);
    const handleSubmitDeleteQuiz = async() => {
        let res = await deleteQuiz(dataQuizDelete.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            fetchListQuiz()
          }
      
          if (res && res.EC !== 0) {
            toast.error(res.EM);
          }
    }
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button> */}

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete this quiz, id = {" "}
          <b>{dataQuizDelete && dataQuizDelete.id ? dataQuizDelete.id : ""}</b>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
