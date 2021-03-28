// React components
import React from "react";

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
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from "@material-ui/icons/Visibility";
import EmailIcon from '@material-ui/icons/Email';

// Local functions
import {passwordCopyValidation} from "../../helpers/passwordCopyValidation";
import {passwordValidation} from "../../helpers/passwordValidation";
import UserService from "../../services/UserService";

// Third party functions
import Cookies from "js-cookie";

// Custom styles
import styles from "../../styles/js/reset_password";
import {Redirect} from "react-router";

class PasswordReset extends React.Component {
  state = {
    inputs: {
      password: '',
      passwordCopy: ''
    },
    errors: {},
    modal: {
      head: '',
      body: ''
    },
    token: '',
    isValid: false,
    isLogged: false
  }

  componentDidMount = () => {
    const token = window.location.href.split('=')[1]

    Cookies.get('accessToken') !== undefined ? this.setState({isLogged: true, token: token}) : this.setState({isLogged: false, token: token})
  }

  hideModal = () => {
    document.getElementById('reset_password').style.display = "none"
    window.location.href = '/login'
  }

  showModal = () => {
    document.getElementById('reset_password').style.display = "block"
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
      UserService.updatePassword({token: this.state.token, password: this.state.inputs.password})
        .then((res) => {
          this.setState({modal: {head: 'Password successfully reset!', body: 'From now on you can use a new password'}})
        })
        .catch((e) => {
          this.setState({modal: {head: 'Link time expired!', body: 'Please, try send new reset password link'}})
        })
        .finally(() => this.showModal())
    }
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs;
    inputs[input] = e.target.value;
    this.setState({input: inputs[input]});
    this.handleFieldValidation()
  }

  render() {
    if (this.state.isLogged) {
      return (<Redirect to={'/'}/>)
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
          <div id="reset_password" className="modal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{this.state.modal.head}</h5>
                </div>
                <div className="modal-body">
                  <p>{this.state.modal.body}</p>
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
