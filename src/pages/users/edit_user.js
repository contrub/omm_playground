// React components
import React from "react";
import {withRouter} from "react-router";

// Custom components
import ModalForm from "../../components/modal";
import Loading from "../loading";

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

// Third party modules
import Cookies from "js-cookie";

// Local modules
import UserService from '../../services/UserService';

// Custom styles
import styles from "../../styles/js/users/edit_user";

class EditUser extends React.Component {
  state = {
    user: [],
    isLoading: false,
    inputs: {
      userRole: '',
      status: ''
    },
    selects: {
      userRole: 10,
      status: 10
    },
    selects_facilities: {
      role: {10: 'viewer', 20: 'admin', 30: 'superadmin'},
      status: {10: 'active', 20: 'disable'}
    },
    isModalOpen: false,
    modal: {
      head: '',
      body: '',
      redirectBtnName: 'Monuments-sheet',
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

    this.setState({isLoading: true})

    UserService.getUser({email: email, token: Cookies.get('accessToken')})
      .then((res) => {
        const email = res[0].email

        if (!email) {
          modal["head"] = "Something going wrong"
          modal["body"] = res.message

          this.setState({modal: modal})
          this.changeModalState(true)
        } else {
          const roleValue =  rolesObjectKeys[rolesObjectValues.indexOf(res[0].userRole)]
          const statusValue = statusObjectKeys[statusObjectValues.indexOf(res[0].status)]

          this.setState({user: res[0], inputs: {email: res[0].email}, selects: {userRole: roleValue, status: statusValue}, isLoading: false})
        }
      })
      .catch((err) => {
        modal["head"] = "Server error"
        modal["body"] = err.message

        this.setState({modal: modal, isLoading: false})
        this.changeModalState()
      })
  }

  changeModalState = () => {
    let {isModalOpen} = this.state

    this.setState({isModalOpen: !isModalOpen})
  }

  contactSubmit = (e) => {
    let {inputs, modal} = this.state

    e.preventDefault()

    inputs['token'] = Cookies.get('accessToken')

    this.setState({inputs: inputs})

    Object.keys(this.state.inputs).forEach((key) => (this.state.inputs[key] === "") && delete this.state.inputs[key]);

    UserService.updateUser(this.state.inputs)
      .then((res) => {
        window.location.href = '/users_sheet'
      })
      .catch((err) => {
        modal["body"] = "Server error"
        modal["head"] = err.message

        this.setState({modal: modal})
        this.changeModalState()
      })
  }

  handleChange = (input, e) => {
    let {selects, selects_facilities, inputs} = this.state

    if (input === "userRole") {
      selects[input] = e.target.value
      inputs[input] = selects_facilities.role[`${e.target.value}`]
    } else if (input === "status") {
      selects[input] = e.target.value
      inputs[input] = selects_facilities.status[`${e.target.value}`]
    }

    this.setState({input: inputs[input], selects: selects})
  }

  render() {
    const {classes} = this.props
    const {selects, isLoading, isModalOpen, modal} = this.state

    if (isLoading) {
      return (
        <Loading/>
      )
    }

    return (
      <Container id="edit-page" component="main" maxWidth="xs" onSubmit={this.contactSubmit.bind(this)}>
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}/>
          <Typography component="h1" variant="h5">
            {this.state.user.email}
          </Typography>
          <form className={classes.form} noValidate>
            <div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">UserRole</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="UserRole"
                  value={selects.userRole}
                  onChange={this.handleChange.bind(this, "userRole")}
                >
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
                  value={selects.status}
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
              className={classes.editBtn}
            >
              Edit User
            </Button>
          </form>
        </div>
        {isModalOpen ?
          <ModalForm
            head={modal.head}
            body={modal.body}
            redirect_url={modal.redirectURL}
            redirect_btn_name={modal.redirectBtnName}
            show={isModalOpen}
            onHide={() => this.changeModalState(false)}
          /> : null}
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(EditUser))
