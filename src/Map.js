import React, { Component } from "react";
import "./Map.css";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Listing
} from "google-maps-react";

export class MapContainer extends Component {
  autocomplete = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      markerData: null,
      activeMarker: undefined,
      infowWindow: false,
      position: null
    };
  }
  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
  }
  mapClicked(a, b, c) {
    this.props.onMapClick(c.latLng.lat(), c.latLng.lng());
  }
  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { position } = this.state;
    return (
      <div className="map-container">
        <div className="map">
          <Map
            onReady={this.fetchPlaces.bind(this)}
            google={this.props.google}
            onClick={this.mapClicked.bind(this)}
            zoom={14}
          >
            <Marker position={position} />
          </Map>
        </div>
        <div className="mapInfo">
          <div>
            <form onSubmit={this.onSubmit.bind(this)}>
              <input
                placeholder="Enter a location"
                ref={ref => (this.autocomplete = ref)}
                type="text"
              />
              <input type="submit" value="Go" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `AIzaSyCR7DA6hA3Bm5m9tpxeFP9eW_teXWD-qrw`,
  libraries: ["places", "visualization"]
})(MapContainer);
