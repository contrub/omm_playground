// React components
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import React from 'react';

// Material-UI icons
import AddBoxIcon from "@material-ui/icons/AddBox";

// Local functions
import MonumentService from "../../services/MonumentService";

// Custom styles
import "../../styles/css/monuments_sheet.css";

class MonumentsSheet extends React.Component {

    state = {
      monuments: [],
      isServerError: false
    }

    componentDidMount = () => {
      MonumentService.fetchMonuments()
        .then((res) => {
          const monumentsCount = res.length

          if (monumentsCount === undefined) {
            this.setState({isServerError: true})
          } else {
            this.setState({monuments: res})
          }
        })
        .catch((e) => {
          this.setState({isServerError: true})
        })
    }

    render() {
      const {monuments} = this.state

      return (
        <div>
          {this.state.isServerError ||
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Creator</th>
                  <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">
                    <Link to="/create_monument">
                      <AddBoxIcon/>
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {monuments.map((monument, index) => {
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
                          {monument._id}
                        </div>
                      </td>
                      <td>
                        <div>
                          <img
                            src={monument.imageURL}
                            alt="monument_image"
                          />
                        </div>
                      </td>
                      <td>
                        <Link to={`/edit_monument/${monument._id}`}>
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
          }
          {!this.state.isServerError ||
            <section id="wrapper" className="container-fluid">
              <div className="error-box">
                <div className="error-body text-center">
                  <h3>Internal Server Error</h3>
                  <p>Status code: 500</p>
                </div>
              </div>
            </section>
          }
        </div>
      )
    }
}

export default withRouter(MonumentsSheet)
