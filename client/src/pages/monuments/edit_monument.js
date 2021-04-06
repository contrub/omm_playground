// React components
import React from "react";
import {withRouter} from "react-router";

// Custom components
import ModalWindow from "../../components/modal";
import Loading from "../loading"

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

// Material-UI icons
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

// Third party modules
import Cookies from "js-cookie";

// Local modules
import MonumentService from "../../services/MonumentService";

// Custom styles
import styles from "../../styles/js/monuments/edit_monument";

class EditMonument extends React.Component {
  state = {
    user: [],
    inputs: {
      description: '',
      buildDate: '',
      imageURL: '',
      address: '',
      creator: '',
      base64: '',
      name: '',
      id: ''
    },
    errors: {
      image: ''
    },
    modal: {
      head: '',
      body: '',
      redirectURL: '/monuments_sheet'
    },
    isLoading: false,
    isValid: true
  }

  componentDidMount = async () => {
    const monumentID = this.props.match.params.id
    let {modal} = this.state

    this.setState({isLoading: true})

    MonumentService.getMonument({id: monumentID})
      .then((res) => {
        const name = res.name

        if (name === undefined) {
          modal["body"] = 'Get monument error'
          modal["head"] = 'Something going wrong'
          this.setState({modal: modal, isLoading: false})
        } else {
          this.setState({inputs: {description: res.description, imageURL: res.imageURL, address: res.address, creator: res.creator, name: res.name, buildDate: res.buildDate, id: res._id}, isLoading: false})
        }
      })
      .catch((err) => {
        modal["head"] = 'Server error'
        modal["body"] = err.message
        this.setState({modal: modal, isLoading: false})
      })
  }

  contactSubmit = (e) => {
    e.preventDefault()

    if (this.state.isValid) {
      let {modal} = this.state
      let {inputs} = this.state

      const imageURL = inputs.imageURL
      const imagePublicID = imageURL.split('/')[7] + '/' + imageURL.split('/')[8].split('.')[0]

      inputs["token"] = Cookies.get('accessToken')
      inputs["imagePublicID"] = imagePublicID

      MonumentService.updateMonument(inputs)
        .then((res) => {
          if (res.nModified === undefined) {
            modal["head"] = 'Something going wrong'
            modal["body"] = 'Update monument error'
            this.setState({modal: modal})
          } else {
            window.location.href = '/monuments_sheet'
          }
        })
        .catch((err) => {
          modal["body"] = 'Server error'
          modal["head"] = err.message
          this.setState({modal: modal})
        })
    }
  }

  // removeMonument = () => {
  //   const id = this.state.inputs.id
  //   let {modal} = this.state
  //
  //   MonumentService.deleteMonument({id: id, token: Cookies.get('accessToken')})
  //     .then(() => window.location.href = '/monuments_sheet')
  //     .catch((err) => {
  //       modal["body"] = 'Server error'
  //       modal["head"] = err.message
  //       this.setState({modal: modal})
  //     })
  // }

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

  render() {
    const {classes} = this.props
    const {isLoading} = this.state

    if (isLoading) {
      return (
        <Loading/>
      )
    }

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
              value={this.state.inputs["buildDate"].split('T')[0] || ""}
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
            {/*<Button*/}
            {/*  className={classes.remove_btn}*/}
            {/*  onClick={this.removeMonument}*/}
            {/*  variant="contained"*/}
            {/*  color="secondary"*/}
            {/*  fullWidth*/}
            {/*>*/}
            {/*  Remove Monument*/}
            {/*</Button>*/}
            <div id='validError' className={classes.errors}/>
          </form>
        </div>
        {this.state.modal.head && <ModalWindow head={this.state.modal.head} body={this.state.modal.body} redirectURL={this.state.modal.redirectURL}/>}
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(EditMonument))
