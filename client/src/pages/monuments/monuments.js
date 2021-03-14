import React from 'react';
import MonumentService from '../../services/MonumentService'
import {withRouter} from "react-router";

/* Тестовая страничка для демонстрации памятника по id
* Должна быть доработана Даниилом
* */

class MonumentById extends React.Component {

    state = {
      monuments: []
    }

    componentDidMount = () => {
      MonumentService.fetchMonuments()
        .then((res) => {
          console.log(res)
          this.setState({monuments: res})
        })
    }

    render() {
      console.log(this.state.monuments)

      return (
        <div>
          <h1>Monuments Page</h1>
        </div>
      )
    }
}

export default withRouter(MonumentById)
