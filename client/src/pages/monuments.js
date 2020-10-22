import React from 'react';
import MonumentService from '../services/MonumentService'
import './monuments.css'
import {Link} from "react-router-dom";

class Monuments extends React.Component {
  state = {
      monuments: []
  }

  componentDidMount = async() => {
    console.log('Fetching monuments...')
    await MonumentService.fetchMonuments()
      .then(result => {
        this.setState({
          monuments: result
        })
      })
    console.log(this.state.monuments)
    if (this.state.monuments.length === 0) {
      alert('No monuments !')
    }
  }

  render() {

      const {monuments} = this.state
      const result = monuments.map((entry) => {
        return (
          <div className='holder' key={entry._id}>
            <img alt='monument' style={{maxWidth: '100%', maxHeight: '100%'}} src="https://ua.igotoworld.com/frontend/webcontent/websites/1/images/gallery/20636_800x600_odessa.jpg"/>
            <Link to={`monuments/${entry._id}`}>
              <div className='block'>
                {entry.name}
              </div>
            </Link>
          </div>
        )
      })

    return (
      <div className='root'>
        {result}
      </div>
    )
  }
}

export default Monuments
