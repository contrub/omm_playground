// React components
import React from "react";

// Custom components
import ModalForm from "../../components/modal";

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
      redirectURL: '',
      redirectBtnName: ''
    },
    errors: {},
    isValid: false,
    isModalOpen: false
  }

  componentDidMount = () => {
    let {modal} = this.state

    if (Cookies.get('accessToken')) {
      modal["head"] = 'Already authorized'
      modal["body"] = 'You already logged!'
      modal["redirectBtnName"] = 'Logout'
      modal["redirectURL"] = '/logout'

      this.setState({modal: modal})
      this.changeModalState(true)
    }
  }

  changeModalState = () => {
    let {isModalOpen} = this.state

    this.setState({isModalOpen: isModalOpen})
  }

  handleFieldValidation = () => {
    let {inputs, errors} = this.state

    this.setState({isValid: emailValidation(inputs, errors)})
  }

  contactSubmit = (e) => {
    const {inputs, errors, modal} = this.state

    e.preventDefault()

    if (this.state.isValid) {
      errors["email"] = ''

      AuthService.resetPassword({email: inputs.email})
        .then((res) => {
          if (res.message) {
            document.getElementById('validError').innerText = res.message
          } else {
            modal["head"] = 'Recovery link has been sent!'
            modal["body"] = `Check your email - ${inputs.email} (will expire in 10 minutes)`
            modal["redirectURL"] = '/login'
            modal["redirectBtnName"] = 'Login'
            this.setState({modal: modal, errors: errors})

            this.changeModalState()
          }
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message
          modal["redirectURL"] = '/'
          modal["redirectBtnName"] = 'Home'
          this.setState({modal: modal, errors: errors})

          this.changeModalState()
        })
    }
  }

  handleChange = (input, e) => {
    let {inputs} = this.state

    inputs[input] = e.target.value

    this.setState({input: inputs[input]})
    this.handleFieldValidation()
  }

  render() {
    const {classes} = this.props
    const {isModalOpen, inputs, errors, modal} = this.state

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
              value={inputs["email"]}
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
            <div className={classes.validError}>{errors["email"]}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitBtn}
            >
              Send reset link
            </Button>
          </form>
        </div>
        {isModalOpen ?
          <ModalForm
            head={modal.head}
            body={modal.body}
            redirect_url={modal.redirectURL}
            redirect_btn_name={modal.redirectBtnName}
            show={isModalOpen}
            onHide={() => this.changeModalState(false)}
          /> : null}
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(PasswordResetRequest)
