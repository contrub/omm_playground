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
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
        {this.props.userRole === 'superadmin' &&
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
      </div>
    )
  }
}

export default Users
