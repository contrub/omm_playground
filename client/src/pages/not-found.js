// React components
import React from "react";
import {withRouter} from "react-router";
import {Redirect} from "react-router-dom";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

// Material-UI icons
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import HomeIcon from "@material-ui/icons/Home";

// Custom styles
import styles from "../styles/js/not-found";
import "../styles/css/not-found.css";

class NotFoundPage extends React.Component {
  state = {
    isHomeRedirect: false,
    isContactRedirect: false
  }

  render() {
    const pathname = this.props.location.pathname
    const {classes} = this.props
    const {isContactRedirect, isHomeRedirect} = this.state

    if (isContactRedirect) {
      window.location.href = 'mailto:omm.helper@gmail.com'
    }

    if (isHomeRedirect) {
      return (<Redirect to="/"/>)
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
              <div className="error-details">
                Sorry, an error has occurred, <b>{pathname}</b> not found!
              </div>
              <div className="error-actions">
                <Button
                  onClick={() => {this.setState({isHomeRedirect: true})}}
                  className={classes.homeBtn}
                  startIcon={<HomeIcon/>}
                  variant="contained"
                  color="primary"
                >
                  Take Me Home
                </Button>
                <Button
                  onClick={() => {this.setState({isContactRedirect: true})}}
                  className={classes.supportBtn}
                  startIcon={<HelpOutlineIcon/>}
                  variant="outlined"
                  color="primary"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default withStyles(styles, {withTheme: true})(withRouter(NotFoundPage))
