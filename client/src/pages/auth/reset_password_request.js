// React components
import React from "react";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

// Material-UI icons
import EmailIcon from '@material-ui/icons/Email';

// Local functions
import {emailValidation} from "../../helpers/emailValidation";
import UserService from '../../services/UserService';

// Third party functions
import isEmpty from "validator/es/lib/isEmpty";
import Cookies from 'js-cookie';

// Custom styles
import styles from "../../styles/js/reset_password_request";

class PasswordResetRequest extends React.Component {
  state = {
    inputs: {
      email: ''
    },
    errors: {},
    isValid: false,
    isLogged: false
  }

  componentDidMount = () => {
    Cookies.get('accessToken') !== undefined && isEmpty(Cookies.get('accessToken')) ? this.setState({isLogged: true}) : this.setState({isLogged: false})
  }

  hideModal = () => {
    document.getElementById('reset_password').style.display = "none"
    window.location.href = '/login'
  }

  showModal = () => {
    document.getElementById('reset_password').style.display = "block"
  }

  handleFieldValidation = async () => {
    let inputs = this.state.inputs;
    let errors = this.state.errors;

    this.setState({isValid: emailValidation(inputs, errors)})
  }

  contactSubmit = (e) => {
    const email = this.state.inputs.email

    e.preventDefault();
    this.handleFieldValidation()
      .then(() => {
        if (this.state.isValid) {
          document.getElementById('validError').innerText = ""

          UserService.resetPassword({email: email})
            .then((res) => {
              if (res.message) {
                this.setState({errors: {email: res.message}})
              } else {
                this.showModal()
              }
            })
        }
      })
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs;
    inputs[input] = e.target.value;
    this.setState({input: inputs[input]});
  }

  render() {
    if (this.state.isLogged) {
      window.location.href = '/'
    } else {
      const { classes } = this.props

      return (
        <Container component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <EmailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                onChange={this.handleChange.bind(this, "email")}
                value={this.state.inputs["email"]}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit_btn}
              >
                Send reset link
              </Button>
            </form>
            <div id='validError' className={classes.valid_error}>{this.state.errors["email"]}</div>
          </div>
          <div id="reset_password" className="modal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Recovery link has been sent successfully</h5>
                </div>
                <div className="modal-body">
                  <p>Check your email - {this.state.inputs.email}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.hideModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )
    }
  }
}

export default withStyles(styles, {withTheme: true})(PasswordResetRequest)
