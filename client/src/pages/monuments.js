import React from 'react';
import MonumentService from '../services/MonumentService';
import '../styles/monuments.css';

class Monuments extends React.Component {
  state = {
    monuments: [],
    isLoaded: false
  }

  getAccessToken = () => {
    let cookies = document.cookie;
    let cookiesArray = cookies.split(';')
    for (let i = 0; i < cookiesArray.length; i++) {
      let name = cookiesArray[i].split('=')[0];
      let value = cookiesArray[i].split('=')[1];
      if (name.includes('accessToken')) {
        return value
      }
    }
    return undefined
  }

  getRefreshToken = () => {
    let cookies = document.cookie;
    let cookiesArray = cookies.split(';')
    for (let i = 0; i < cookiesArray.length; i++) {
      let name = cookiesArray[i].split('=')[0];
      let value = cookiesArray[i].split('=')[1];
      if (name.includes('refreshToken')) {
        return value
      }
    }
    return undefined
  }

  getMonuments = () => {
    MonumentService.fetchMonuments({}, {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken()
    })
      .then((res) => {
        this.setState({
          monuments: res,
          isLoaded: true
        })
      })
  }

  componentDidMount = () => {
    this.getMonuments()
  }

  renderMonuments = (monuments) => {
    return monuments.map((entry, index) => (
        <div key={index}>
          <p>{entry.name}</p>
          <img src={entry.imageURL} alt={index}/>
        </div>
    ))
  }


  render() {
    let {monuments, isLoaded} = this.state

    if (!isLoaded) {
      return (
        <div className="loading-page">
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
                  integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
                  crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                  integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                  crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                  integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                  crossOrigin="anonymous"></script>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="loader">
                  <div className="loader-inner">
                    <div className="loading one"></div>
                  </div>
                  <div className="loader-inner">
                    <div className="loading two"></div>
                  </div>
                  <div className="loader-inner">
                    <div className="loading three"></div>
                  </div>
                  <div className="loader-inner">
                    <div className="loading four"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )
    } else {
      return (
        <div className="container">

          {this.renderMonuments(monuments)}
        </div>
      )
    }
  }
}

export default Monuments
