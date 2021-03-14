import React from 'react';
import MonumentService from '../services/MonumentService'
import {withRouter} from "react-router";

/* Тестовая страничка для демонстрации памятника по id
* Должна быть доработана Даниилом
* */

class MonumentById extends React.Component {

    state = {
      monumentInfo: []
    }

    componentDidMount = () => {
      let id = this.props.match.params.id
      MonumentService.fetchMonuments()
        .then(result => {
          this.setState({
            monumentInfo: result.find(monument => monument._id === id)
           })
        })
    }

    render() {
        return (
            <div>
              {this.state.monumentInfo === undefined &&
                <p>Monument undefined</p>
              }
              {this.state.monumentInfo !== undefined &&
                <div>
                  <h1> {this.state.monumentInfo.name} </h1>
                  <p> {this.state.monumentInfo.description} </p>
                  <p> <b>Creator:</b> {this.state.monumentInfo.creator} </p>
                  <p> <b>Date:</b> {this.state.monumentInfo.date} </p>
                  <img src={this.state.monumentInfo.imageURL} alt="monument_image" width="300px"/>
                </div>
              }
            </div>
        )
    }
}

export default withRouter(MonumentById)
