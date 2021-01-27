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
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import UserService from '../services/UserService';

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
  passwordCheck: {
    color: 'red',
    fontFamily: 'Gill Sans',
    fontSize: '17px'
  }
});

class SignUp extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      inputs: {
        email: '',
        password: '',
        passwordCopy: ''
      },
      errors: {},
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

  handleFieldValidation = (name) => {
    let inputs = this.state.inputs;
    let errors = this.state.errors;
    const minCharactersRegex = new RegExp("^(?=.{8,})")
    const numberCheckRegex = new RegExp("^(?=.*[0-9])")
    const lowercaseCheckRegex = new RegExp("^(?=.*[a-z])")
    const uppercaseCheckRegex = new RegExp("^(?=.*[A-Z])")
    const specialCheckRegex = new RegExp("^(?=.*[!@#%&])")

    document.getElementById('validError').innerText = ""

    if (name === "email") {
      if (inputs["email"] !== undefined) {
        if (isEmpty(inputs["email"])){
          errors["email"] = "Cannot be empty";
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
    }

    document.getElementById('passwordRequirements').hidden = false
    if (inputs["password"] !== undefined) {
      if (minCharactersRegex.test(inputs["password"])) {
        document.getElementById('quantityCheck').style.color = 'green'
        this.setState({isValid: true})
        errors["passwordCopy"] = "";
      } else {
        document.getElementById('quantityCheck').style.color = 'red'
        this.setState({isValid: false})
        errors["passwordCopy"] = "Password wasn't validated"
      }
      if (numberCheckRegex.test(inputs["password"])) {
        document.getElementById('numberCheck').style.color = 'green'
        this.setState({isValid: true})
        errors["passwordCopy"] = "";
      } else {
        document.getElementById('numberCheck').style.color = 'red'
        this.setState({isValid: false})
        errors["passwordCopy"] = "Password wasn't validated"
      }
      if (lowercaseCheckRegex.test(inputs["password"])) {
        document.getElementById('lowercaseCheck').style.color = 'green'
        this.setState({isValid: true})
        errors["passwordCopy"] = "";
      } else {
        document.getElementById('lowercaseCheck').style.color = 'red'
        this.setState({isValid: false})
        errors["passwordCopy"] = "Password wasn't validated"
      }
      if (uppercaseCheckRegex.test(inputs["password"])) {
        document.getElementById('uppercaseCheck').style.color = 'green'
        this.setState({isValid: true})
        errors["passwordCopy"] = "";
      } else {
        document.getElementById('uppercaseCheck').style.color = 'red'
        this.setState({isValid: false})
        errors["passwordCopy"] = "Password wasn't validated"
      }
      if (specialCheckRegex.test(inputs["password"])) {
        document.getElementById('specialCharacterCheck').style.color = 'green'
        this.setState({isValid: true})
        errors["passwordCopy"] = "";
      } else {
        document.getElementById('specialCharacterCheck').style.color = 'red'
        this.setState({isValid: false})
        errors["passwordCopy"] = "Password wasn't validated"
      } if (minCharactersRegex.test(inputs["password"]) && numberCheckRegex.test(inputs["password"]) && numberCheckRegex.test(inputs["password"]) && lowercaseCheckRegex.test(inputs["password"]) && uppercaseCheckRegex.test(inputs["password"]) && specialCheckRegex.test(inputs["password"])) {
        document.getElementById('passwordRequirements').hidden = true
      }

      if (inputs["passwordCopy"] !== undefined) {
        if (isEmpty(inputs["passwordCopy"])) {
          errors["passwordCopy"] = "Cannot be empty";
          this.setState({isValid: false})
        } else {
          if (errors.password !== "") {
            errors["passwordCopy"] = "Password wasn't validated"
            this.setState({isValid: false})
          }
          if (inputs.password !== inputs.passwordCopy) {
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

    if (inputs["email"] === '' || inputs["password"] === '' || inputs["passwordCopy"] === '') {

      this.setState({isValid: false})

    }

    this.setState({errors: errors});
  }}

  contactSubmit = (e) => {

    e.preventDefault();

    if (this.state.isValid) {

      UserService.createUser({
        email: this.state.inputs.email,
        password: this.state.inputs.password
      }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          document.getElementById('validError').innerText = "User with this email already exists!"
        } else {
          document.cookie = `accessToken=${res.accessToken.split('Bearer')[1]}`
          document.cookie = `refreshToken=${res.refreshToken.split('Bearer')[1]}`
          // window.location.href = '/monuments'
        }
      })
      // UserService.getUser({email: this.state.inputs.email})
      //   .then(res => {
      //     if (!res.ok) {
      //       UserService.createUser({
      //         email: this.state.inputs.email,
      //         password: this.state.inputs.password
      //       }).then((res) => {
      //         console.log(res)
      //         document.cookie = `accessToken=${res.accessToken}`
      //         document.cookie = `refreshToken=${res.refreshToken}`
      //       })
      //       // window.location.href = '/monuments'
      //     } else {
      //       document.getElementById('validError').innerText = "User with this email already exists!"
      //     }
      //   })

    } else {

      this.handleFieldValidation('email')
      this.handleFieldValidation('password')
      this.handleFieldValidation('passwordCopy')
      document.getElementById('validError').innerText = "Validation error"
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

  render() {

    const { classes } = this.props

    return (
      <Container component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
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
            <ul id='passwordRequirements' hidden>
              <li className={classes.passwordCheck} id='quantityCheck'>At least 8 characters</li>
              <li className={classes.passwordCheck} id='numberCheck'>Contains at least 1 number</li>
              <li className={classes.passwordCheck} id='lowercaseCheck'>Contains at least lowercase letter</li>
              <li className={classes.passwordCheck} id='uppercaseCheck'>Contains at least uppercase letter</li>
              <li className={classes.passwordCheck} id='specialCharacterCheck'>Contains a special character (!@#%&)</li>
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
            <div className={classes.errors}>{this.state.errors["passwordCopy"]}</div>
            {/*<Checkbox*/}
            {/*  icon={<VisibilityIcon/>}*/}
            {/*  checkedIcon={<VisibilityOffIcon/>}*/}
            {/*  onClick={this.showPassword}*/}
            {/*  className={classes.showPass}*/}
            {/*/>*/}
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
              <Link to='/reset'>
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
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(SignUp)

