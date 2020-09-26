import React from "react";
import { Link }  from "react-router-dom";
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
import isEmail from "validator/es/lib/isEmail";
import isEmpty from "validator/es/lib/isEmpty";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

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
    color: 'red'
  },
  showPass: {
    left: '200px'
  }
});

class SignUp extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      inputs: {
        email: '',
        password: ''
      },
      errors: {},
      isValid: false
    }
  }

  handleFieldValidation = (name) => {
    let inputs = this.state.inputs;
    let errors = this.state.errors;
    console.log(inputs)
    console.log(errors)
    if (name === "email") {
      if (inputs["email"] !== undefined) {
        if (isEmpty(inputs["email"])){
          errors["email"] = "Cannot be empty";
          console.log(document.getElementById("email"))
          this.setState({isValid: false})
        } else {
          if (!isEmail(inputs["email"])) {
            errors["email"] = "Email is not valid";
            this.setState({isValid: false})
          } else {
            errors["email"] = ""
            this.setState({isValid: true})
          }
        }
      } else {
        errors["email"] = "Cannot be empty";
        this.setState({isValid: false})
      }
    } else if (name === "password") {
      if (inputs["password"] !== undefined) {
        if (isEmpty(inputs["password"])) {
          errors["password"] = "Cannot be empty";
          this.setState({isValid: false})
        } else {

          const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
          const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");

          if (!mediumRegex.test(inputs["password"])) {
            errors["password"] = "low password";
            this.setState({isValid: false})
          } else if (!strongRegex.test(inputs["password"])) {
            errors["password"] = "medium password";
            this.setState({isValid: false})
          } else {
            errors["password"] = ""
            if (inputs["password"] === inputs["passwordCopy"]) {
              errors["passwordCopy"] = ""
            }
            this.setState({isValid: true})
          }
        }
      } else {
        errors["password"] = "Cannot be empty";
        this.setState({isValid: false})
      }
    } else {
      if (inputs["passwordCopy"] !== undefined) {
        if (isEmpty(inputs["passwordCopy"])) {
          errors["passwordCopy"] = "Cannot be empty";
          this.setState({isValid: false})
        } else {
          if (errors.password !== "") {
            errors["passwordCopy"] = "Password wasn't validated"
            this.setState({isValid: false})
          } else if (inputs.password !== inputs.passwordCopy) {
            errors["passwordCopy"] = "Repeat password!";
            this.setState({isValid: false})
          } else {
            errors["passwordCopy"] = ""
            this.setState({isValid: true})
          }
        }
      } else {
        errors["passwordCopy"] = "Cannot be empty";
        this.setState({isValid: false})
      }
    }
    if (inputs["email"] === '' || inputs["password"] === '' || inputs["passwordCopy"] === '') {
      this.setState({isValid: false})
    }
    this.setState({errors: errors});
  }

  contactSubmit = (e) => {
    e.preventDefault();

    if (this.state.isValid) {
      alert("Form submitted");
    } else {
      this.handleFieldValidation('email')
      this.handleFieldValidation('password')
      this.handleFieldValidation('passwordCopy')
      alert("Validation error")
    }
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs;
    inputs[input] = e.target.value;
    this.setState({input: inputs[input]});
    this.handleFieldValidation(input)
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
// 1. Вилидация input с value type "undefined" только при помощи лог.условия (inputs['email'] !== undefined) ?
  render() {

    const { classes } = this.props;
    console.log(this.state)

    return (
      <Container component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKeyIcon />
          </Avatar>
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
            <div className={classes.errors}>{this.state.errors["email"]}</div>
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
            <div className={classes.errors}>{this.state.errors["password"]}</div>


            <TextField
              onChange={this.handleChange.bind(this, "passwordCopy")}
              value={this.state.inputs["passwordCopy"]}
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
            <div className={classes.errors}>{this.state.errors["passwordCopy"]}</div>
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
              Sign Up
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link to='/reset'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/sign'>
                Have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

//  Где будут храниться логины и пароли пользователей + в каком виде ? (https://habr.com/ru/company/acribia/blog/413157/)
export default withStyles(styles, {withTheme: true})(SignUp)

