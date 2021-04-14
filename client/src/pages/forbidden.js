// React components
import React from "react";
import {withRouter} from "react-router";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

// Material-UI icons
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import HomeIcon from "@material-ui/icons/Home";

// Custom styles
import styles from "../styles/js/forbidden";
import "../styles/css/forbidden.css";

class ForbiddenPage extends React.Component {
  render() {
    const pathname = this.props.location.state.from.pathname
    const {classes} = this.props

    const contactSupport = () => {
      window.location.href = "mailto:omm.helper@gmail.com"
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>403 Forbidden</h2>
              <div className="error-details">
                Sorry, an error has occurred, <b>{pathname}</b> is forbidden!
              </div>
              <div className="error-actions">
                <Button
                  startIcon={<HomeIcon/>}
                  className={classes.homeBtn}
                  variant="contained"
                  color="primary"
                >
                  Take Me Home
                </Button>
                <Button
                  onClick={contactSupport}
                  startIcon={<HelpOutlineIcon/>}
                  className={classes.supportBtn}
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


export default withStyles(styles, {withTheme: true})(withRouter(ForbiddenPage))
