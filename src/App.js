import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
  }

  startChange = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <div>
        <span>{this.state.counter}</span>
        <button onClick={this.startChange}>Start</button>
        <button>Stop</button>
      </div>
    );
  }
}
