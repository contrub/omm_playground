import React from 'react';
import {Link} from "react-router-dom";

import AddBoxIcon from '@material-ui/icons/AddBox';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/css/users.css'

import UserService from '../../services/UserService';

import Cookies from 'js-cookie'

class Users extends React.Component {
  state = {
    users: [],
    status: '',
    currentSort: 'default'
  }

  componentDidMount = () => {
    // скорее всего, всё же есть смысл фильтровать по алфавиту
    UserService.getUsers({token: Cookies.get('accessToken')})
      .then((res) => {
        if (res.message) {
          this.setState({status: res.message})
        } else if (!res.length) {
          this.setState({status: 'UsersDB is empty'})
        } else {
          res.sort((a, b) => {
            if(a.email < b.email) { return -1; }
            if(a.email > b.email) { return 1; }
            return 0;
          })
          this.setState({users: res})
        }
      })
  }

  removeUser = (e) => {
    const email = e.target.value

    UserService.deleteUser({token: Cookies.get('accessToken'), email: email})
      .then((res) => {
        if (res.message) {
          alert(res.message)
        } else {
          window.location.reload()
        }
      })
  }

  onSortChange = () => {
    const { currentSort } = this.state;
    let nextSort;

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'default';
    else if (currentSort === 'default') nextSort = 'down';

    this.setState({
      currentSort: nextSort
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
            {/*<button className="btn btn-warning" value={user.email} onClick={this.removeUser}>*/}
            {/*  <i className="fa fa-trash fa-lg" value={user.email} ></i>*/}
            {/*</button>*/}
          </td>
        </tr>
      )
    })

    return (
      <div>
        {!this.state.users.length ||
          <table className="table">
            <thead>
            <tr>
              <th scope="col" >Email</th>
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
        }
        {this.state.users.length ||
          <section id="wrapper" className="container-fluid">
            <div className="error-box">
              <div className="error-body text-center">
                <h3>{this.state.status}</h3>
              </div>
            </div>
          </section>
        }
      </div>
    )
  }
}

export default Users
