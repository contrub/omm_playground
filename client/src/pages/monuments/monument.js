// React components
import React from "react";
import {withRouter} from "react-router";

// Custom modules
import MonumentService from "../../services/MonumentService";

// Custom styles
import "../../styles/css/monument.css";

// import ""

class MonumentById extends React.Component {
  state = {
    monumentInfo: []
  }

  componentDidMount = () => {
    let id = this.props.match.params.id

    MonumentService.getMonument({id: id})
      .then((res) => {
        this.setState({monumentInfo: res})
      })
  }

  render() {
    return (
      <div>
        <h1 id="name"> {this.state.monumentInfo.name} </h1>
        <img
          id="imgs"
          alt="monument_image"
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
