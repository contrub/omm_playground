// React components
import React from "react";
import { Modal } from "react-bootstrap";

// Material-UI components
import Button from "@material-ui/core/Button";

const ModalForm = (props) => {
  const handleClick = () => {
    if (props.function) {
      performFunction()
    } else {
      redirect()
    }
  }

  const redirect = () => {
    window.location.href = props.redirect_url
  }

  const performFunction = () => {
    props.function()
    props.onHide()
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
            {(props.redirect_url || props.function)
              ?
              <Button variant="contained" color="inherit" onClick={() => handleClick()}>
                {props.redirect_btn_name}
              </Button>
            :
              null
            }
            <Button variant="contained" color="primary" onClick={props.onHide}>
              {props.close_btn_name ? props.close_btn_name : 'Close'}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}

export default ModalForm
