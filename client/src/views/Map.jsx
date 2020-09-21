import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import {MyApiClient} from './my-api-client.js';
const mapStyles = {
    width: '60%',
    height: '40%',
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {}
        }
    }

    componentDidMount() {
        // if(localStorage.location) {
        //     MyApiClient
        //         .post('/location', {location: localStorage.location})
        //         .then((response) => {
        //             this.setState({
        //                 location: response.data[0].geometry.location
        //             })
        //         })
        // }
    }

    render() {
        return(
        <div>{this.props.location ? 
            <Map
            google={this.props.google}
            style={mapStyles}
            zoom={15}
            initialCenter={
                {
                    lat: this.props.location.geometry.location.lat,
                    lng: this.props.location.geometry.location.lng
                }
            }
          /> : ''
        }</div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_API}`
  })(MapContainer);