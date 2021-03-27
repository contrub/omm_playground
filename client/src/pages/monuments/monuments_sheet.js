import React from 'react';
import MonumentService from '../../services/MonumentService'
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import AddBoxIcon from "@material-ui/icons/AddBox";

import '../../styles/css/monuments_sheet.css'

class MonumentsSheet extends React.Component {

    state = {
      monuments: []
    }

    componentDidMount = () => {
      MonumentService.fetchMonuments()
        .then((res) => {
          this.setState({monuments: res})
        })
    }

    render() {
      const monuments = this.state.monuments.map((monument, index) => {
        // думаю, стоит переделать : возвращать таблицу, а не элементы таблицы
        return (
          <tr key={index}>
            <td>
              <div>
                {monument.name}
              </div>
            </td>
            <td>
              <div>
                {monument.address}
              </div>
            </td>
            <td>
              <div>
                {monument.creator}
              </div>
            </td>
            <td>
              <div>
                {monument.registryNumber}
              </div>
            </td>
            <td>
              <div>
                <img src={monument.imageURL}/>
              </div>
            </td>
            <td>
              <Link to={`/edit_monument/${monument._id}`}>
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
          {!this.state.monuments.length ||
          <table className="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Creator</th>
              <th scope="col">RegistryNumber</th>
              <th scope="col">Image</th>
              <th scope="col">
                <Link to="/create_monument">
                  <AddBoxIcon/>
                </Link>
              </th>
            </tr>
            </thead>
            <tbody>
              {monuments}
            </tbody>
          </table>
          }
          {this.state.monuments.length ||
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

export default withRouter(MonumentsSheet)
