import React from "react";
import {Link} from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import isEmpty from 'validator/lib/isEmpty';

import UserService from '../services/UserService';

import Cookies from 'js-cookie'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errors: {
    textAlign: 'center',
    color: 'red',
    margin: '0 0 16px'
  },
  showPass: {
    left: '200px'
  },
  myModal: {
    position: 'relative',
    top: '20px'
  }
});


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

  setSessionStorageItem = async (itemName, item) => {

    sessionStorage.setItem(itemName, item)

  }

  removeSessionData = async () => {
    sessionStorage.removeItem('refreshToken')
    Cookies.remove('accessToken')
  }

  login = () => {
    this.removeSessionData()
      .then(() => {
        window.location.reload()
      })
  }

  isLogged = () => {
    let cookieArr = document.cookie.split(";");
    let isLogged = false

    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if ('accessToken' === cookiePair[0].trim()) {
        isLogged = true
      }
    }
    return isLogged
  }

  componentDidMount () {
    const link = document.createElement("link");
    link.href = "//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css";
    link.rel = "stylesheet";
    link.id = "bootstrap-css";
    document.body.appendChild(link)
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
            document.getElementById('validError').innerText = res.message
          } else {
            this.setCookie('accessToken', res.accessToken.split(' ')[1])
              .then(() => {
                this.setSessionStorageItem('refreshToken', res.refreshToken.split(' ')[1])
                  .then(() => {
                    window.location.href = '/monuments'
                  })
              })
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
      return (

        <div className="page-wrap d-flex flex-row align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <span className="display-1 d-block">409</span>
                <div className="mb-4 lead">You are already logged in</div>
                <button onClick={this.login} className="btn btn-link">Logout</button>
              </div>
            </div>
          </div>
        </div>
      )
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

