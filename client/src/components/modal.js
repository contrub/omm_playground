// React components
import React from 'react';

const ModalWindow = ({head, body, redirectURL}) => {
  const closeWindow = () => {
    if (redirectURL && redirectURL !== '') {
      window.location.href = redirectURL
    } else {
      window.location.reload()
    }
  }

  return (
    <div id="modal-window" className="modal" tabIndex="-1" style={{display: "block"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{head}</h5>
          </div>
          <div className="modal-body">
            <p className="modal-description">{body}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeWindow}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalWindow;
