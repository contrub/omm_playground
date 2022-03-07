// React components
import React from "react";

// Third party functions
import Cookies from "js-cookie";
import {Redirect} from "react-router";

class Logout extends React.Component {
  componentDidMount = () => {
    Cookies.remove('accessToken')
  }

  render() {
    return (
      <Redirect to={'/login'}/>
    )
  }
}

export default Logout


