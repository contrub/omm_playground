import React from 'react';
import {withRouter} from "react-router";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import withStyles from "@material-ui/core/styles/withStyles";

import styles from '../../styles/js/edit_user'
import 'bootstrap/dist/css/bootstrap.min.css';

import {passwordValidation} from "../../helpers/passwordValidation"

import UserService from '../../services/UserService';

import Cookies from "js-cookie";

class EditUser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: [],
      inputs: {
        password: '',
        userRole: ''
      },
      roles: {10: 'viewer', 20: 'admin', 30: 'superadmin', 0: ''},
      status: {10: 'active', 20: 'disable', 0: ''},
      isValid: true
    }
  }

  handleFieldValidation = () => {
    let inputs = this.state.inputs;

    document.getElementById('validError').innerText = ""
    this.setState({isValid: passwordValidation(inputs)})
    document.getElementById('passwordRequirements').hidden = false
  }

  componentDidMount () {
    const email = this.props.match.params.email

    console.log(email)

    UserService.getUser({email: email, token: Cookies.get('accessToken')})
      .then((res) => {
        if (res.message === undefined) {
          this.setState({user: res[0], inputs: {email: res[0].email, userRole: "", password: "", status: ""}})
        }
      })
  }

  contactSubmit = (e) => {

    e.preventDefault();

    if (this.state.isValid) {
      const inputs = this.state.inputs
      inputs['token'] = Cookies.get('accessToken')
      this.setState({inputs: inputs})

      Object.keys(this.state.inputs).forEach((key) => (this.state.inputs[key] === "") && delete this.state.inputs[key]);

      UserService.updateUser(this.state.inputs)
          .then(() => window.location.href = '/users')

    } else {
      document.getElementById('validError').innerText = 'ValidationError'
    }
  }

  removeUser = () => {
    const email = this.state.user.email

    UserService.deleteUser({email: email, token: Cookies.get('accessToken')})
      .then(() => window.location.href = '/users')
  }

  handleChange = (input, e) => {
    if (input === "password") {
      let inputs = this.state.inputs;
      inputs[input] = e.target.value;
      this.setState({input: inputs[input]});
      this.handleFieldValidation()
    } else if (input === "userRole") {
      let inputs = this.state.inputs;
      inputs[input] = this.state.roles[`${e.target.value}`]
      this.setState({input: inputs[input]})
    } else {
      let inputs = this.state.inputs;
      inputs[input] = this.state.status[`${e.target.value}`]
      this.setState({input: inputs[input]})
    }
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
      <Container id="login-page" component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
        <CssBaseline/>
        {this.props.userRole === 'superadmin' &&
          <div className={classes.paper}>
          <Avatar className={classes.avatar}/>
          <Typography component="h1" variant="h5">
          Edit user
          </Typography>
          <form className={classes.form} noValidate>
            <input className="form-control" type="text" placeholder={this.state.user.email + ' [' + this.state.user.userRole + ']' + ' {' + this.state.user.status + '}'} readOnly/>
            <TextField
            onChange={this.handleChange.bind(this, "password")}
            value={this.state.inputs["password"] || ""}
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
            <div id='validError' className={classes.errors}/>
            <div className={classes.select}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">UserRole</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="UserRole"
                  defaultValue={0}
                  onChange={this.handleChange.bind(this, "userRole")}
                >
                  <MenuItem value={0}>
                    <em>Without changes</em>
                  </MenuItem>
                  <MenuItem value={10}>viewer</MenuItem>
                  <MenuItem value={20}>admin</MenuItem>
                  <MenuItem value={30}>superadmin</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Status"
                  defaultValue={0}
                  onChange={this.handleChange.bind(this, "status")}
                >
                  <MenuItem value={0}>
                    <em>Without changes</em>
                  </MenuItem>
                  <MenuItem value={10}>Active</MenuItem>
                  <MenuItem value={20}>Disable</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.editBtn}
            >
              Edit User
            </Button>
            <Button
              onClick={this.removeUser}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.removeBtn}
            >
              Remove User
            </Button>
          </form>
          </div>
        }
        {this.props.userRole !== 'superadmin' &&
          <section id="wrapper" className="container-fluid">
            <div className="error-box">
              <div className="error-body text-center">
                <h1 className="text-danger">403</h1>
                <h3>Forbidden</h3>
              </div>
            </div>
          </section>
        }
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(EditUser))
