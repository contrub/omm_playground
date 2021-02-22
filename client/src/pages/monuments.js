import React from 'react';
import MonumentService from '../services/MonumentService';
import '../styles/monuments.css';

class Monuments extends React.Component {
  state = {
    monuments: []
  }

  getMonuments = () => {
    MonumentService.fetchMonuments({}, {})
      .then((res) => {
        this.setState({
          monuments: res
        })
      })
  }

  componentDidMount = () => {
    this.getMonuments()
  }

  renderMonuments = (monuments) => {
    return monuments.map((entry, index) => (
        <div className="monument" key={index}>
          <h1>{entry.name}</h1>
          {entry.description}
          <div id="information">
            <p>
              <b>Sculptor:</b> {entry.sculptor}
              <br/>
              <b>Architect:</b> {entry.architect}
            </p>
          </div>
          <div id="image">
            <img
              alt=""
              src={entry.imageURL}
            />
          </div>
        </div>
    ))
  }


  render() {
    let {monuments, isLoaded} = this.state
    
    return (
        <div className="container">
          {this.renderMonuments(monuments)}
        </div>
      )
  }
}

export default Monuments
