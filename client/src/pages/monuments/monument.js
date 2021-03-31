import React from 'react';
import MonumentService from '../../services/MonumentService'
import {withRouter} from "react-router";
import "../../styles/css/monument.css"

class MonumentById extends React.Component {

  state = {
    monumentInfo: []
  }

  componentDidMount = async() => {
    let id = this.props.match.params.id
    await MonumentService.getMonument({id: id})
      .then((res) => {
        this.setState({monumentInfo: res})
      })
  }

  render() {
    return (
      <div>
        <h1 id="name"> {this.state.monumentInfo.name} </h1>
        <img

          className="img"
          alt=""
          src={this.state.monumentInfo.imageURL}
        />
        <p id="Description"> {this.state.monumentInfo.description} </p>
        <ul>
          <li><p id="Address">Адрес - {this.state.monumentInfo.address}</p></li>
          <li><p id="Creator">Архитектор/скульптор - {this.state.monumentInfo.creator} </p></li>
          {/* <li><p id="Date">Дата постройки - {this.state.monumentInfo.date.getFullYear()} </p></li> */}
        </ul>
      </div>
    )
  }
}

export default withRouter(MonumentById)
