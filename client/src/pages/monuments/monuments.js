// React components
import React from "react";
import {withRouter} from "react-router";

// Local functions
import MonumentService from "../../services/MonumentService";
import Link from "@material-ui/core/Link";

class Monuments extends React.Component {

  state = {
    monuments: []
  }

  componentDidMount = async() => {
    await MonumentService.fetchMonuments()
      .then((res) => {
        this.setState({monuments: res})
      })
  }

  render() {
    const {monuments} = this.state

    return (
      <div>
        {monuments.map((monument, index) => {
          return (
            <div key={index}>
              <h1 id="name"> {monument.name} </h1>
              <img
                className="img"
                alt="monument_image"
                src={monument.imageURL}
              />
              <ul>
                <li>
                  <p id="address">Адрес - {monument.address}</p>
                </li>
                <li>
                  <p id="creator">Архитектор/скульптор - {monument.creator}</p>
                </li>
              </ul>
              <Link
                  href={`monuments/${monument._id}`}
              >
                  More info
              </Link>
              <hr/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default withRouter(Monuments)
