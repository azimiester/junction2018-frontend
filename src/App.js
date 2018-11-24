import React, { Component } from "react";
import axios from "axios";
import Map from "./Map";
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
        <Map
          markers={this.state.markers}
          onMapClick={this.requestApi.bind(this)}
        />
      </div>
    );
  }
}

export default App;
