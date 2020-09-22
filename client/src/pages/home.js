import React from 'react';
import {withRouter} from "react-router";
import nav from "../nav";

class Home extends React.Component{

  componentDidMount = () => {
    nav(this.props.match.url)
  }

  render() {
      return (
        <h2>Home</h2>
      )
    }
}

export default withRouter(Home)
