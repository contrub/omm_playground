import React from 'react';
import MonumentService from '../services/MonumentService'
import {withRouter} from "react-router";

class MonumentById extends React.Component {

    state = {
      monumentInfo: []
    }

    componentDidMount = async() => {
      let id = this.props.match.params.id
      await MonumentService.fetchMonuments()
        .then(result => {
          this.setState({
            monumentInfo: result.find(monument => monument._id === id)
           })
        })
    }
//
    render() {
        return (
            <div>
                <h1> {this.state.monumentInfo.name} </h1>
                <p> {this.state.monumentInfo.description} </p>
            </div>
        )
    }
}

export default withRouter(MonumentById)
