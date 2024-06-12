import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap"; // Or your preferred UI library
import PdfViewer from "../Text Editor/PdfViewer";


function ModalComponent({ show, handleClose }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Modal className="modal-xl ms-5" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Signature Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PdfViewer />
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
