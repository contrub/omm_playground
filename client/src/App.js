import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/';
import Sidebar from './components/Header/side_bar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Monument from "./components/monument/index"
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
  }
  closeDrawer = (data) => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    return (
      <Router>
        <Switch>
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
              />
            <Route path="/monument/:id" component={Monument} />
          </div>
        </Switch>
      </Router>
    )
  }
}
export default App;
