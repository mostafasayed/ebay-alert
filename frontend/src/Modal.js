import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class DeleteModal extends React.Component {
  state = {
    toggle: true,
  };
  render() {
    return ReactDOM.createPortal(
      <Modal isOpen={true}>
        <ModalHeader>{this.props.header}</ModalHeader>
        <ModalBody>{this.props.body}</ModalBody>
        <ModalFooter>{this.props.actions}</ModalFooter>
      </Modal>,
      document.querySelector("#modal")
    );
  }
}

export default DeleteModal;
