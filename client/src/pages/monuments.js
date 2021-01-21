import React from 'react';
import MonumentService from '../services/MonumentService';
import '../styles/monuments.css';

let isAuth = true

class Monuments extends React.Component {
  state = {
    monuments: []
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

  componentWillMount = async() => {
    if (this.getAccessToken() === undefined) {
      isAuth = false
    } else {
      await MonumentService.fetchMonuments({"accessToken": this.getAccessToken(), "refreshToken": this.getRefreshToken()})
        .then((res) => {
          if (res.accessToken) {
            document.cookie = `accessToken=${res.accessToken}`
          }
          this.setState({
            monuments: res.monuments
          })
        })
    }
  }

  render() {

    // const result = monuments.map((entry) => {
    //   return (
    //     <div className='holder' key={entry._id}>
    //       <img alt='monument' style={{maxWidth: '100%', maxHeight: '100%'}} src="https://ua.igotoworld.com/frontend/webcontent/websites/1/images/gallery/20636_800x600_odessa.jpg"/>
    //       <Link to={`monuments/${entry._id}`}>
    //         <div className='block'>
    //           {entry.name}
    //         </div>
    //       </Link>
    //     </div>
    //   )
    // })

    const {monuments} = this.state

    console.log(isAuth)

    if (monuments.length) {
      const blocks = monuments.map((entry) => {
        return (
          <div className="col-md-3 col-sm-6">
            <div className="product-grid">
              <div className="product-image">
                <a href="/mon1">
                  <img className="pic-1" alt='img1'/>
                  <img className="pic-2" alt='img2'/>
                </a>
              </div>
              <ul className="rating">
                <li className="fa fa-star"></li>
                <li className="fa fa-star"></li>
                <li className="fa fa-star"></li>
                <li className="fa fa-star"></li>
                <li className="fa fa-star disable"></li>
              </ul>
              <div className="product-content">
                <h3 className="title">
                  <a href="/mon2">
                    The Potemkin Stairs
                  </a>
                </h3>
                <div className="year">
                  Год ония: 1825
                </div>
              </div>
            </div>
          </div>
        )
      })
      return (
        <div id='monuments-page'>
          <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"/>
          <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>
          {blocks}
          <div className="container">
            <h3 className="h3">shopping Demo-1 </h3>
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="product-grid">
                  <div className="product-image">
                    <a href="/mon1">
                      <img className="pic-1" alt='img1'/>
                      <img className="pic-2" alt='img2'/>
                    </a>
                  </div>
                  <ul className="rating">
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star disable"></li>
                  </ul>
                  <div className="product-content">
                    <h3 className="title">
                      <a href="/mon2">
                        The Potemkin Stairs
                      </a>
                    </h3>
                    <div className="year">
                      Год ония: 1825
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="product-grid">
                  <div className="product-image">
                    <a href="/mon1">
                      <img className="pic-1" alt='img1'/>
                      <img className="pic-2" alt='img2'/>
                    </a>
                  </div>
                  <ul className="rating">
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star"></li>
                    <li className="fa fa-star disable"></li>
                  </ul>
                  <div className="product-content">
                    <h3 className="title">
                      <a href="/mon2">
                        The Potemkin Stairs
                      </a>
                    </h3>
                    <div className="year">
                      Год ония: 1825
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (isAuth) {
      return (
        <div>
        </div>
      )
    }
  }
}

export default Monuments
