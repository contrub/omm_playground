// React components
import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

// Custom components
import ModalWindow from "../../components/modal";
import Loading from "../loading";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

// Material-UI icons
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";

// Local modules
import MonumentService from "../../services/MonumentService";

// Third party modules
import Cookies from "js-cookie";

// Custom styles
import styles from "../../styles/js/monuments_sheet";

class MonumentsSheet extends React.Component {
    state = {
      monuments: [],
      isLoading: false,
      modal: {
        redirectURL: '',
        head: '',
        body: ''
      }
    }

    componentDidMount = () => {
      let {modal} = this.state

      this.setState({isLoading: true})

      MonumentService.fetchMonuments()
        .then((res) => {
          const monumentsCount = res.length

          if (monumentsCount === 0) {
            modal["head"] = 'Monuments database is empty'
            modal["body"] = 'Please, create new monuments'
            modal["redirectURL"] = '/create_monument'
            this.setState({modal: modal})
          } else {
            this.setState({monuments: res})
          }

          this.setState({isLoading: false})
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message
          this.setState({modal: modal, isLoading: false})
        })
    }

    removeMonument = (e, id) => {
      // const id = e.target.value
      const {monuments} = this.state
      let {modal} = this.state

      console.log(id)

      const monument = monuments.find(monument => monument._id === id)
      const imagePublicID = monument.imageURL.split('/')[7] + '/' + monument.imageURL.split('/')[8].split('.')[0]

      MonumentService.deleteMonument({token: Cookies.get('accessToken'), id: id, imagePublicID: imagePublicID})
        .then((res) => {
          console.log(res)
          // локальное удаление
          MonumentService.fetchMonuments()
            .then((res) => {
              if (!res.length) {
                modal["head"] = 'Monuments database is empty'
                modal["body"] = 'Please, create new monuments'
                modal["redirectURL"] = '/create_monument'
                this.setState({modal: modal})
              }

              this.setState({monuments: res})
            })
        })
      // отловить ошибку
    }

    render() {
      const {monuments} = this.state
      const {isLoading} = this.state
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
                    <div>
                      <Button
                        href={`/edit_monument/${monument._id}`}
                        className={classes.edit_btn}
                        variant="contained"
                        color="primary"
                      >
                        <EditIcon/>
                      </Button>
                      <Button
                        onClick={(e) => this.removeMonument(e, monument._id)}
                        className={classes.edit_btn}
                        value={monument._id}
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
          {this.state.modal.body && <ModalWindow head={this.state.modal.head} body={this.state.modal.body} redirectURL={this.state.modal.redirectURL}/>}
        </div>
      )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(MonumentsSheet))
