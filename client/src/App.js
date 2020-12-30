import React, {Component} from 'react';
import './styles/App.css';
import Header from './components/Header/';
import Sidebar from './components/Header/side_bar';
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Monuments from './pages/monuments';
import MonumentById from './pages/monument';
import Signup from "./pages/signup";
import Users from "./pages/users";
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
  //   // this.props.router.push('/login')
  //   if (!email) {
  //     alert('Failed authentication')
  //   } else {
  //     UserService.getUser(email)
  //       .then(res => {
  //         console.log(res)
  //         if (res.length === 0) {
  //           alert('Failed authentication')
  //         } else {
  //           alert('Successful authentication')
  //         }
  //       })
  //   }
  //
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

  isLogged = () => {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if ('accessToken' === cookiePair[0].trim()) {
        return true
      }
    }
    return false
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
            status={this.isLogged()}
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
          <Route path="/login">
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

export default App
