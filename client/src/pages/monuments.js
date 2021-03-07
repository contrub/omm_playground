import React from 'react';
import MonumentService from '../services/MonumentService';

<<<<<<< HEAD
/* Тестовая страничка для демонстрации памятников
* Должна быть доработана Даниилом
* */


=======
>>>>>>> f596d9f070e4248b62ab61d0a615ed37c51dfb55
class Monuments extends React.Component {
  state = {
    monuments: []
  }

<<<<<<< HEAD
  componentDidMount = () => {
    MonumentService.fetchMonuments({}, {})
      .then((res) => {
        this.setState({monuments: res})
=======
  getMonuments = () => {
    MonumentService.fetchMonuments({}, {})
      .then((res) => {
        this.setState({
          monuments: res
        })
>>>>>>> f596d9f070e4248b62ab61d0a615ed37c51dfb55
      })
  }

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
<<<<<<< HEAD
    let {monuments} = this.state

    return (
      <div className="container">
        {this.renderMonuments(monuments)}
      </div>
    )
=======
    let {monuments, isLoaded} = this.state
    
    return (
        <div className="container">
          {this.renderMonuments(monuments)}
        </div>
      )
>>>>>>> f596d9f070e4248b62ab61d0a615ed37c51dfb55
  }
}

export default Monuments
