// React components
import React from 'react';

// Custom components
import ModalForm from "../../components/modal";
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
    isModalOpen: false,
    modal: {
      head: '',
      body: '',
      redirectURL: '/',
      redirectBtnName: 'Home'
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
        modal["head"] = "Server error"
        modal["body"] = err.message

        this.setState({modal: modal})
        this.changeModalState(true)
      })
  }

  changeModalState = () => {
    let {isModalOpen} = this.state

    this.setState({isModalOpen: !isModalOpen})
  }

  resetModalInfo = () => {
    let {modal} = this.state

    modal["head"] = ""
    modal["body"] = ""
    modal["redirectBtnName"] = ""
    modal["redirectURL"] = ""
    modal["closeBtnName"] = ""
    modal["function"] = ""

    this.setState({modal: modal})
  }

  handleRemove = (e, email) => {
    let {modal} = this.state

    this.resetModalInfo()

    modal["head"] = `Delete ${email}`
    modal["body"] = "Are you sure about that ?"
    modal["redirectBtnName"] = "Yes"
    modal["closeBtnName"] = "No"
    modal["function"] = () => this.removeUser(email)

    this.changeModalState()
  }

  removeUser = (email) => {
    let {users, modal} = this.state

    UserService.deleteUser({token: Cookies.get('accessToken'), email: email})
      .then((res) => {
        if (res.message) {
          this.resetModalInfo()

          modal["head"] = "Delete user error"
          modal["body"] = "Check your permissions"
          modal["redirectBtnName"] = "Home"
          modal["redirectURL"] = "/"

          this.setState({modal: modal})
          this.changeModalState(true)
        } else {
          users = users.filter((user) => user.email !== email)

          this.setState({users: users})
        }
      })
      .catch((err) => {
        this.resetModalInfo()

        modal["head"] = "Delete user error"
        modal["body"] = err.message
        modal["redirectBtnName"] = "Home"
        modal["redirectURL"] = "/"

        this.setState({modal: modal})
        this.changeModalState(true)
      })
  }

  render() {
    const {classes} = this.props
    const {users, isLoading, isModalOpen, modal} = this.state

    if (isLoading) {
      return (
        <Loading/>
      )
    }

    return (
      <div>
        <table className="table">
          <thead>
            <tr className={classes.tableRow}>
              <th scope="col">
                <div className={classes.tableHead}>
                  Email
                </div>
              </th>
              <th scope="col">
                <div className={classes.tableHead}>
                  UserRole
                </div>
              </th>
              <th scope="col">
                <div className={classes.tableHead}>
                  ID
                </div>
              </th>
              <th scope="col">
                <div className={classes.tableHead}>
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
              <tr key={index} className={classes.tableRow}>
                <td>
                  <div className={classes.tableCell}>
                    {user.email}
                  </div>
                </td>
                <td>
                  <div className={classes.tableCell}>
                    {user.userRole}
                  </div>
                </td>
                <td>
                  <div className={classes.tableCell}>
                    {user._id}
                  </div>
                </td>
                <td>
                  <div className={classes.tableCell}>
                    <Button
                      className={user.status === 'active' ? classes.activeBtn : classes.disableBtn}
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
                      onClick={(e) => this.handleRemove(e, user.email)}
                      className={classes.deleteBtn}
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
        {isModalOpen ?
          <ModalForm
            head={modal.head}
            body={modal.body}
            redirect_url={modal.redirectURL}
            redirect_btn_name={modal.redirectBtnName}
            close_btn_name={modal.closeBtnName}
            show={isModalOpen}
            function={modal.function}
            onHide={() => this.changeModalState(false)}
          /> : null}
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(UsersSheet)
