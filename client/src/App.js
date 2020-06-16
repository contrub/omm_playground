import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/';

import Side_bar from './components/Header/side_bar';

import {
  BrowserRouter as Router
} from "react-router-dom";

import AppRouter from './router'
import Sidebar from './components/Header/side_bar';
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/login'
import Monument from './pages/monument'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  state = {
    isOpen: false
  };
  submitSearch = (data) => {
    setTimeout(() => console.log(data), 1000);
  };
  openDrawer = () => {
    this.setState({
      isOpen: true
    })
  };
  closeDrawer = () => {
    this.setState({
      isOpen: false
    })
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header
            submitSearch={this.submitSearch}
            name="Open Monument Map"
            btntext="login"
            openDrawer={this.openDrawer}
          />
          <Side_bar
            closeDrawer={this.closeDrawer}
            isOpen={this.state.isOpen}
          />
          <AppRouter />
        </Router>
      </div>
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
          <Route path="/monument/:id">
            <Monument />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
