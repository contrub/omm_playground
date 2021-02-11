import React from 'react';
import MonumentService from '../services/MonumentService';
import '../styles/monuments.css';

import Link from '@material-ui/core/Link';

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
    await MonumentService.fetchMonuments({}, {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken()
    })
      .then((res) => {
        console.log(res)
        this.setState({
          monuments: res.monuments
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

    // const {monuments} = this.state

    return (
      <div>Monuments page (console.log)
        
        
      </div>
      
    )
  }
}

export default Monuments
