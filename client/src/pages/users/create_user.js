// React Components
import React from "react";

// Custom components
import ModalForm from "../../components/modal";

// Material-UI components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

// Material-UI icons
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";

// Third party functions
import Cookies from "js-cookie";

// Local functions
import {passwordValidation} from "../../helpers/passwordValidation";
import {emailValidation} from "../../helpers/emailValidation";

// Local modules
import UserService from "../../services/UserService";

// Custom styles
import styles from "../../styles/js/users/create_user";

class CreateUser extends React.Component {
  state = {
    inputs: {
      email: '',
      password: '',
    },
    modal: {
      isOpen: false,
      body: '',
      head: '',
      redirectURL: '/users_sheet',
      redirectBtnName: 'Users-sheet'
    },
    errors: {
      validation: ''
    },
    isValid: false
  }

  changeModalState = (state) => {
    let {modal} = this.state
    modal["isOpen"] = state

    this.setState({modal: modal})
  }

  handleFieldValidation = () => {
    this.setState({isValid: emailValidation(this.state.inputs, this.state.errors)})
    this.setState({isValid: passwordValidation(this.state.inputs)})

    document.getElementById('passwordRequirements').hidden = false
  }

  contactSubmit = (e) => {
    let {inputs, errors, modal} = this.state

    e.preventDefault()

    if (this.state.isValid) {

      inputs["token"] = Cookies.get('accessToken')
      UserService.createUser(inputs)
        .then((res) => {
          const email = res.data.email

          if (email === undefined) {
            modal["head"] = 'Something going wrong'
            modal["body"] = 'Create user error'

            this.setState({modal: modal})
            this.changeModalState(true)
          } else {
            window.location.href = '/users_sheet'
          }
        })
        .catch((err) => {
          modal["head"] = 'Server error'
          modal["body"] = err.message

          this.setState({modal: modal})
          this.changeModalState(true)
        })
    } else {
      errors["validation"] = "ValidationError"

      this.handleFieldValidation()
      this.setState({errors: errors})
    }
  }

  handleChange = (input, e) => {
    let inputs = this.state.inputs

    inputs[input] = e.target.value
    this.setState({input: inputs[input]})
    this.handleFieldValidation()
  }

  showPassword = () => {
    document.getElementById('password').type === 'password' ? document.getElementById('password').type = 'text' : document.getElementById('password').type = 'password'
  }

  render() {
    const {classes} = this.props
    const {inputs, errors, modal} = this.state

    return (
      <div>
        <Container component="main" maxWidth="xs" onSubmit= {this.contactSubmit.bind(this)}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create User
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                onChange={this.handleChange.bind(this, "email")}
                value={inputs["email"]}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <div className={classes.errors}>{errors["email"]}</div>
              <TextField
                onChange={this.handleChange.bind(this, "password")}
                value={inputs["password"]}
                InputProps={{
                  endAdornment: (
                    <Checkbox
                      icon={<VisibilityIcon/>}
                      checkedIcon={<VisibilityOffIcon/>}
                      onClick={this.showPassword}
                    />)
                }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ul id='passwordRequirements' hidden>
                <li className={classes.pass_requirement} id='quantityCheck'>At least 8 characters</li>
                <li className={classes.pass_requirement} id='numberCheck'>Contains at least 1 number</li>
                <li className={classes.pass_requirement} id='lowercaseCheck'>Contains at least lowercase letter</li>
                <li className={classes.pass_requirement} id='uppercaseCheck'>Contains at least uppercase letter</li>
                <li className={classes.pass_requirement} id='specialCharacterCheck'>Contains a special character (!@#%&)</li>
              </ul>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit_btn}
              >
                Create
              </Button>
              <div className={classes.errors}>
                {errors.validation}
              </div>
            </form>
          </div>
        </Container>
        {modal.isOpen ?
          <ModalForm
            head={modal.head}
            body={modal.body}
            redirect_url={modal.redirectURL}
            redirect_btn_name={modal.redirectBtnName}
            show={modal.isOpen}
            onHide={() => this.changeModalState(false)}
          /> : null}
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(CreateUser)

