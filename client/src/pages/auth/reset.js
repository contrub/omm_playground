import React from "react";
import Cookies from 'js-cookie'

import withStyles from "@material-ui/core/styles/withStyles";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import EmailIcon from '@material-ui/icons/Email';

import {emailValidation} from "../../helpers/emailValidation";

import UserService from '../../services/UserService';

import isEmpty from "validator/es/lib/isEmpty";

import styles from "../../styles/js/reset";

class PasswordReset extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      inputs: {
        email: ''
      },
      errors: {},
      isValid: false
    }
  }

  isLogged = () => {
    if (Cookies.get('accessToken') !== undefined && isEmpty(Cookies.get('accessToken'))) {
      return true
    } else {
      return false
    }
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

    document.getElementById('validError').innerText = ""
    this.setState({isValid: emailValidation(inputs, errors)})
  }

  contactSubmit = (e) => {
    const email = this.state.inputs.email
    e.preventDefault();
    this.handleFieldValidation()
      .then(() => {
        if (this.state.isValid) {
          UserService.resetPassword({email: email})
            .then((res) => {
              if (res.ok) {
                this.showModal()
              } else {
                this.setState({errors: {email: res.message}})
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

    if (this.isLogged()) {

      window.location.href = '/monuments'

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
                className={classes.submitBtn}
              >
                Reset Password
              </Button>
            </form>
            <div id='validError' className={classes.errors}>{this.state.errors["email"]}</div>
          </div>
          <div id="reset_password" className="modal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Password successful rested!</h5>
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

export default withStyles(styles, {withTheme: true})(PasswordReset)
