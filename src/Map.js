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
      selectedEvent: null,
      position: null,
      initialCenter: { lat: 60.165441, lng: 24.931685 }
    };
  }

  onSubmit(e) {
    e.preventDefault();
  }
  tagClicked(t) {
    this.props.addTag(t);
  }

  render() {
    console.log(loudspeaker);
    const { position, initialCenter, selectedEvent } = this.state;
    const markers = this.props.markers || [];
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
                  url: loudspeaker,
                  anchor: new this.props.google.maps.Point(32, 32),
                  scaledSize: new this.props.google.maps.Size(32, 32)
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
            {markers.length > 0 &&
              markers.map(m => (
                <Marker
                  onClick={() => {
                    this.setState({ selectedEvent: m });
                  }}
                  position={{ lat: m.latitude, lng: m.longitude }}
                />
              ))}
          </Map>
        </div>
        <div className="mapInfo">
          <hr />
          {selectedEvent && (
            <>
              <h2>{selectedEvent.name}</h2>
              <p>{selectedEvent.address}</p>
              {selectedEvent.info_url && (
                <a href={selectedEvent.info_url}> More Info</a>
              )}
              <p>
                Tags:{" "}
                {selectedEvent.tags.map(t => (
                  <>
                    <a href="#" onClick={this.tagClicked.bind(this, t)}>
                      {t}
                    </a>
                    {", "}
                  </>
                ))}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `AIzaSyCR7DA6hA3Bm5m9tpxeFP9eW_teXWD-qrw`,
  libraries: ["places", "visualization"]
})(MapContainer);
