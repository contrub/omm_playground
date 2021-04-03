// React components
import React from "react";

// Custom components
import ModalWindow from "../../components/modal";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

// Material-UI icons
import EmailIcon from "@material-ui/icons/Email";

// Local functions
import {emailValidation} from "../../helpers/emailValidation";

// Local modules
import AuthService from '../../services/AuthService';

// Third party modules
import Cookies from "js-cookie";

// Custom styles
import styles from "../../styles/js/auth/reset_password_request";

class PasswordResetRequest extends React.Component {
  state = {
    inputs: {
      email: ''
    },
    modal: {
      head: '',
      body: '',
      redirectURL: ''
    },
    errors: {},
    isValid: false
  }

  componentDidMount = () => {
    let {modal} = this.state

    if (Cookies.get('accessToken')) {
      modal["head"] = 'Authorization Error'
      modal["body"] = 'You already logged!'
      modal["redirectURL"] = '/'
      this.setState({modal: modal})
    }
  }

  handleFieldValidation = () => {
    let inputs = this.state.inputs;
    let errors = this.state.errors;

    this.setState({isValid: emailValidation(inputs, errors)})
  }

  contactSubmit = (e) => {
    e.preventDefault()

    if (this.state.isValid) {
      const email = this.state.inputs.email
      const {inputs} = this.state
      let {modal} = this.state


      document.getElementById('validError').innerText = ""

      AuthService.resetPassword({email: email})
        .then((res) => {
          if (res.message) {
            document.getElementById('validError').innerText = res.message
          } else {
            modal["head"] = 'Recovery link has been sent successfully!'
            modal["body"] = `Check your email - ${inputs.email}`
            modal["redirectURL"] = '/login'
            this.setState({modal: modal})
          }
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message
          modal["redirectURL"] = '/'
          this.setState({modal: modal})
        })
    }
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs

    inputs[input] = e.target.value

    this.setState({input: inputs[input]})
    this.handleFieldValidation()
  }

  render() {
    const {classes} = this.props

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
        {this.state.modal.body && <ModalWindow head={this.state.modal.head} body={this.state.modal.body} redirectURL={this.state.modal.redirectURL}/>}
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(PasswordResetRequest)
