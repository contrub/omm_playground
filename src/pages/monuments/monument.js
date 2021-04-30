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

class MonumentById extends React.Component {
  state = {
    monumentInfo: {},
    isLoading: false,
    isError: false
  }

  componentDidMount = () => {
    const id = this.props.match.params.id

    this.setState({isLoading: true})

    MonumentService.getMonument({id: id})
      .then((res) => {
        res["buildDate"] = res.buildDate.split('-')[0]

        this.setState({monumentInfo: res, isLoading: false})
      })
      .catch((err) => {
        this.setState({isError: true, isLoading: false})
      })
  }

  render() {
    const {monumentInfo, isLoading, isError} = this.state

    if (isLoading) {
      return (
        <Loading/>
      )
    }

    if (isError) {
      return (
        <NotFoundPage/>
      )
    }

    return (
      <div id="main">
        <h1 id="name"> {monumentInfo.name} </h1>
        <img
          // id="imgs"
          alt={monumentInfo.name}
          src={monumentInfo.imageURL}
        />
        <p id="Description"> {monumentInfo.description} </p>
        <ul>
          <li><p id="Address">Адрес - {monumentInfo.address}</p></li>
          <li><p id="Creator">Архитектор/скульптор - {monumentInfo.creator} </p></li>
          <li><p id="Date">Дата постройки - {monumentInfo.buildDate} </p></li>
        </ul>
       
      </div>
    )
  }
}

export default withRouter(MonumentById)

