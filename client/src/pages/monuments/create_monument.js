// React components
import React from 'react';

// Material-UI components
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

// Local functions
import MonumentService from "../../services/MonumentService";

// Third party functions
import isEmpty from "validator/es/lib/isEmpty";
import Cookies from "js-cookie";

// Custom styles
import styles from '../../styles/js/create_monument';

class CreateMonument extends React.Component {

  state = {
    inputs: {
      name: '',
      base64: ''
    },
    errors: {
      name: '',
      image: ''
    },
    isValid: false
  }

  handleFormValidation = (name) => {
    const errors = this.state.errors
    const inputs = this.state.inputs
    if (name === "name") {
      if (isEmpty(inputs.name)) {
        errors["name"] = 'Cannot be empty!'
        this.setState({isValid: false})
      } else {
        errors["name"] = ''
        this.setState({isValid: true})
      }
    }

    this.setState({errors: errors})
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs

    inputs[input] = e.target.value

    this.setState({input: inputs[input]})
    this.handleFormValidation(input)

  }

  handleFileInputChange = (e) => {
    let inputs = this.state.inputs
    let errors = this.state.errors

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
  }

  contactSubmit = (e) => {
    e.preventDefault()
    this.handleFormValidation('name')
    if (this.state.isValid) {
      const {errors} = this.state
      let {inputs} = this.state

      inputs["token"] = Cookies.get('accessToken')
      MonumentService.createMonument(inputs)
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

  render() {
    const { classes } = this.props

    return (
      <Container component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
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
            <div className={classes.validation_name_error}>{this.state.errors.name}</div>
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
              fullWidth
              id="date"
              type="Date"
            />
            <TextField
              onChange={this.handleChange.bind(this, "creator")}
              variant="outlined"
              margin="normal"
              fullWidth
              id="creator"
              label="Creator"
            />
            <div>
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
            </div>
            {this.state.inputs.base64 && (
              <img
                className={classes.image_preview}
                src={this.state.inputs.base64}
                alt="monument_image"
              />
            )}
            <div className={classes.validation_image_error}>{this.state.errors.image}</div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Create monument
            </Button>
            <div className={classes.server_error}>{this.state.errors.server}</div>
          </form>
        </div>
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(CreateMonument)
