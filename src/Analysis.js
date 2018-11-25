import React, { Component } from "react";

class Analysis extends Component {
  render() {
    return (
      <div>
        {this.props.graph && (
          <img src={`data:image/png;base64, ${this.props.graph}`} />
        )}
      </div>
    );
  }
}

export default Analysis;
