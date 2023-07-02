import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function A_SimpleModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.Header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Footer>
        {props.onClose ? <Button onClick={props.onClose}>Close</Button> : ""}
        {props.onFinish ? <Button onClick={props.onFinish}>Finish</Button> : ""}
      </Modal.Footer>
    </Modal>
  );
}
