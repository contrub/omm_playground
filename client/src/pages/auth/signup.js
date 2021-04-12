// React components
import React from "react";
import {Link}  from "react-router-dom";

// Custom components
import ModalWindow from "../../components/modal";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

// Material-UI icons
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

// Local functions
import {passwordCopyValidation} from "../../helpers/passwordCopyValidation";
import {passwordValidation} from "../../helpers/passwordValidation";
import {emailValidation} from "../../helpers/emailValidation";

// Third party modules
import Cookies from "js-cookie";

// Local modules
import AuthService from "../../services/AuthService";

// Custom styles
import styles from "../../styles/js/auth/signup";
import ModalForm from "../../components/modal";

class SignUp extends React.Component {
  state = {
    inputs: {
      email: '',
      password: '',
      passwordCopy: ''
    },
    modal: {
      head: '',
      body: '',
      redirectURL: '',
      redirectBtnName: ''
    },
    errors: {},
    isValid: false
  }

  handleFieldValidation = () => {
    let inputs = this.state.inputs;
    let errors = this.state.errors;

    document.getElementById('validError').innerText = ""
    this.setState({isValid: emailValidation(inputs, errors)})
    this.setState({isValid: passwordValidation(inputs)})
    this.setState({isValid: passwordCopyValidation(inputs, errors)})
    document.getElementById('passwordRequirements').hidden = false
  }

  contactSubmit = (e) => {
    e.preventDefault();

    if (this.state.isValid) {
      let {modal} = this.state
      let {inputs} = this.state

      AuthService.signup({email: inputs.email, password: inputs.password})
        .then((res) => {
          const accessToken = res.accessToken

          if (accessToken === undefined) {
            modal["head"] = 'Registration error'
            modal["body"] = res.message
            modal["redirectURL"] = '/'
            modal["redirectBtnName"] = 'Home'

            this.setState({modal: modal})
            this.changeModalState(true)
          } else {
            Cookies.set('accessToken', res.accessToken)
            window.location.href = '/'
          }
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message
          modal["redirectBtnName"] = 'Home'
          modal["redirectURL"] = '/'

          this.setState({modal: modal})
          this.changeModalState(true)
        })
    } else {
      this.handleFieldValidation()
      document.getElementById('validError').innerText = "Validation error"
    }
  }

  changeModalState = (state) => {
    let {modal} = this.state
    modal["isOpen"] = state

    this.setState({modal: modal})
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs

    inputs[input] = e.target.value

    this.setState({input: inputs[input]})
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

  render() {
    const {classes} = this.props
    const {inputs} = this.state
    const {errors} = this.state
    const {modal} = this.state

    return (
      <Container component="main" maxWidth="xs" onSubmit={this.contactSubmit.bind(this)}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
            <div className={classes.errors}>{errors["email"]}</div>
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
              <li className={classes.passwordCheck} id='quantityCheck'>At least 8 characters</li>
              <li className={classes.passwordCheck} id='numberCheck'>Contains at least 1 number</li>
              <li className={classes.passwordCheck} id='lowercaseCheck'>Contains at least lowercase letter</li>
              <li className={classes.passwordCheck} id='uppercaseCheck'>Contains at least uppercase letter</li>
              <li className={classes.passwordCheck} id='specialCharacterCheck'>Contains a special character (!@#%&)</li>
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
            <div className={classes.errors}>{errors["passwordCopy"]}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          <div id='validError' className={classes.errors}/>
          <Grid container>
            <Grid item xs>
              <Link to='/reset_request'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/login'>
                Have an account? Sign In
              </Link>
            </Grid>
          </Grid>
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

export default withStyles(styles, {withTheme: true})(SignUp)

