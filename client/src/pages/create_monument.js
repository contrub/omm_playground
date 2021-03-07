import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import isEmpty from "validator/es/lib/isEmpty";
import MonumentService from "../services/MonumentService";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errors: {
    textAlign: 'center',
    color: 'red',
    margin: '0 0 16px'
  },
  passwordCheck: {
    color: 'red',
    fontFamily: 'Gill Sans',
    fontSize: '17px'
  },
  image_preview: {
    height: '100%',
    width: 'auto',
    borderRadius: '10px',
    marginTop: '30px'
  }
});


class UploadImage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputs: {
        name: '',
        base64: ''
      },
      errors: {},
      previewImage: '',
      isValid: false
    }
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

    let inputs = this.state.inputs;
    inputs[input] = e.target.value;
    this.setState({input: inputs[input]});
    this.handleFormValidation(input)

  }

  handleFileInputChange = (e) => {
    let inputs = this.state.inputs;
    let errors = this.state.errors;

    const file = e.target.files[0];
    const selectedFile = file
     if (!selectedFile) return;
     const reader = new FileReader();
     reader.readAsDataURL(selectedFile);
     reader.onloadend = () => {
       const result = reader.result
       this.setState({previewImage: result})
       const fileType = result.split('/')[0].split(':')[1]
       if (fileType !== 'image') {
         errors["image"] = 'Please insert image!'
         inputs["base64"] = ''
       } else {
         errors["image"] = ''
         inputs["base64"] = result
       }
     }

     reader.onerror = () => {
       errors["image"] = 'Something going wrong'
     }

     this.setState({errors: errors, inputs: inputs})

  };

  contactSubmit = (e) => {
    e.preventDefault()
    this.handleFormValidation('name')
    if (this.state.isValid) {
      MonumentService.createMonument(this.state.inputs)
        .then((res) => {
          if (res.status) {
            alert('Something going wrong ;(')
          } else {
            alert('Monument created!')
          }
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
              required
              fullWidth
              id="Name"
              label="Name"
            />
            <div id='validImageError' className={classes.errors}>{this.state.errors.name}</div>
            <TextField
              onChange={this.handleChange.bind(this, "description")}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={2}
              rowsMax={10}
              label="Description"
              id="description"
            />
            <TextField
              onChange={this.handleChange.bind(this, "address")}
              variant="outlined"
              margin="normal"
              fullWidth
              id="address"
              label="Address"
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
                variant="contained"
                component="label"
                onChange={this.handleFileInputChange}
              >
                Upload Photo
                <input
                  type="file"
                  hidden
                />
              </Button>
            </div>
            {this.state.previewImage && (
              <img
                src={this.state.previewImage}
                className={classes.image_preview}
                alt="chosen"
                style={{ height: '100px'}}
              />
            )}
            <div id='validImageError' className={classes.errors}>{this.state.errors.image}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create monument
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}

export default withStyles(styles, {withTheme: true})(UploadImage)
