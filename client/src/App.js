import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/';
import Sidebar from './components/Header/side_bar';


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
    return (
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
      </div>
    )
  }
}

export default App;
