// React components
import React from "react";
import {Link} from "react-router-dom";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Material-UI icons
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

// Third party functions
import Cookies from "js-cookie";

// Local modules
import AuthService from "../../services/AuthService";

// Third party functions
import isEmpty from "validator/lib/isEmpty";

// Custom styles
import styles from "../../styles/js/auth/login";

class SignIn extends React.Component {
  state = {
    inputs: {
      email: '',
      password: ''
    },
    errors: {
      email: '',
      password: '',
      validation: ''
    },
    isValid: false,
    isPasswordHidden: true
  }

  componentDidMount = () => {
    if (Cookies.get('accessToken')) {
      window.location.href = '/logout'
    }
  }

  contactSubmit = (e) => {
    e.preventDefault()

    let {inputs, errors} = this.state

    if (!isEmpty(inputs.email) && !isEmpty(inputs.password)) {
      AuthService.login({email: inputs.email, password: inputs.password})
        .then((res) => {
          console.log(res)
          if (res.message) {
            errors["validation"] = res.message

            this.setState({errors: errors})
          } else if (res.accessToken) {
            Cookies.set('accessToken', res.accessToken.split(' ')[1])
            window.location.href = '/'
          }
        })
        .catch((err) => {
          errors["validation"] = err.message

          this.setState({errors: errors})
        })
    } else {
      errors["validation"] = "Form can't be empty!"
      this.setState({errors: errors})
    }
  }

  handleChange = (input, e) => {
    let {inputs} = this.state

    inputs[input] = e.target.value

    this.setState({input: inputs[input]});
  }

  showPassword = () => {
    let {isPasswordHidden} = this.state

    this.setState({isPasswordHidden: !isPasswordHidden})
  }

  render() {
    const {classes} = this.props
    const {inputs, errors, isPasswordHidden} = this.state

    return (
        <Container id="login-page" component="main" maxWidth="xs" onSubmit={this.contactSubmit.bind(this)}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}/>
            <Typography component="h1" variant="h5">
              Sign in
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
              <Button
                className={classes.submit_btn}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Sign In
              </Button>
            </form>
            <div className={classes.validError}>{errors.validation}</div>
            <Grid container>
              <Grid item xs>
                <Link to='/reset_request'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </div>
        </Container>
      )
  }
}

export default withStyles(styles, {withTheme: true})(SignIn)


