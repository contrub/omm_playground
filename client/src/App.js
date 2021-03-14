import React, {Component} from 'react';
import './styles/css/App.css';
import Header from './components/Header/';
import Sidebar from './components/Header/side_bar';
import About from './pages/about';
import Login from './pages/auth/login';
import Monuments from './pages/monuments/monuments';
import MonumentById from './pages/monuments/monument';
import Signup from "./pages/auth/signup";
import Users from "./pages/users/users"
import EditUser from "./pages/users/edit_user";
import CreateUser from "./pages/users/create_user"
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import PasswordReset from "./pages/auth/reset";
import UserService from "./services/UserService";
import isEmpty from "validator/es/lib/isEmpty";
import Cookies from 'js-cookie'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      isListOpen: false,
      user: {role: 'guest'}
    }
  }

  componentDidMount() {
    UserService.getRole({token: Cookies.get('accessToken')})
      .then((res) => this.setState({user: {role: res.userRole}}))
  }

  submitSearch = (data) => {
    setTimeout(() => console.log(data), 1000);
  };

  openDrawer = () => {
    this.setState({
      isDrawerOpen: true
    })
  };

  closeDrawer = () => {
    this.setState({
      isDrawerOpen: false,
      isListOpen: false
    })
  }

  handleListClick = () => {
    this.setState({
      isListOpen: !this.state.isListOpen
    })
  }

  isLogged = () => {
    if (Cookies.get('accessToken') !== undefined && !isEmpty(Cookies.get('accessToken'))) {
      return true
    } else {
      return false
    }
  }

  render() {
    // console.log(this.state)
    return (
      <BrowserRouter>
        <div className="App">
          <Header
            submitSearch={this.submitSearch}
            name="Open Monument Map"
            btntext="login"
            openDrawer={this.openDrawer}
            isLogged={this.isLogged()}
          />
          <Sidebar
            userRole={this.state.user.role}
            closeDrawer={this.closeDrawer}
            isDrawerOpen={this.state.isDrawerOpen}
            isListOpen={this.state.isListOpen}
            handleListClick={this.handleListClick}
            onLinkClick={this.closeDrawer}
          />
        </div>
        <Switch>
          <Route exact path="/" >
            <Monuments />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/monuments/:id">
            <MonumentById />
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/reset">
            <PasswordReset />
          </Route>
          {/*<Route path="/create_monument">*/}
          {/*  <CreateMonument />*/}
          {/*</Route>*/}
          <Route exact path="/users">
            <Users
              userRole={this.state.user.role}
            />
          </Route>
          <Route path="/users/:email">
            <EditUser
              userRole={this.state.user.role}
            />
          </Route>
          <Route path="/create_user">
            <CreateUser
              userRole={this.state.user.role}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
