// React components
import React from "react";
import {withRouter} from "react-router";

// Custom styles
import "../styles/css/loading.css";

class ForbiddenPage extends React.Component {
  render() {

    return (
      <div className="d-flex justify-content-center" id="loading-div">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"/>
        </div>
      </div>
    )
  }
}


export default  withRouter(ForbiddenPage)
