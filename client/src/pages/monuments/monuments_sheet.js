// React components
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import React from 'react';

// Custom components
import ModalWindow from "../../components/modal";

// Material-UI icons
import AddBoxIcon from "@material-ui/icons/AddBox";

// Local functions
import MonumentService from "../../services/MonumentService";

// Custom styles
import styles from "../../styles/js/monuments_sheet";
import withStyles from "@material-ui/core/styles/withStyles";

class MonumentsSheet extends React.Component {
    state = {
      monuments: [],
      modal: {
        head: '',
        body: ''
      }
    }

    componentDidMount = () => {
      let {modal} = this.state

      MonumentService.fetchMonuments()
        .then((res) => {
          const monumentsCount = res.length

          if (monumentsCount === 0) {
            modal["head"] = 'Monuments database is empty'
            modal["body"] = 'Please, create new monuments'
            this.setState({modal: modal})
          } else {
            this.setState({monuments: res})
          }
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message()
          this.setState({modal: modal})
        })
    }

    render() {
      const {classes} = this.props
      const {monuments} = this.state

      return (
        <div>
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
                        className={classes.image}
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
          {this.state.modal.body && <ModalWindow head={this.state.modal.head} body={this.state.modal.body}/>}
        </div>
      )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(MonumentsSheet))
