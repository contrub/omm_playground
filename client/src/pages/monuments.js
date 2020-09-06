import React from 'react';
import MonumentService from '../services/MonumentService'
import './monuments.css'

export default class Monuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monuments: []
    }; 
  }
  
  componentDidMount = async() => {
    await MonumentService.fetchMonuments()
      .then(result => {
        this.setState({
          monuments: result
        })
      })
    if (this.state.monuments.length === 0) {
      alert('No monuments !')
    }
  }
  render() {
    const {monuments} = this.state
    const result = monuments.map((entry, index) => {
      return (
        <div className='holder' key={index}>
          <img alt='monument' style={{maxWidth: '100%', maxHeight: '100%'}} src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Monument_to_Catherine_II_in_SPB.jpg"/>
          <a onClick={() => window.location.href = `monuments/${index}`}> 
            <div className='block'>
              {entry.name}
            </div>
          </a>
        </div>
      ) // 30 line - can't integrate href template to have link to every monument without 'onClick'
    });
    return (
      <div className='root'>
        {result}
      </div>
    )
  }
}

