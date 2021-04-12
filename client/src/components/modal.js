// React components
import React from "react";
import { Modal } from "react-bootstrap";

// Material-UI components
import Button from "@material-ui/core/Button";

const ModalForm = (props) => {
  const redirect = () => {
    window.location.href = props.redirect_url
  }

  return (
      <>
        <Modal
          {...props}
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.head}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.body}</Modal.Body>
          <Modal.Footer>
            {props.redirect_url
              ?
              <Button variant="contained" color="inherit" onClick={() => redirect()}>
                {props.redirect_btn_name}
              </Button>
            :
              null
            }
            <Button variant="contained" color="primary" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}

export default ModalForm
