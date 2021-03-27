// React components
import React from "react";
import {withRouter} from "react-router";

class ForbiddenPage extends React.Component {
  render() {
    const pathname = this.props.location.state.from.pathname

    return (
      <section id="wrapper" className="container-fluid">
        <div className="error-box">
          <div className="error-body text-center">
            <h1 className="text-danger">403</h1>
            <h3>Forbidden {pathname}</h3>
          </div>
        </div>
      </section>
    )
  }
}


export default withRouter(ForbiddenPage)
