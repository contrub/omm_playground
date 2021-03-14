import React from 'react';
import MonumentService from '../../services/MonumentService';

/* Тестовая страничка для демонстрации памятников
* Должна быть доработана Даниилом
* */

class Monuments extends React.Component {


  state = {
    monuments: []
  }

  componentDidMount = () => {
    MonumentService.fetchMonuments({}, {})
      .then((res) => {
        this.setState({monuments: res})
      })}

  renderMonuments = (monuments) => {
    return monuments.map((entry, index) => (
      <div className="monument" key={index}>
        <h1>{entry.name}</h1>
        {entry.description}
        <div id="information">
          <p>
            <b>Creator:</b> {entry.creator}
          </p>
        </div>
        <div id="image">
          <img
            alt=""
            width="300px"
            src={entry.imageURL}
          />
        </div>
      </div>
    ))
  }


  render() {
    let {monuments} = this.state

    return (
    <div className="container">
      {this.renderMonuments(monuments)}
    </div>
    )
  }
}

export default Monuments
