import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/';
import Side_bar from './components/Header/side_bar';

import {
  BrowserRouter as Router
} from "react-router-dom";

import AppRouter from './router'

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
    )
  }
}

export default App;
