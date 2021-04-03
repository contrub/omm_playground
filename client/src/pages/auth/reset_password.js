// React components
import React from "react";

// Custom components
import ModalWindow from "../../components/modal";

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
import {withRouter} from "react-router";

class PasswordReset extends React.Component {
  state = {
    inputs: {
      password: '',
      passwordCopy: ''
    },
    modal: {
      head: '',
      body: ''
    },
    errors: {},
    token: '',
    isValid: false,
    isLogged: false
  }

  componentDidMount = () => {
    let {modal} = this.state

    if (Cookies.get('accessToken')) {
      modal["head"] = 'Authorization Error'
      modal["body"] = 'You already logged!'
      modal["redirectURL"] = '/'
      this.setState({modal: modal})
    } else {
      this.setState({token: this.props.location.search.split('=')[1]})
    }
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
            document.getElementById('validError').innerText = res.message
          } else {
            modal["head"] = 'Password successfully reset!'
            modal["body"] = 'From now on you can use a new password'
            modal["redirectURL"] = '/login'
            this.setState({modal: modal})
          }
        })
        .catch((err) => {
          modal["head"] = 'Link time expired!'
          modal["body"] = 'Please, try send new reset password link'
          modal["redirectURL"] = '/'
          this.setState({modal: modal})
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
              onChange={this.handleChange.bind(this, "password")}
              value={this.state.inputs["password"]}
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
              value={this.state.inputs["passwordCopy"]}
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
            <div className={classes.pass_copy_valid_error}>{this.state.errors["passwordCopy"]}</div>
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
        {this.state.modal.body && <ModalWindow head={this.state.modal.head} body={this.state.modal.body} redirectURL={this.state.modal.redirectURL}/>}
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(PasswordReset))
