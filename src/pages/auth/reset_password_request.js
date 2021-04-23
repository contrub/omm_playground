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

    this.setState({isModalOpen: !isModalOpen})
  }

  handleFieldValidation = () => {
    let {inputs, errors} = this.state

    this.setState({isValid: emailValidation(inputs, errors)})
  }

  contactSubmit = (e) => {
    const {inputs, errors, isValid, modal} = this.state

    e.preventDefault()

    this.handleFieldValidation()

    if (isValid) {
      AuthService.resetPassword({email: inputs.email})
        .then((res) => {
          modal["head"] = 'Recovery link has been sent!'
          modal["body"] = res.message
          modal["redirectURL"] = '/login'
          modal["redirectBtnName"] = 'Login'
          this.setState({modal: modal, errors: errors})

          this.changeModalState()
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message
          modal["redirectURL"] = '/'
          modal["redirectBtnName"] = 'Home'
          this.setState({modal: modal, errors: errors})

          this.changeModalState()
        })
    } else if (!inputs["email"]) {
      errors["email"] = "Cannot be empty"

      this.setState({errors: errors})
    }
  }

  handleChange = (input, e) => {
    let {inputs} = this.state

    inputs[input] = e.target.value

    this.setState({input: inputs[input]})
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitBtn}
            >
              Send reset link
            </Button>
            <div className={classes.validError}>{errors["email"]}</div>
          </form>
        </div>
        {isModalOpen ?
          <ModalForm
            head={modal.head}
            body={modal.body}
            redirect_url={modal.redirectURL}
            redirect_btn_name={modal.redirectBtnName}
            show={isModalOpen}
            onHide={() => this.changeModalState()}
          /> : null}
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(PasswordResetRequest)
