import React, { Component } from "react";
import axios from "axios";
import Map from "./Map";
import { GoogleApiWrapper } from "google-maps-react";
import Autocomplete from "react-google-autocomplete";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: undefined,
      lng: undefined,
      markers: []
    };
  }
  async requestApi(lat, lng) {
    const getdata = await axios.get(
      `http://gravity02-dev.azurewebsites.net/api/events?lat=${lat}&lon=${lng}&range=${2000}`
    );
    this.setState({
      markers: getdata.data
    });
  }
  render() {
    return (
      <div>
        <p>Hello</p>
        <Autocomplete
          style={{ width: "90%" }}
          onPlaceSelected={place => {
            console.log(place);
          }}
          types={["(regions)"]}
          componentRestrictions={{ country: "fi" }}
        />

        <Map
          markers={this.state.markers}
          onMapClick={this.requestApi.bind(this)}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `AIzaSyCR7DA6hA3Bm5m9tpxeFP9eW_teXWD-qrw`,
  libraries: ["places", "visualization"]
})(App);
