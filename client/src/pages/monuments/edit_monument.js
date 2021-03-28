// React components
import React from "react";
import {withRouter} from "react-router";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

// Material-UI icons
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

// Custom styles
import styles from "../../styles/js/edit_monument";

// Local functions
import MonumentService from "../../services/MonumentService";

// Third party functions
import Cookies from "js-cookie";

class EditMonument extends React.Component {
  state = {
    user: [],
    inputs: {
      description: '',
      imageURL: '',
      address: '',
      creator: '',
      base64: '',
      name: '',
      date: '',
      id: ''
    },
    errors: {
      image: ''
    },
    modal: {
      head: '',
      body: ''
    },
    isValid: true
  }

  componentDidMount = async () => {
    const monumentID = this.props.match.params.id

    MonumentService.getMonument({_id: monumentID})
      .then((res) => {
        const name = res.name

        if (name === undefined) {
          this.setState({modal: {head: 'Internal Server Error', body: 'Something going wrong'}})
          this.showModal()
        } else {
          this.setState({inputs: {
              description: res.description,
              imageURL: res.imageURL,
              address: res.address,
              creator: res.creator,
              name: res.name,
              date: res.date,
              _id: res._id
            }})
        }
      })
      .catch((err) => {
        this.setState({modal: {head: 'Internal Server Error', body: 'Something going wrong'}})
        this.showModal()
      })
  }

  contactSubmit = (e) => {
    e.preventDefault()

    if (this.state.isValid) {
      const {errors} = this.state
      let {inputs} = this.state

      inputs["token"] = Cookies.get('accessToken')
      MonumentService.updateMonument(inputs)
        .then((res) => {
          if (res.message) {
            errors["server"] = res.message
            this.setState({errors: errors})
          } else {
            window.location.href = '/monuments_sheet'
          }
        })
        .catch((err) => {
          errors["server"] = 'Something going wrong'
          this.setState({errors: errors})
        })
    }
  }

  removeMonument = () => {
    const id = this.state.inputs.id

    MonumentService.deleteMonument({_id: id, token: Cookies.get('accessToken')})
      .then(() => window.location.href = '/monuments_sheet')
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs

    inputs[input] = e.target.value

    this.setState({input: inputs[input]})
  }

  handleFileInputChange = (e) => {
    let inputs = this.state.inputs
    let errors = this.state.errors

    try {
      const reader = new FileReader()
      const file = e.target.files[0]
      const selectedFile = file

      reader.readAsDataURL(selectedFile)
      reader.onloadend = () => {
        const result = reader.result
        const fileType = result.split('/')[0].split(':')[1]

        if (fileType !== 'image') {
          errors["image"] = 'Please insert image!'
          inputs["base64"] = ''
          this.setState({errors: errors, inputs: inputs})
        } else {
          errors["image"] = ''
          inputs["base64"] = result
          this.setState({errors: errors, inputs: inputs})
        }
      }

      reader.onerror = () => {
        errors["image"] = 'Something going wrong'
        this.setState({errors: errors, inputs: inputs})
      }
    } catch (e) {
      this.setState({errors: {image: 'Upload photo error'}})
    }
  }

  showModal = () => {
    document.getElementById('reset_password').style.display = "block"
  }

  hideModal = () => {
    document.getElementById('reset_password').style.display = "none"
    window.location.href = '/monuments_sheet'
  }

  render() {
    const { classes } = this.props

    return (
      <Container id="edit-page" component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountBalanceIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.state.inputs.name || "Loading ..."}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={this.handleChange.bind(this, "description")}
              value={this.state.inputs["description"] || ""}
              variant="outlined"
              margin="normal"
              label="Description"
              type="text"
              rowsMax={10}
              rows={2}
              fullWidth
              multiline
            />
            <div className={classes.validation_name_error}>{this.state.errors.name}</div>
            <TextField
              onChange={this.handleChange.bind(this, "address")}
              value={this.state.inputs["address"]}
              variant="outlined"
              margin="normal"
              label="Address"
              type="text"
              rowsMax={10}
              rows={1}
              fullWidth
              multiline
            />
            <TextField
              onChange={this.handleChange.bind(this, "creator")}
              value={this.state.inputs["creator"] || ""}
              variant="outlined"
              margin="normal"
              label="Creator"
              type="text"
              rowsMax={10}
              rows={1}
              fullWidth
              multiline
            />
            <TextField
              value={this.state.inputs["date"].split('T')[0] || ""}
              onChange={this.handleChange.bind(this, "date")}
              variant="outlined"
              margin="normal"
              label="Date"
              type="date"
              fullWidth
            />
            <Button
              onChange={this.handleFileInputChange}
              className={classes.upload_btn}
              variant="contained"
              component="label"
            >
              Upload Photo
              <input
                type="file"
                hidden
              />
            </Button>
            <img
              src={this.state.inputs.base64 ? this.state.inputs.base64 : this.state.inputs.imageURL}
              className={classes.image_preview}
              alt="monument_image"
            />
            <div id='validError' className={classes.validation_image_error}>{this.state.errors.image}</div>
            <Button
              className={classes.edit_btn}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Edit Monument
            </Button>
            <Button
              className={classes.remove_btn}
              onClick={this.removeMonument}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Remove Monument
            </Button>
            <div id='validError' className={classes.errors}/>
          </form>
        </div>
        <div id="reset_password" className="modal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.state.modal.head}</h5>
              </div>
              <div className="modal-body">
                <p className="modal-description">{this.state.modal.body}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.hideModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(EditMonument))
