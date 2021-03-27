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

class EditMonument extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: [],
      inputs: {
        password: '',
        userRole: '',
        status: ''
      },
      selects: {
        userRole: 0,
        status: 0
      },
      role: {10: 'viewer', 20: 'admin', 30: 'superadmin', 0: ''},
      status: {10: 'active', 20: 'disable', 0: ''},
      isValid: true
    }
  }

  handleFieldValidation = () => {
    let inputs = this.state.inputs;

    document.getElementById('validError').innerText = ""
    this.setState({isValid: passwordValidation(inputs)})
    if (inputs.password) {
      document.getElementById('passwordRequirements').hidden = false
    } else {
      document.getElementById('passwordRequirements').hidden = true
    }
  }

  componentDidMount () {
    const email = this.props.match.params.email
    const rolesObjectKeys = Object.keys(this.state.role)
    const rolesObjectValues = Object.values(this.state.role)
    const statusObjectKeys = Object.keys(this.state.status)
    const statusObjectValues = Object.values(this.state.status)

    UserService.getUser({email: email, token: Cookies.get('accessToken')})
      .then((res) => {
        if (res.message) {
          // понятное дело, нужно переделать для различных ошибок
          alert(res.message)
        } else {
          const roleValue =  rolesObjectKeys[rolesObjectValues.indexOf(res[0].userRole)]
          const statusValue = statusObjectKeys[statusObjectValues.indexOf(res[0].status)]

          this.setState({user: res[0], inputs: {email: res[0].email}, selects: {userRole: roleValue, status: statusValue}})
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
    let selects = this.state.selects
    let inputs = this.state.inputs

    if (input === "password") {
      inputs[input] = e.target.value;
      this.setState({input: inputs[input]});
      this.handleFieldValidation()
    } else if (input === "userRole") {
      selects[input] = e.target.value
      inputs[input] = this.state.role[`${e.target.value}`]
      this.setState({input: inputs[input], selects: selects})
    } else if (input === "status") {
      selects[input] = e.target.value
      inputs[input] = this.state.status[`${e.target.value}`]
      this.setState({input: inputs[input], selects: selects})
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
      <Container id="edit-page" component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}/>
          <Typography component="h1" variant="h5">
            {this.state.user.email || "Loading ..."}
          </Typography>
          <form className={classes.form} noValidate>
            {/*<input className="form-control" type="text" placeholder={this.state.user.email} readOnly/>*/}
            <TextField
              onChange={this.handleChange.bind(this, "password")}
              value={this.state.inputs["password"] || ""}
              InputProps={{
                endAdornment: (
                  <Checkbox
                    icon={<VisibilityIcon/>}
                    checkedIcon={<VisibilityOffIcon/>}
                    onClick={this.showPassword}
                  />
                )
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
              <li className={classes.passRequirement} id='quantityCheck'>At least 8 characters</li>
              <li className={classes.passRequirement} id='numberCheck'>Contains at least 1 number</li>
              <li className={classes.passRequirement} id='lowercaseCheck'>Contains at least lowercase letter</li>
              <li className={classes.passRequirement} id='uppercaseCheck'>Contains at least uppercase letter</li>
              <li className={classes.passRequirement} id='specialCharacterCheck'>Contains a special character (!@#%&)</li>
            </ul>
            <div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">UserRole</InputLabel>
                <Select
                  className={classes.selValue}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="UserRole"
                  value={this.state.selects.userRole ?? "0"}
                  onChange={this.handleChange.bind(this, "userRole")}
                >
                  <MenuItem value={0} className={classes.optValue}>
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
                  className={classes.selValue}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Status"
                  value={this.state.selects.status ?? "0"}
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
            <div id='validError' className={classes.errors}/>
          </form>
        </div>
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(EditMonument))
