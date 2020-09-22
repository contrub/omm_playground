import React from "react";
import {withRouter} from "react-router";
import nav from "../nav";

class Signup extends React.Component {

  componentDidMount = () => {
    nav(this.props.match.url)
  }

  render() {
    return (
      <div>
        SignUp Page
      </div>
    )
  }
}

export default withRouter(Signup)
