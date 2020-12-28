import React from 'react';
import MonumentService from '../services/MonumentService';
import '../styles/monuments.css';

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
    return null
  }

  componentDidMount = async() => {

    let accessToken = this.getAccessToken()
    console.log('accessToken : ' + accessToken)

    // await MonumentService.fetchMonuments({
    //   Authorization: accessToken
    // })
    //   .then(result => {
    //     this.setState({
    //       monuments: result
    //     })
    //   })
    // if (this.monuments.status) {
    //   document.getElementById('monuments-page').innerHTML = 'Unauthorized user!'
    // } else {
    //   if (this.state.monuments.length === 0) {
    //     document.getElementById('monuments-page').innerHTML = 'Successful authorize!'
    //   }
    // }
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
        <div className='monuments-list'>
        </div>
      </div>
    )
  }
}

export default Monuments
