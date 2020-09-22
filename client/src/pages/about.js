import React from 'react';
import {withRouter} from "react-router";
import nav from "../nav";

class About extends React.Component{

    componentDidMount = () => {
      nav(this.props.match.url)
    }

  render() {
      return (
        <h2>About</h2>
      )
    }

}
export default withRouter(About)
