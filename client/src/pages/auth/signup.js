// React components
import React from "react";
import {Link}  from "react-router-dom";

// Custom components
import ModalForm from "../../components/modal";

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
    errors: {
      email: '',
      password: {
        passwordRequirements: false,
        specialCharacterCheck: false,
        lowercaseCheck: false,
        uppercaseCheck: false,
        quantityCheck: false,
        numberCheck: false
      },
      passwordCopy: '',
      validError: ''
    },
    isPasswordHidden: true,
    isValid: false
  }

  handleFieldValidation = (name) => {
    let {inputs, errors} = this.state

    errors["validError"] = ""

    if (name === 'email') {
      this.setState({isValid: emailValidation(inputs, errors)})
    } else if (name === 'password') {
      this.setState({isValid: passwordValidation(inputs, errors)})
    } else if (name === 'passwordCopy') {
      this.setState({isValid: passwordCopyValidation(inputs, errors)})
    }
  }

  contactSubmit = (e) => {
    e.preventDefault()

    let {inputs, errors, modal} = this.state

    if (this.state.isValid) {

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

      errors["validError"] = "Validation error"

      this.setState({errors: errors})
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
    this.handleFieldValidation(input)
  }

  showPassword = () => {
    let {isPasswordHidden} = this.state

    this.setState({isPasswordHidden: !isPasswordHidden})
  }

  render() {
    const {classes} = this.props
    const {inputs, errors, modal, isPasswordHidden} = this.state

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
              label="Email"
              name="email"
              id="email"
              fullWidth
              required
            />
            <div className={classes.emailRequirement}>{errors["email"]}</div>
            <TextField
              onChange={this.handleChange.bind(this, "password")}
              type={isPasswordHidden ? 'password' : 'text'}
              value={inputs["password"]}
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
              variant="outlined"
              margin="normal"
              label="Repeat Password"
              name="passwordCopy"
              fullWidth
              required
            />
            <div className={classes.passwordCopyRequirement}>{errors["passwordCopy"]}</div>
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Sign Up
            </Button>
          </form>
          <div className={classes.errors}>{errors["validError"]}</div>
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

