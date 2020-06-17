import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/';
import Sidebar from './components/Header/side_bar';
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/login'
import Monuments from './pages/monuments'
import Ekaterina from './pages/monuments/Ekaterina'
import Orange from './pages/monuments/Orange'
import Duc from './pages/monuments/Duс'
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
    console.log(this.state)
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
          <Route path="/monuments_list">
            <Monuments />
          </Route>
          <Route path="/monuments/ekaterina">
            <Ekaterina />
          </Route>
          <Route path="/monuments/orange">
            <Orange />
          </Route>
          <Route path="/monuments/duc_de_richelie">
            <Duc />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
