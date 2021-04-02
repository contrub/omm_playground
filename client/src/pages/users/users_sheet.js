// React components
import React from 'react';
import {Link} from "react-router-dom";

// Custom components
import ModalWindow from "../../components/modal";
import Loading from "../loading";

// Material-UI icons
import AddBoxIcon from '@material-ui/icons/AddBox';

// Third party modules
import Cookies from "js-cookie";

// Local modules
import UserService from "../../services/UserService";

// Custom styles
import "../../styles/css/users_sheet.css";

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
        const usersCount = res.length
        // Если не будет пользователей вовсе, то как человек получил доступ к данной странице ?
        if (usersCount === 0) {
          modal["head"] = 'Users database is empty'
          modal["body"] = 'Please, create new users'
          modal["redirectURL"] = '/create_user'
          this.setState({modal: modal})
        } else {
          this.setState({users: res})
        }

        this.setState({isLoading: false})
      })
      .catch((err) => {
        modal["head"] = 'Server error'
        modal["body"] = err.message
        modal["redirectURL"] = '/'
        this.setState({modal: modal})
      })
  }

  render() {
    const {isLoading} = this.state
    const {users} = this.state

    if (isLoading) {
      return (
        <Loading/>
      )
    }

    return (
      <div>
        <table className="table">
            <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">UserRole</th>
              <th scope="col">ID</th>
              <th scope="col">Status</th>
              <th scope="col">
                <Link to="/create_user">
                  <AddBoxIcon/>
                </Link>
              </th>
            </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.userRole}</td>
                    <td>{user._id}</td>
                    <td>
                      {user.status === 'active' ?
                        <button className="btn btn-success" disabled>
                          Active
                        </button>
                        :
                        <button className="btn btn-danger" disabled>
                          Disable
                        </button>
                      }
                    </td>
                    <td>
                      <Link to={`/users/${user.email}`}>
                        <button className="btn btn-secondary">
                          <i className="fa fa-edit fa-lg" ></i>
                        </button>
                      </Link>
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

export default UsersSheet
