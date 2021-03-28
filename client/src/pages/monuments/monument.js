// React components
import React from "react";
import {withRouter} from "react-router";

// Local functions
import MonumentService from "../../services/MonumentService";

// Custom styles
import "../../styles/css/monument.css";

class MonumentById extends React.Component {

  state = {
    monumentInfo: []
  }

  componentDidMount = async() => {
    const id = this.props.match.params.id

    await MonumentService.getMonument({_id: id})
      .then((res) => {
        this.setState({monumentInfo: res})
      })
  }

  render() {
    const {monumentInfo} = this.state

    return (
      <div>
        <h1 id="name"> {monumentInfo.name} </h1>
          <img
            className="img"
            alt="monument_image"
            src={monumentInfo.imageURL}
          />
          <p id="description">
            {monumentInfo.description}
          </p>
        <ul>
          <li>
            <p id="address">Адрес - {monumentInfo.address}</p>
          </li>
          <li>
            <p id="creator">Архитектор/скульптор - {monumentInfo.creator}</p>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(MonumentById)
