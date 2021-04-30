// React components
import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";

// Custom styles
import './styles/css/App.css';

// Custom components
import ProtectedRoute from "./components/protectedRoute";
import Sidebar from './components/Header/side_bar';
import Header from './components/Header/';

// General pages
import ForbiddenPage from "./pages/forbidden";
import NotFoundPage from "./pages/not-found";
import About from "./pages/about";

// Auth pages
import PasswordResetRequest from "./pages/auth/reset_password_request";
import PasswordReset from "./pages/auth/reset_password";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import Logout from "./pages/auth/logout";

// Monuments pages
import CreateMonument from "./pages/monuments/create_monument";
import MonumentsSheet from "./pages/monuments/monuments_sheet"
import EditMonument from "./pages/monuments/edit_monument";
import Monuments from './pages/monuments/monuments';
import MonumentById from "./pages/monuments/monument";

// Users pages
import CreateUser from "./pages/users/create_user";
import UsersSheet from "./pages/users/users_sheet";
import EditUser from "./pages/users/edit_user";

// Third party functions
import AuthService from "./services/AuthService";
import Cookies from 'js-cookie';

class App extends Component {
  state = {
    isDrawerOpen: false,
    isListOpen: false,
    isLogged: false
  }

  componentDidMount = () => {
    AuthService.getRole({token: Cookies.get('accessToken')})
      .then((res) => {
        if (res.userRole !== "guest") {
          localStorage.setItem("email", res.email)

          this.setState({isLogged: true})
        } else {
          localStorage.removeItem("email")
        }
        
        localStorage.setItem("userRole", res.userRole)
      })
      .catch((err) => {
        localStorage.setItem("userRole", "guest")
      })
  }

  submitSearch = (data) => {
    setTimeout(() => console.log(data), 1000);
  }

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

  render() {
    const {isLogged, isDrawerOpen, isListOpen} = this.state

    return (
      <BrowserRouter>
        <div className="App">
          <Header
            submitSearch={this.submitSearch}
            name="Open Monument Map"
            btntext="login"
            openDrawer={this.openDrawer}
            isLogged={isLogged}
            email={localStorage.getItem('email')}
          />
          <Sidebar
            userRole={localStorage.getItem('userRole')}
            closeDrawer={this.closeDrawer}
            isDrawerOpen={isDrawerOpen}
            isListOpen={isListOpen}
            handleListClick={this.handleListClick}
            onLinkClick={this.closeDrawer}
          />
        </div>
        <Switch>
          <Route path="/forbidden" component={ForbiddenPage}/>
          <Route path="/about" component={About}/>
          <Route path="/reset_request" component={PasswordResetRequest}/>
          <Route path="/reset" component={PasswordReset}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route exact path="/" component={Monuments}/>
          <Route path="/monuments/:id" component={MonumentById}/>
          <ProtectedRoute path="/users_sheet" requiredRole={"superadmin"} userRole={localStorage.getItem('userRole')} component={UsersSheet} email={localStorage.getItem('email')}/>
          <ProtectedRoute path="/edit_user/:email" requiredRole={"superadmin"} userRole={localStorage.getItem('userRole')} component={EditUser} email={localStorage.getItem('email')}/>
          <ProtectedRoute path="/create_user" requiredRole={"superadmin"} userRole={localStorage.getItem('userRole')} component={CreateUser}/>
          <ProtectedRoute path="/monuments_sheet" requiredRole={"admin"} userRole={localStorage.getItem('userRole')}  component={MonumentsSheet}/>
          <ProtectedRoute path="/edit_monument/:id" requiredRole={"admin"} userRole={localStorage.getItem('userRole')} component={EditMonument}/>
          <ProtectedRoute path="/create_monument" requiredRole={"admin"} userRole={localStorage.getItem('userRole')} component={CreateMonument}/>
          <Route path='*' exact={true} component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
