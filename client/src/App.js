import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/';
import Sidebar from './components/Header/side_bar';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Monuments from './pages/monuments';
import MonumentById from './pages/monument';
import Signup from "./pages/signup";
import Users from "./pages/users";
import UserService from './services/UserSevice'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import PasswordReset from "./pages/reset";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isAuth: false
    }
  }

  // UNSAFE_componentWillMount() {
  //   const email = Cookies.get('email')
  //
  //   if (!email) {
  //     this.props.router.push('/sign')
  //   } else {
  //     UserService.getUser(email)
  //       .then(res => {
  //         console.log(res)
  //         if (!res.length === 0) {
  //           this.props.router.push('/sign')
  //         } else {
  //           let db_password = res[0].password
  //           if (db_password === password) {
  //             console.log(document.cookie)
  //             alert('Successful login')
  //             window.location.href = '/monuments'
  //           } else {
  //             alert('Incorrect password')
  //           }
  //         }
  //       })
  //   }
  // }

  submitSearch = (data) => {
    setTimeout(() => console.log(data), 1000);
  };

  openDrawer = (data) => {
    this.setState({
      isOpen: true
    })
  };

  closeDrawer = (data) => {
    this.setState({
      isOpen: false
    })
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
            />
          <Sidebar
            closeDrawer={this.closeDrawer}
            isOpen={this.state.isOpen}
            onLinkClick={this.closeDrawer}
          />
        </div>
        <Switch>
          <Route path="/home" >
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/sign">
            <Login />
          </Route>
          <Route exact path="/monuments">
            <Monuments />
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
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
