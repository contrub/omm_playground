// React components
import React from "react";
import {withRouter} from "react-router";

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

// Local modules
import MonumentService from "../../services/MonumentService";

// Third party modules
import Cookies from "js-cookie";

// Custom styles
import styles from "../../styles/js/monuments/monuments_sheet";

class MonumentsSheet extends React.Component {
    state = {
      monuments: [],
      isLoading: false,
      modal: {
        isOpen: false,
        head: '',
        body: '',
        redirectURL: '/',
        redirectBtnName: 'Home'
      }
    }

    componentDidMount = () => {
      let {modal} = this.state

      this.setState({isLoading: true})

      MonumentService.fetchMonuments()
        .then((res) => {
          this.setState({monuments: res, isLoading: false})
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message

          this.setState({modal: modal, isLoading: false})
          this.changeModalState(true)
        })
    }

    changeModalState = (state) => {
      let {modal} = this.state
      modal["isOpen"] = state

      this.setState({modal: modal})
    }

    removeMonument = (e, id) => {
      let {monuments} = this.state
      let {modal} = this.state

      const monument = monuments.find(monument => monument._id === id)
      const imagePublicID = monument.imageURL.split('/')[7] + '/' + monument.imageURL.split('/')[8].split('.')[0]

      MonumentService.deleteMonument({token: Cookies.get('accessToken'), id: id, imagePublicID: imagePublicID})
        .then(() => {
          // Сервер возвращает 204 статус, но в res.status = error
          monuments = monuments.filter((monument) => monument._id !== id)

          this.setState({monuments: monuments})
        })
        .catch((err) => {
          modal["head"] = 'Delete monument error'
          modal["body"] = err.message

          this.setState({modal: modal})
          this.changeModalState(true)
        })
    }

    render() {
      const {classes} = this.props
      const {isLoading, monuments,  modal} = this.state


      if (isLoading) {
        return (
          <Loading/>
        )
      }

      return (
        <div id="users-sheet">
          <table className="table">
            <thead>
            <tr className={classes.table_row}>
              <th scope="col">
                <div className={classes.table_head}>
                  Name
                </div>
              </th>
              <th scope="col">
                <div className={classes.table_head}>
                  Address
                </div>
              </th>
              <th scope="col">
                <div className={classes.table_head}>
                  Creator
                </div>
              </th>
              <th scope="col">
                <div className={classes.table_head}>
                  ID
                </div>
              </th>
              <th scope="col">
                <div className={classes.table_head}>
                  Image
                </div>
              </th>
              <th scope="col">
                <Button
                  href="/create_monument"
                  variant="contained"
                  color="inherit"
                >
                  <AddIcon/>
                </Button>
              </th>
            </tr>
            </thead>
            <tbody>
            {monuments.map((monument, index) => {
              return (
                <tr key={index} className={classes.table_row}>
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
                      {localStorage.getItem('userRole') === 'superadmin' &&
                        <Button
                          onClick={(e) => this.removeMonument(e, monument._id)}
                          className={classes.edit_btn}
                          value={monument._id}
                          variant="contained"
                          color="secondary"
                        >
                          <DeleteIcon/>
                        </Button>
                      }
                    </div>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
          {!monuments.length &&
            <div className={classes.monuments_state}>
              <h2>MonumentsDB is empty!</h2>
              Let's create <a href={'/create_monument'}>new monument</a>!
            </div>
          }
          {modal.isOpen ?
            <ModalForm
              head={modal.head}
              body={modal.body}
              redirect_url={modal.redirectURL}
              redirect_btn_name={modal.redirectBtnName}
              show={modal.isOpen}
              onHide={() => this.changeModalState(false)}
            /> : null}        </div>
      )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(MonumentsSheet))
