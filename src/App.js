import React, { Component } from "react";

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

class App extends Component {
  //with create react app, we can write our methods
  // as arrow functions, meaning we don't need the
  // constructor and bind

  handleChange = (event) => console.log(event);

  render() {
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
