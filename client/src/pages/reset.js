import React from "react"
import {withRouter} from "react-router";
import nav from "../nav";

class PasswordReset extends React.Component {

  componentDidMount = () => {
    nav(this.props.match.url)
  }

  render() {
    return (
      <div>
        Password reset page
      </div>
    );
  }
}

export default withRouter(PasswordReset)
