import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CreateIcon from '@material-ui/icons/Create';

import {emailValidation} from "../../helpers/emailValidation"
import {passwordValidation} from "../../helpers/passwordValidation"

import UserService from '../../services/UserService';

import Cookies from "js-cookie"

import styles from "../../styles/js/create_user";

class CreateUser extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      inputs: {
        email: '',
        password: '',
      },
      errors: {},
      isValid: false
    }
  }

  handleFieldValidation = () => {

    document.getElementById('validError').innerText = ""

    this.setState({isValid: emailValidation(this.state.inputs, this.state.errors)})
    this.setState({isValid: passwordValidation(this.state.inputs)})

    document.getElementById('passwordRequirements').hidden = false
  }

  contactSubmit = (e) => {
    e.preventDefault();

    if (this.state.isValid) {
      UserService.createUser({
        email: this.state.inputs.email,
        password: this.state.inputs.password,
        token: Cookies.get('accessToken')
      }).then((res) => {
        if (res.status) {
          document.getElementById('validError').innerText = res.status
        } if (res.message) {
          document.getElementById('validError').innerText = res.message
        } else {
          window.location.href = '/users'
        }
      })
    } else {
      this.handleFieldValidation()
      document.getElementById('validError').innerText = "Validation error"
    }
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
    } else {
      document.getElementById('password').type = 'password'
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Container component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create User
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                onChange={this.handleChange.bind(this, "email")}
                className={classes.field}
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
                className={classes.field}
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
              <ul id='passwordRequirements' hidden>
                <li className={classes.passwordRequirement} id='quantityCheck'>At least 8 characters</li>
                <li className={classes.passwordRequirement} id='numberCheck'>Contains at least 1 number</li>
                <li className={classes.passwordRequirement} id='lowercaseCheck'>Contains at least lowercase letter</li>
                <li className={classes.passwordRequirement} id='uppercaseCheck'>Contains at least uppercase letter</li>
                <li className={classes.passwordRequirement} id='specialCharacterCheck'>Contains a special character (!@#%&)</li>
              </ul>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create
              </Button>
            </form>
            <div id='validError' className={classes.errors}/>
          </div>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(CreateUser)

