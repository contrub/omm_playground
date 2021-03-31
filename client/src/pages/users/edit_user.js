// React components
import React from 'react';
import {withRouter} from "react-router";

// Custom components
import ModalWindow from "../../components/modal";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";

// Custom styles
import styles from "../../styles/js/edit_user";

// Local functions
import UserService from '../../services/UserService';

// Third party functions
import Cookies from "js-cookie";

class EditUser extends React.Component {
  state = {
    user: [],
    inputs: {
      userRole: '',
      status: ''
    },
    selects: {
      userRole: 0,
      status: 0
    },
    selects_facilities: {
      role: {10: 'viewer', 20: 'admin', 30: 'superadmin'},
      status: {10: 'active', 20: 'disable'}
    },
    modal: {
      head: '',
      body: '',
      redirectURL: '/users_sheet'
    }
  }

  componentDidMount () {
    let {modal} = this.state
    const email = this.props.match.params.email
    const rolesObjectKeys = Object.keys(this.state.selects_facilities.role)
    const rolesObjectValues = Object.values(this.state.selects_facilities.role)
    const statusObjectKeys = Object.keys(this.state.selects_facilities.status)
    const statusObjectValues = Object.values(this.state.selects_facilities.status)

    UserService.getUser({email: email, token: Cookies.get('accessToken')})
      .then((res) => {
        const email = res[0].email

        if (email === undefined) {
          modal["head"] = 'Something going wrong'
          modal["body"] = 'Get user error'
          this.setState({modal: modal})
        } else {
          const roleValue =  rolesObjectKeys[rolesObjectValues.indexOf(res[0].userRole)]
          const statusValue = statusObjectKeys[statusObjectValues.indexOf(res[0].status)]

          this.setState({user: res[0], inputs: {email: res[0].email}, selects: {userRole: roleValue, status: statusValue}})
        }
      })
      .catch((err) => {
        modal["head"] = 'Server error'
        modal["body"] = err.message
        this.setState({modal: modal})
      })
  }

  contactSubmit = (e) => {
    let {modal} = this.state
    e.preventDefault()

    const inputs = this.state.inputs
    inputs['token'] = Cookies.get('accessToken')
    this.setState({inputs: inputs})

    Object.keys(this.state.inputs).forEach((key) => (this.state.inputs[key] === "") && delete this.state.inputs[key]);
    UserService.updateUser(this.state.inputs)
      .then(() => window.location.href = '/users_sheet')
      .catch((err) => {
        modal["body"] = 'Server error'
        modal["head"] = err.message
        this.setState({modal: modal})
      })
  }

  removeUser = () => {
    const email = this.state.user.email
    let {modal} = this.state

    UserService.deleteUser({email: email, token: Cookies.get('accessToken')})
      .then(() => window.location.href = '/users_sheet')
      .catch((err) => {
        modal["body"] = 'Server error'
        modal["head"] = err.message
        this.setState({modal: modal})
      })
  }

  handleChange = (input, e) => {
    let selects = this.state.selects
    let inputs = this.state.inputs

    if (input === "userRole") {
      selects[input] = e.target.value
      inputs[input] = this.state.selects_facilities.role[`${e.target.value}`]
      this.setState({input: inputs[input], selects: selects})
    } else if (input === "status") {
      selects[input] = e.target.value
      inputs[input] = this.state.selects_facilities.status[`${e.target.value}`]
      this.setState({input: inputs[input], selects: selects})
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
            <div>
              <FormControl variant="outlined" className={classes.form_control}>
                <InputLabel id="demo-simple-select-outlined-label">UserRole</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="UserRole"
                  value={this.state.selects.userRole ?? 10}
                  defaultValue={10}
                  onChange={this.handleChange.bind(this, "userRole")}
                >
                  <MenuItem value={10}>viewer</MenuItem>
                  <MenuItem value={20}>admin</MenuItem>
                  <MenuItem value={30}>superadmin</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.form_control}>
                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Status"
                  value={this.state.selects.status ?? ''}
                  onChange={this.handleChange.bind(this, "status")}
                >
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
              className={classes.edit_btn}
            >
              Edit User
            </Button>
            <Button
              onClick={this.removeUser}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.remove_btn}
            >
              Remove User
            </Button>
          </form>
        </div>
        {this.state.modal.head && <ModalWindow head={this.state.modal.head} body={this.state.modal.body} redirectURL={this.state.modal.redirectURL}/>}
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(EditUser))
