// React components
import React from "react";
import {withRouter} from "react-router";

// Custom components
import NotFoundPage from "../not-found";
import Loading from "../loading"

// Custom modules
import MonumentService from "../../services/MonumentService";

// Custom styles
import "../../styles/css/monument.css";

// import ""

class MonumentById extends React.Component {
  state = {
    monumentInfo: {},
    isLoading: false
  }

  componentDidMount = () => {
    const id = this.props.match.params.id

    this.setState({isLoading: true})

    MonumentService.getMonument({id: id})
      .then((res) => {
        this.setState({monumentInfo: res, isLoading: false})
      })
  }

  render() {
    const {isLoading} = this.state
    const {monumentInfo} = this.state

    if (isLoading) {
      return (
        <Loading/>
      )
    }

    if (!isLoading && monumentInfo.name === undefined) {
      return (
        <NotFoundPage/>
      )
    }

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
