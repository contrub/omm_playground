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
    errors: {},
    token: '',
    isValid: false,
    isLogged: false
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

  handleFieldValidation = () => {
    let inputs = this.state.inputs;
    let errors = this.state.errors;

    this.setState({isValid: passwordValidation(inputs)})
    this.setState({isValid: passwordCopyValidation(inputs, errors)})
    document.getElementById('passwordRequirements').hidden = false
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs;
    inputs[input] = e.target.value;
    this.setState({input: inputs[input]});
    this.handleFieldValidation()
  }

  showPassword = () => {
    if (document.getElementById('password').type === 'password') {
      document.getElementById('password').type = 'text'
      document.getElementById('passwordCopy').type = 'text'
    } else {
      document.getElementById('password').type = 'password'
      document.getElementById('passwordCopy').type = 'password'
    }
  }

  contactSubmit = (e) => {
    e.preventDefault()

    if (this.state.isValid) {
      const {inputs} = this.state
      const {token} = this.state
      let {modal} = this.state

      AuthService.updatePassword({token: token, password: inputs.password})
        .then((res) => {
          if (res.message) {
            modal["head"] = 'Link time expired!'
            modal["body"] = 'Please, try send new reset password link'
            modal["redirectURL"] = '/reset_request'
            modal["redirectBtnName"] = 'New-request'
            console.log(modal)
            this.setState({modal: modal})
          } else {
            modal["head"] = 'Password successfully reset!'
            modal["body"] = 'From now on you can use a new password'
            modal["redirectURL"] = '/login'
            modal["redirectBtnName"] = 'Login'
            this.setState({modal: modal})
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
    }
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs;
    inputs[input] = e.target.value;
    this.setState({input: inputs[input]});
    this.handleFieldValidation()
  }

  render() {
    const {classes} = this.props
    const {inputs} = this.state
    const {errors} = this.state
    const {modal} = this.state

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
              onChange={this.handleChange.bind(this, "password")}
              value={inputs["password"]}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <ul id='passwordRequirements' hidden>
              <li className={classes.pass_valid_error} id='quantityCheck'>At least 8 characters</li>
              <li className={classes.pass_valid_error} id='numberCheck'>Contains at least 1 number</li>
              <li className={classes.pass_valid_error} id='lowercaseCheck'>Contains at least lowercase letter</li>
              <li className={classes.pass_valid_error} id='uppercaseCheck'>Contains at least uppercase letter</li>
              <li className={classes.pass_valid_error} id='specialCharacterCheck'>Contains a special character (!@#%&)</li>
            </ul>
            <TextField
              onChange={this.handleChange.bind(this, "passwordCopy")}
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
              required
              fullWidth
              name="passwordCopy"
              label="Repeat Password"
              type="password"
              id="passwordCopy"
              autoComplete="current-password"
            />
            <div className={classes.pass_copy_valid_error}>{errors["passwordCopy"]}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitBtn}
            >
              Change Password
            </Button>
          </form>
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
