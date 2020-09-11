import React from 'react';
import MonumentService from '../services/MonumentService'

// По какой то причине не работает в докер контейнере, не может найти этот пакет
// возможно стоит рассмотреть возможность использовать чистые гугл карты без реакта
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '70%',
    height: '70%',
    margin: '0 auto'
  };

const nameStyles = {
    textAlign: 'center',
    fontFamily: 'cursive'
}

export class MonumentById extends React.Component {

  // Конструктор не обязателен
    constructor(props) {
        super(props);
        this.state = {
          monumentInfo: []
        }; 
      }

      componentDidMount = async() => {
      // Использовать react-router
        let index = window.location.href.split('/')[4]

        await MonumentService.fetchMonuments()
          .then(result => {
            this.setState({
                monumentInfo: result[index]
            })
        })
    }

    render() {
        return (
            <>
                <h1 /* Использовать не инлайн css*/ style={nameStyles}> {
                  // Уязвимое место, если MonumentService.fetchMonuments() вернет null или undefined то программа упадет так как
                  // в этой строке будет попытка взять поле name у null или undefined
                  this.state.monumentInfo.name
                } </h1>
                <p> {this.state.monumentInfo.description} </p>
                <Map
                google={this.props.google}
                zoom={13}
                style={mapStyles}
                initialCenter={{ lat: 46.481000, lng: 30.736673}}
                >
                <Marker position={{ lat: this.state.monumentInfo.lat, lng: this.state.monumentInfo.lng}} />
                </Map>
            </>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'GoogleMapsToken'
  })(MonumentById); // cause 2 problems in console.log
