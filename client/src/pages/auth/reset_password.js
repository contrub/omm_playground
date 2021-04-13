// React components
import React from "react";

// Custom components
import ModalForm from "../../components/modal";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

// Material-UI icons
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EmailIcon from '@material-ui/icons/Email';

// Local functions
import {passwordCopyValidation} from "../../helpers/passwordCopyValidation";
import {passwordValidation} from "../../helpers/passwordValidation";

// Local modules
import AuthService from "../../services/AuthService";

// Third party modules
import Cookies from "js-cookie";

// Custom styles
import styles from "../../styles/js/auth/reset_password";

class PasswordReset extends React.Component {
  state = {
    inputs: {
      password: '',
      passwordCopy: ''
    },
    modal: {
      isOpen: '',
      head: '',
      body: '',
      redirectURL: '',
      redirectBtnName: ''
    },
    errors: {
      pass: '',
      pass1: '',
      validError: ''
    },
    token: '',
    isValid: false,
    isPasswordHidden: true
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

    this.setState({token: this.props.location.search.split('=')[1]})
  }

  changeModalState = (state) => {
    let {modal} = this.state
    modal["isOpen"] = state

    this.setState({modal: modal})
  }

  handleFieldValidation = (name) => {
    let {inputs, errors, isValid} = this.state

    if (name === 'password') {
      this.setState({isValid: passwordValidation(inputs, errors)})
    } else if (name === 'passwordCopy') {
      this.setState({isValid: passwordCopyValidation(inputs, errors)})
    }

    if (isValid) {
      errors["validError"] = ""

      this.setState({errors: errors})
    }
  }

  handleChange = (input, e) => {
    let {inputs} = this.state

    inputs[input] = e.target.value

    this.setState({input: inputs[input]})
    this.handleFieldValidation(input)
  }


  showPassword = () => {
    let {isPasswordHidden} = this.state

    this.setState({isPasswordHidden: !isPasswordHidden})
  }

  contactSubmit = (e) => {
    let {inputs, errors, token, modal} = this.state

    e.preventDefault()

    if (this.state.isValid) {
      AuthService.updatePassword({token: token, password: inputs.password})
        .then((res) => {
          if (res.message) {
            modal["head"] = 'Link time expired!'
            modal["body"] = 'Please, try send new reset password link'
            modal["redirectURL"] = '/reset_request'
            modal["redirectBtnName"] = 'New-request'
            this.setState({modal: modal})
          } else {
            //*
            // Хотелось бы использовать модальное окно, но нужно продумать переход на /login
            // *//
            // modal["head"] = 'Password successfully reset!'
            // modal["body"] = 'From now on you can use a new password'
            // modal["redirectURL"] = '/login'
            // modal["redirectBtnName"] = 'Login'
            // this.setState({modal: modal})
            window.location.href = '/login'
          }
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message
          modal["redirectURL"] = '/'
          modal["redirectBtnName"] = 'Home'
          this.setState({modal: modal})
        })
        .finally(() => {
          this.changeModalState(true)
        })
    } else {
      errors["validError"] = 'ValidationError'

      this.setState({errors: errors})
    }
  }

  render() {
    const {classes} = this.props
    const {inputs, errors, modal, isPasswordHidden} = this.state

    return (
      <Container component="main" maxWidth="xs" onSubmit={this.contactSubmit.bind(this)}>
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
              onChange={this.handleChange.bind(this, "password")}
              type={isPasswordHidden ? 'password' : 'text'}
              value={inputs["password"]}
              variant="outlined"
              margin="normal"
              label="Password"
              name="password"
              fullWidth
              required
            />
            <ul className={classes.passwordRequirements}>
              {!errors["quantityCheck"] && <li>At least 8 characters</li>}
              {!errors["numberCheck"] && <li>Contains at least 1 number</li>}
              {!errors["lowercaseCheck"] && <li>Contains at least lowercase letter</li>}
              {!errors["uppercaseCheck"] && <li>Contains at least uppercase letter</li>}
              {!errors["specialCharacterCheck"] && <li>Contains a special character (!@#%&)</li>}
            </ul>
            <TextField
              onChange={this.handleChange.bind(this, "passwordCopy")}
              type={isPasswordHidden ? 'password' : 'text'}
              value={inputs["passwordCopy"]}
              InputProps={{
                endAdornment: (
                  <Checkbox
                    icon={<VisibilityIcon/>}
                    checkedIcon={<VisibilityOffIcon/>}
                    onClick={this.showPassword}
                  />)
              }}
              variant="outlined"
              margin="normal"
              label="Repeat Password"
              name="passwordCopy"
              fullWidth
              required
            />
            <div className={classes.passwordCopyRequirements}>{errors["passwordCopy"]}</div>
            <Button
              className={classes.submitBtn}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Change Password
            </Button>
          </form>
          <div className={classes.validError}>{errors["validError"]}</div>
        </div>
        {modal.isOpen ?
          <ModalForm
            head={modal.head}
            body={modal.body}
            redirect_url={modal.redirectURL}
            redirect_btn_name={modal.redirectBtnName}
            show={modal.isOpen}
            onHide={() => this.changeModalState(false)}
          /> : null}
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(PasswordReset)
