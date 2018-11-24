import React, { Component } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const containerStyle = {
  dislay: "flex"
};
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerData: null,
      activeMarker: undefined,
      infowWindow: false
    };
  }
  mapClicked(a, b, c) {
    this.props.onMapClick(c.latLng.lat(), c.latLng.lng());
  }

  render() {
    const { markerData, activeMarker, infowWindow } = this.state;
    return (
      <div style={containerStyle} className="map-container">
        <div>
          {markerData && (
            <>
              <h2>{markerData.name}</h2>{" "}
            </>
          )}
        </div>
        <Map
          initialCenter={{
            lat: 60.169941,
            lng: 24.938841
          }}
          google={this.props.google}
          onClick={this.mapClicked.bind(this)}
          zoom={14}
          style={{
            width: "500px",
            height: "500px"
          }}
        >
          {this.props.markers.map((m, key) => (
            <Marker
              key={key}
              onClick={(props, marker, e) => {
                console.log(m);
                this.setState({
                  markerData: m,
                  activeMarker: marker,
                  infowWindow: true
                });
              }}
              name={m.name}
              position={{ lat: m.latitude, lng: m.longitude }}
            />
          ))}
        </Map>
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `AIzaSyCR7DA6hA3Bm5m9tpxeFP9eW_teXWD-qrw`
})(MapContainer);
