// React components
import React from 'react';

// Custom components
import ModalForm from "../../components/modal";

// Material-UI components
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

// Third party functions
import isEmpty from "validator/es/lib/isEmpty";
import Cookies from "js-cookie";

// Local modules
import MonumentService from "../../services/MonumentService";

// Custom styles
import styles from "../../styles/js/monuments/create_monument";

class CreateMonument extends React.Component {
  state = {
    inputs: {
      name: ''
    },
    modal: {
      isOpen: false,
      head: '',
      body: '',
      redirectURL: '',
      redirectBtnName: ''
    },
    errors: {
      name: '',
      image: ''
    },
    isValid: false
  }

  changeModalState = (state) => {
    let {modal} = this.state

    modal["isOpen"] = state

    this.setState({modal: modal})
  }


  handleFormValidation = () => {
    let {inputs, errors, isValid} = this.state

    if (isEmpty(inputs.name)) {
      errors["name"] = 'Cannot be empty!'
      isValid = false
    } else {
      errors["name"] = ''
      isValid = true
    }

    this.setState({isValid: isValid, errors: errors})
  }

  handleChange = (input, e) => {
    let {inputs} = this.state

    inputs[input] = e.target.value

    this.setState({input: inputs[input]})

    if (input === "name") {
      this.handleFormValidation()
    }
  }

  handleFileInputChange = (e) => {
    let {inputs, errors} = this.state

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
      } else {
        errors["image"] = ''
        inputs["base64"] = result
      }

      this.setState({errors: errors, inputs: inputs})
    }

    reader.onerror = () => {
      errors["image"] = 'Something going wrong'
      inputs["base64"] = ''

      this.setState({errors: errors, inputs: inputs})
    }
  }

  contactSubmit = (e) => {
    e.preventDefault()

    this.handleFormValidation()

    if (this.state.isValid) {
      let {inputs} = this.state
      let {modal} = this.state

      inputs["token"] = Cookies.get('accessToken')
      MonumentService.createMonument(inputs)
        .then((res) => {
          const name = res.name

          if (name === undefined) {
            modal["head"] = 'Monument create error'
            modal["body"] = 'Something going wrong'
            modal["redirectURL"] = '/monuments_sheet'
            modal["redirectBtnName"] = 'Monuments-sheet'

            this.setState({modal: modal})
            this.changeModalState(true)
          } else {
            window.location.href = '/monuments_sheet'
          }
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message
          modal["redirectURL"] = '/monument_sheet'
          modal["redirectBtnName"] = 'Monuments-sheet'

          this.setState({modal: modal})
          this.changeModalState(true)
        })
    }
  }

  render() {
    const {classes} = this.props
    const {inputs, errors, modal} = this.state

    return (
      <Container component="main" maxWidth="xs" onSubmit={this.contactSubmit.bind(this)}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountBalanceIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create monument
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={this.handleChange.bind(this, "name")}
              variant="outlined"
              margin="normal"
              label="Name"
              id="Name"
              required
              fullWidth
            />
            <div className={classes.validationNameError}>{errors.name}</div>
            <TextField
              onChange={this.handleChange.bind(this, "description")}
              variant="outlined"
              margin="normal"
              label="Description"
              id="description"
              rowsMax={10}
              rows={2}
              fullWidth
              multiline
            />
            <TextField
              onChange={this.handleChange.bind(this, "address")}
              variant="outlined"
              margin="normal"
              label="Address"
              id="address"
              fullWidth
            />
            <TextField
              onChange={this.handleChange.bind(this, "date")}
              variant="outlined"
              margin="normal"
              type="Date"
              id="date"
              fullWidth
            />
            <TextField
              onChange={this.handleChange.bind(this, "creator")}
              variant="outlined"
              margin="normal"
              label="Creator"
              id="creator"
              fullWidth
            />
            <div>
              <Button
                onChange={this.handleFileInputChange}
                className={classes.uploadBtn}
                variant="contained"
                component="label"
              >
                Upload Photo
                <input
                  type="file"
                  hidden
                />
              </Button>
            </div>
            {inputs.base64 && (
              <img
                className={classes.imagePreview}
                src={inputs.base64}
                alt={inputs.name ? inputs.name : 'monument_image'}
              />
            )}
            <div className={classes.validationImageError}>{errors.image}</div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Create monument
            </Button>
          </form>
        </div>
        {modal.isOpen ?
          <ModalForm
            head={modal.head}
            body={modal.body}
            redirect_url={modal.redirectURL}
            redirect_btn_name={modal.redirectBtnName}
            show={modal.isOpen}
            onHide={() => this.changeModalState(false)}
          /> : null}
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(CreateMonument)
