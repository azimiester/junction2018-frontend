import React, { Component } from "react";
import "./Map.css";
import {
  Map,
  Marker,
  GoogleApiWrapper,
  Listing,
  Polygon
} from "google-maps-react";
import loudspeaker from "./loudspeaker.png";

export class MapContainer extends Component {
  autocomplete = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      initialCenter: { lat: 60.165441, lng: 24.931685 }
    };
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { position, initialCenter } = this.state;
    const center = this.props.center || initialCenter;
    return (
      <div className="map-container">
        <div className="map">
          <Map
            google={this.props.google}
            initialCenter={initialCenter}
            center={center}
            zoom={14}
          >
            {this.props.center && (
              <Marker
                position={this.props.center}
                icon={{
                  url: { loudspeaker },
                  anchor: new this.props.google.maps.Point(32, 32),
                  scaledSize: new this.props.google.maps.Size(64, 64)
                }}
              />
            )}
            {this.props.polyCords && (
              <Polygon
                paths={this.props.polyCords}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor="#0000FF"
                fillOpacity={0.35}
              />
            )}
          </Map>
        </div>
        <div className="mapInfo" />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `AIzaSyCR7DA6hA3Bm5m9tpxeFP9eW_teXWD-qrw`,
  libraries: ["places", "visualization"]
})(MapContainer);
