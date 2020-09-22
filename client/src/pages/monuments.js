import React from 'react';
import MonumentService from '../services/MonumentService'
import './monuments.css'
import Link from "@material-ui/core/Link";
import nav from "../nav";
import {withRouter} from "react-router-dom";

class Monuments extends React.Component {
  state = {
      monuments: []
  }
  
  componentDidMount = async() => {
    // nav(this.props.match.url)
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
          <img alt='monument' style={{maxWidth: '100%', maxHeight: '100%'}} src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Monument_to_Catherine_II_in_SPB.jpg"/>
          <Link href={`monuments/${entry._id}`}>
            <div className='block'>
              {entr`y.name}
            </div>
          </Link>
        </div>
      )
    });

    return (
      <div className='root'>
        {result}
      </div>
    )
  }
}

// export default withRouter(Monuments)
export default Monuments
