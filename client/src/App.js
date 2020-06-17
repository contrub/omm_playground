import React, {Component} from 'react';
import './App.css';
import Header from './components/Header/';
import Sidebar from './components/Header/side_bar';
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/login'
import Monuments from './pages/monuments'
import MonumentById from './pages/index'
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
          <Route exact path="/monuments">
            <Monuments />
          </Route>
          <Route path="/monuments/ekaterina">
            <MonumentById 
              title = 'Monument to Catherine II'
              description = 'According to the inhabitants of Odessa, the monument to Catherine II is a gratitude to the empress and other founders of Odessa for the birth of such a beautiful city. It was at her command in 1794 that the imperial decree on the formation of a port city was signed. For such an imperial decision, 100 years later, or rather, in 1900, the inhabitants of Odessa erected a monument. The construction is a full-length image of the queen on the monument, and a little lower there are 4 more monuments to historical figures, which laid the foundation for the laying of the port. This whole composition is located on an area that has a triangular shape. After the approval of the communist government, the monument was removed and moved to the museum.'
              src = 'https://planetofhotels.com/sites/default/files/styles/attractionimageoriginal/public/catherine-the-great_2_0.jpg?itok=iZCk1KJY'
            />
          </Route>
          <Route path="/monuments/orange">
            <MonumentById 
              title = 'Monument to the Orange'
              description = 'As we all know, on May 27, 1794, Empress Catherine II issued a decree deciding on the construction of a commercial sea port in Odessa. But this decree was not enforced during the life of the empress. Over time, Paul I, who received the throne after Catherine II, canceled the decree issued by her and completely stopped financing the construction of the port. The main activity of our city - trade stopped, Odessa fell into a very difficult situation, being almost on the verge of bankruptcy. It seemed that it was already impossible to find a way out of this situation, but the locals, as usual, were ours!'
              src = 'http://www.bestkv.com/_nw/0/15052280.jpg'
            />
          </Route>
          <Route path="/monuments/duc_de_richelie">
            <MonumentById 
              title = 'Monument to Duke de Richelieu'
              description = 'Monument to Duke Richelieu (Duke de Richelieu, Armand Emmanuel du Plessis) - the first monument erected in Odessa. The most famous and popular monument is the symbol of Odessa, near which it is always crowded, where Odessa and city visitors love to take pictures in any weather. And since this monument already existed, and Primorskono Boulevard did not exist yet, the entire architectural ensemble of this part of the city was planned taking into account the location of the monument. Behind the Duke monument is a semicircular square, framed by two semicircular buildings; further - Catherine Square, where the monument to the founders of the city is located.'
              src = 'https://rutraveller.ru/icache/place/5/853/000/58530_603x354.jpg'
            />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
