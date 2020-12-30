import React from 'react';
import MonumentService from '../services/MonumentService';
import '../styles/monuments.css';

import potemkins_stairs_1 from '../images/The Potemkin Stairs/potemkins_stairs_1.jpg'
import potemkins_stairs_2 from '../images/The Potemkin Stairs/potemkins_stairs_2.jpeg'

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
      if (name === 'accessToken') {
        return value
      }
    }
    return undefined
  }

  componentDidMount = async() => {

    await MonumentService.fetchMonuments()
      .then((res) => {
        this.setState({
          monuments: res
        })
      })
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

    return (
      <div id='monuments-page'>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"/>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"/>
        <div className="container">
          <h3 className="h3">shopping Demo-1 </h3>
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="product-grid">
                <div className="product-image">
                  <a href="/mon1">
                    <img className="pic-1" src={potemkins_stairs_1} alt='img1'/>
                      <img className="pic-2" src={potemkins_stairs_2} alt='img2'/>
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
  }
}

export default Monuments
