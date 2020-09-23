import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {MyApiClient} from './my-api-client.js';
const mapStyles = {
    width: '60%',
    height: '100%',
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false,
            selectedItem: null,
            zoom: 15
        }
    }

    onMarkerClick = (props, marker, item) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
      selectedItem: item
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
      selectedItem: null
    });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
          this.setState({
            activeMarker: null,
            showingInfoWindow: false,
            selectedItem: null,
          });
      };


    render() {
        console.log(this.state.selectedItem)
        if(!this.props.searchResults || !this.props.location) return <div>Loading ... </div>
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
            onClick={this.onMapClicked}
          >
        {this.props.searchResults.slice(0,10).map((item, index) => {
        return <Marker 
            key={index}
            id={index}
            position={{
                lat: item.geometry.location.lat,
                lng: item.geometry.location.lng
            }}
            onClick={(props, marker) => {
                this.setState({
                    activeMarker: marker,
                    selectedPlace: props,
                    showingInfoWindow: true,
                    selectedItem: item
                })
            }}
            >
            </Marker>
        })}
            <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}
            >
            {this.state.selectedItem ? 
            <div>
            <h2>{this.state.selectedItem.name}</h2>
            {(() => {
                if(this.state.selectedItem.opening_hours) {
                    if(this.state.selectedItem.opening_hours.open_now !== undefined) {
                    if(this.state.selectedItem.opening_hours.open_now) {
                        return <p style={{color: "green", fontWeight: "450"}}>Open</p>;
                    } else {
                        return <p style={{color: "red", fontWeight: "450"}}>Closed</p>;
                    }
                }
                }
            })()}
            <h4 style={{color: "orange"}}>Rating: {this.state.selectedItem.rating}</h4>
            </div> : 
            <div></div>
            }
            </InfoWindow>
          </Map> : ''}
          </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_API}`
  })(MapContainer);