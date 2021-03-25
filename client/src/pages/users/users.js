import React from 'react';
import {Link} from "react-router-dom";

import AddBoxIcon from '@material-ui/icons/AddBox';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/css/users.css'

import UserService from '../../services/UserService';

import Cookies from 'js-cookie'

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount = () => {
    // скорее всего, всё же есть смысл фильтровать по алфавиту
    UserService.getUsers({token: Cookies.get('accessToken')})
      .then((res) => {
        if (res.message === undefined) {
          res.sort((a, b) => (a.userRole > b.userRole) ? 1 : ((b.userRole > a.userRole) ? -1 : 0))
          this.setState({users: res})
        }
      })
  }


  render() {
    const users = this.state.users.map((user, index) => {
      // думаю, стоит переделать : возвращать таблицу, а не элементы таблицы
      return (
        <tr key={index}>
          <td>{user.email}</td>
          <td>{user.userRole}</td>
          <td>{user._id}</td>
          <td>
            {user.status === 'active' &&
              <button className="btn btn-success" disabled>
                Active
              </button>
            }
            {user.status === 'disable' &&
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
            {/*<button className="btn btn-warning" onClick={this.removeUser}>*/}
            {/*  <i className="fa fa-trash fa-lg" ></i>*/}
            {/*</button>*/}
          </td>
        </tr>
      )
    })

    return (
      <div>
        <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  Email
                </th>
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
              {users}
            </tbody>
        </table>
      </div>
    )
  }
}

export default Users
