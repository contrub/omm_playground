import React from "react";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import UserService from '../services/UserService';
import isEmpty from "validator/es/lib/isEmpty";

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

  // componentDidMount() {
  //   let cookieArr = document.cookie.split(";");
  //   let isLogged = false
  //
  //   for (let i = 0; i < cookieArr.length; i++) {
  //     let cookiePair = cookieArr[i].split("=");
  //
  //     if ('accessToken' === cookiePair[0].trim()) {
  //       isLogged = true
  //     }
  //   }
  //
  //   if (isLogged) {
  //     alert('Already logged!')
  //   }
  //
  // }

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
          if (res.accessToken && res.refreshToken) {
            document.cookie = `accessToken=${res.accessToken.split('Bearer')[1]}`
            document.cookie = `refreshToken=${res.refreshToken.split('Bearer')[1]}`
            window.location.href = '/monuments'
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Checkbox
                icon={<VisibilityIcon/>}
                checkedIcon={<VisibilityOffIcon/>}
                onClick={this.showPassword}
                className={classes.showPass}
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

export default withStyles(styles, {withTheme: true})(SignIn)

