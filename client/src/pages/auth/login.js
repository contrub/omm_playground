import React from "react";
import {Link} from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

import isEmpty from 'validator/lib/isEmpty';

import UserService from '../services/UserService';

import Cookies from 'js-cookie'

import styles from '../styles/js/login'
import 'bootstrap/dist/css/bootstrap.min.css'

class SignIn extends React.Component {

  constructor(props){

    super(props);

    this.state = {
      inputs: {
        email: '',
        password: ''
      },
      isValid: false
    }
  }

  setCookie = async (itemName, item) => {
    Cookies.set(itemName, item)
  }

  // setSessionStorageItem = async (itemName, item) => {
  //   sessionStorage.setItem(itemName, item)
  // }

  removeSessionData = async () => {
    // sessionStorage.removeItem('refreshToken')
    Cookies.remove('accessToken')
  }

  login = () => {
    this.removeSessionData()
      .then(() => {
        window.location.reload()
      })
  }

  isLogged = () => {
    if (Cookies.get('accessToken') !== undefined && isEmpty(Cookies.get('accessToken'))) {
      return true
    } else {
      return false
    }
  }

  contactSubmit = (e) => {

    e.preventDefault();
    let email = this.state.inputs.email
    let password = this.state.inputs.password

    if (!isEmpty(email) && !isEmpty(password)) {
      UserService.login({
        email: email,
        password: password
      })
        .then(res => {
          if (res.status) {
            document.getElementById('validError').innerText = res.status
          } else if (res.message) {
            document.getElementById('validError').innerText = res.message
          } else {
            Cookies.set('accessToken', res.accessToken.split(' ')[1])
            window.location.href = '/'
          }
        })
    } else {
      document.getElementById('validError').innerText = "Form can't be empty!"
    }
  }

  handleChange = (input, e) => {
    document.getElementById('validError').innerText = ""
    let inputs = this.state.inputs;
    inputs[input] = e.target.value;
    this.setState({input: inputs[input]});
  }

  showPassword = () => {
    if (document.getElementById('password').type === 'password') {
      document.getElementById('password').type = 'text'
    } else {
      document.getElementById('password').type = 'password'
    }
  }

  render() {

    const { classes } = this.props;

    if (this.isLogged()) {
      window.location.href = '/monuments'
    } else {
      return (
        <Container id="login-page" component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}/>
            <Typography component="h1" variant="h5">
              Sign in
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
              <TextField
                onChange={this.handleChange.bind(this, "password")}
                value={this.state.inputs["password"]}
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
            <div id='validError' className={classes.errors}/>
            <Grid container>
              <Grid item xs>
                <Link to='/reset'>
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
      );
    }
  }
}

export default withStyles(styles, {withTheme: true})(SignIn)

