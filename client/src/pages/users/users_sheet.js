// React components
import React from 'react';

// Custom components
import ModalWindow from "../../components/modal";
import Loading from "../loading";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

// Material-UI icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

// Third party modules
import Cookies from "js-cookie";

// Local modules
import UserService from "../../services/UserService";

// Custom styles
import styles from "../../styles/js/users/users_sheet";

class UsersSheet extends React.Component {
  state = {
    users: [],
    isLoading: false,
    modal: {
      head: '',
      body: ''
    }
  }

  componentDidMount = () => {
    let {modal} = this.state

    this.setState({isLoading: true})

    UserService.getUsers({token: Cookies.get('accessToken')})
      .then((res) => {
        this.setState({users: res, isLoading: false})
      })
      .catch((err) => {
        modal["head"] = 'Server error'
        modal["body"] = err.message
        modal["redirectURL"] = '/'
        this.setState({modal: modal})
      })
  }

  removeUser = (e, email) => {
    let {users} = this.state
    let {modal} = this.state

    UserService.deleteUser({token: Cookies.get('accessToken'), email: email})
      .then(() => {
        users = users.filter((user) => user.email !== email)

        this.setState({users: users})
      })
      .catch((e) => {
        modal["head"] = 'Delete user error'
        modal["body"] = 'Please, check access rights'
        this.setState({modal: modal})
      })
  }

  render() {
    const {isLoading} = this.state
    const {users} = this.state
    const {classes} = this.props

    if (isLoading) {
      return (
        <Loading/>
      )
    }

    return (
      <div>
        <table className="table">
          <thead>
            <tr className={classes.table_row}>
              <th scope="col">
                <div className={classes.table_head}>
                  Email
                </div>
              </th>
              <th scope="col">
                <div className={classes.table_head}>
                  UserRole
                </div>
              </th>
              <th scope="col">
                <div className={classes.table_head}>
                  ID
                </div>
              </th>
              <th scope="col">
                <div className={classes.table_head}>
                  Status
                </div>
              </th>
              <th scope="col">
                <Button
                  href="/create_user"
                  variant="contained"
                  color="inherit"
                >
                  <AddIcon/>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index} className={classes.table_row}>
                <td>
                  <div className={classes.table_cell}>
                    {user.email}
                  </div>
                </td>
                <td>
                  <div className={classes.table_cell}>
                    {user.userRole}
                  </div>
                </td>
                <td>
                  <div className={classes.table_cell}>
                    {user._id}
                  </div>
                </td>
                <td>
                  <div className={classes.table_cell}>
                    <Button
                      className={user.status === 'active' ? classes.active_user_btn : classes.disable_user_btn}
                      variant="contained"
                      disabled
                    >
                      {user.status === 'active' ? 'Active' : 'Disable'}
                    </Button>
                  </div>
                </td>
                <td>
                  <div>
                    <Button
                      href={`/edit_user/${user.email}`}
                      variant="contained"
                      color="primary"
                    >
                      <EditIcon/>
                    </Button>
                    <Button
                      onClick={(e) => this.removeUser(e, user.email)}
                      className={classes.edit_btn}
                      variant="contained"
                      color="secondary"
                    >
                      <DeleteIcon/>
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
        {this.state.modal.body && <ModalWindow head={this.state.modal.head} body={this.state.modal.body}/>}
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(UsersSheet)
