import React from "react";
import UserService from '../services/UserSevice'

class Users extends React.Component {

  state = {
    users: []
  }

  componentDidMount = () => {
    UserService.getUsers()
      .then(res => {
        this.setState({
          users: res
        })
        console.log(this.state.users)
      })
  }

  render() {
    return (
      <div>
        <h1>Users Sheet</h1>
        <p id='test'>Users</p>
      </div>
    )
  }
}

export default Users
