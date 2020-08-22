import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/';
import Sidebar from './components/Header/side_bar';
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/login'
import Monuments from './pages/monuments'
import MonumentById from './pages/monument'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  state = {
    isOpen: false
  };

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
      <Router>
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
          <Route path="/home">
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
          <Route path="">
            <MonumentById path="/monuments/:id"/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
