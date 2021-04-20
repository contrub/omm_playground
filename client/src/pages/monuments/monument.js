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
    const {monumentInfo, isLoading} = this.state

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
      <div id="main">
        <h1 id="name"> {monumentInfo.name} </h1>
        <img
          // id="imgs"
          alt="monument_image"
          src={monumentInfo.imageURL}
        />
        <p id="Description"> {monumentInfo.description} </p>
        <ul>
          <li><p id="Address">Адрес - {monumentInfo.address}</p></li>
          <li><p id="Creator">Архитектор/скульптор - {monumentInfo.creator} </p></li>
          <li><p id="Date">Дата постройки - {monumentInfo.buildDate.split('-')[0]} </p></li>
        </ul>
       
      </div>
    )
  }
}

export default withRouter(MonumentById)

